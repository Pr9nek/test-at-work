import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../../store/users";
import styles from "./UserForm.module.css";

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
};

const schema = z.object({
  name: z
    .string({
      message: "Имя должно быть текстовым значением.",
    })
    .nonempty("Поле 'Имя' обязательно для заполнения.")
    .min(2, "Имя должно содержать не менее 2 символов.")
    .max(64, "Имя не должно превышать 64 символа."),

  username: z
    .string({
      message: "Никнейм должен быть текстовым значением.",
    })
    .nonempty("Поле 'Никнейм' обязательно для заполнения.")
    .min(2, "Никнейм должен содержать не менее 2 символов.")
    .max(64, "Никнейм не должен превышать 64 символа."),

  email: z
    .string({
      message: "Почта должна быть текстовым значением.",
    })
    .nonempty("Поле 'Почта' обязательно для заполнения.")
    .email("Введите корректный адрес электронной почты."),

  city: z
    .string({
      // 💡 ИСПРАВЛЕНИЕ: Используем 'message'
      message: "Город должен быть текстовым значением.",
    })
    .nonempty("Поле 'Город' обязательно для заполнения.")
    .min(2, "Название города должно содержать не менее 2 символов.")
    .max(64, "Название города не должно превышать 64 символа."),
  phone: z
    .string({
      message: "Телефон должен быть строкой (текстом).",
    })
    .nonempty("Поле 'Телефон' обязательно для заполнения.")
    .refine((val) => /^\d+$/.test(val.replace(/\D/g, "")), {
      message: "Телефон должен содержать только цифры",
    }),
  companyName: z
    .string({
      message: "Название компании должно быть текстовым значением.",
    })
    .nonempty("Поле 'Название компании' обязательно для заполнения.")
    .min(2, "Название компании должно содержать не менее 2 символов.")
    .max(64, "Название компании не должно превышать 64 символа."),
});

type FormValues = z.infer<typeof schema>;

type UserFormProps = {
  user: ApiUser;
  onSuccess: () => void;
};

export default function UserForm({ user, onSuccess }: UserFormProps) {
  const { upsertEditedUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  useEffect(() => {
    reset({
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address?.city ?? "",
      phone: user.phone,
      companyName: user.company?.name ?? "",
    });
  }, [user.id, reset]);

  const onSubmit = (values: FormValues) => {
    upsertEditedUser({
      id: user.id,
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      address: { city: values.city },
      company: { name: values.companyName },
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formField}>
        <label className={styles.label}>Имя</label>
        <input
          className={`${styles.input} ${errors.name ? styles.error : ""}`}
          {...register("name")}
          placeholder="Иван"
        />
        {errors.name && (
          <span className={styles.errorMessage}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Никнейм</label>
        <input
          className={`${styles.input} ${errors.username ? styles.error : ""}`}
          {...register("username")}
          placeholder="ivan1234"
        />
        {errors.username && (
          <span className={styles.errorMessage}>{errors.username.message}</span>
        )}
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Почта</label>
        <input
          type="email"
          className={`${styles.input} ${errors.email ? styles.error : ""}`}
          {...register("email")}
          placeholder="ivan1234@mail.ru"
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Город</label>
        <input
          className={`${styles.input} ${errors.city ? styles.error : ""}`}
          {...register("city")}
          placeholder="Санкт-Петербург"
        />
        {errors.city && (
          <span className={styles.errorMessage}>{errors.city.message}</span>
        )}
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Телефон</label>
        <input
          className={`${styles.input} ${errors.phone ? styles.error : ""}`}
          {...register("phone")}
          placeholder="8 (999) 111-23-23"
          onKeyDown={(e) => {
            if (!/[0-9]|\b/.test(e.key)) e.preventDefault();
          }}
        />
        {errors.phone && (
          <span className={styles.errorMessage}>{errors.phone.message}</span>
        )}
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Название компании</label>
        <input
          className={`${styles.input} ${
            errors.companyName ? styles.error : ""
          }`}
          {...register("companyName")}
          placeholder="AT-WORK"
        />
        {errors.companyName && (
          <span className={styles.errorMessage}>
            {errors.companyName.message}
          </span>
        )}
      </div>

      <button type="submit" className={styles.saveButton}>
        Сохранить
      </button>
    </form>
  );
}
