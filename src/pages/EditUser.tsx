import { Await, useLoaderData } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from 'react-modal';
import { useUserStore } from '../store/users';
import styles from './EditUser.module.css';

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
  name: z.string().min(2).max(64),
  username: z.string().min(2).max(64),
  email: z.string().email(),
  city: z.string().min(2).max(64),
  phone: z
    .string()
    .refine(val => /^\d+$/.test(val.replace(/\D/g, '')), {
      message: 'Телефон должен содержать только цифры',
    }),
  companyName: z.string().min(2).max(64),
});

type FormValues = z.infer<typeof schema>;

export default function EditUser() {
  const data = useLoaderData() as { user: Promise<ApiUser> };
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => window.history.back()}
          aria-label="Назад"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <h1 className={styles.title}>Редактирование пользователя</h1>
      </div>

      <Suspense fallback={<div>Загрузка пользователя...</div>}>
        <Await resolve={data.user}>
          {(user: ApiUser) => (
            <UserForm user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function UserForm({
  user,
  isOpen,
  setIsOpen,
}: {
  user: ApiUser;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { upsertEditedUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  useEffect(() => {
    reset({
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address?.city ?? '',
      phone: user.phone,
      companyName: user.company?.name ?? '',
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
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 4000);
  };

  return (
    <>
      <div className={styles.userInfo}>
        <img
          src={`https://i.pravatar.cc/64?u=${user.id}`}
          alt={user.username}
          className={styles.avatar}
        />
        <div className={styles.userDetails}>
          <div className={styles.username}>@{user.username}</div>
          <div className={styles.email}>{user.email}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label className={styles.label}>Имя</label>
            <input
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              {...register('name')}
            />
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Никнейм</label>
            <input
              className={`${styles.input} ${errors.username ? styles.error : ''}`}
              {...register('username')}
            />
            {errors.username && (
              <span className={styles.errorMessage}>{errors.username.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Город</label>
            <input
              className={`${styles.input} ${errors.city ? styles.error : ''}`}
              {...register('city')}
            />
            {errors.city && (
              <span className={styles.errorMessage}>{errors.city.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label className={styles.label}>Телефон</label>
            <input
              className={`${styles.input} ${errors.phone ? styles.error : ''}`}
              {...register('phone')}
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
              className={`${styles.input} ${errors.companyName ? styles.error : ''}`}
              {...register('companyName')}
            />
            {errors.companyName && (
              <span className={styles.errorMessage}>
                {errors.companyName.message}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.saveButton}>
          Сохранить изменения
        </button>
      </form>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            inset: '20% auto auto 50%',
            transform: 'translateX(-50%)',
            padding: 24,
            borderRadius: 12,
            border: 'none',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        shouldCloseOnOverlayClick
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
            Изменения сохранены
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer',
              padding: 4,
              borderRadius: 4,
            }}
          >
            ✕
          </button>
        </div>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Данные пользователя обновлены.
        </p>
      </Modal>
    </>
  );
}
