import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Modal from "react-modal";
import UserForm from "../components/UserForm/UserForm";
import SuccessModal from "../components/SuccessModal/SuccessModal";
import styles from "./EditUser.module.css";

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
};

export default function EditUser() {
  const data = useLoaderData() as { user: Promise<ApiUser> };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSuccess = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 4000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => window.history.back()}
          aria-label="Назад"
        >
          <svg
            className={styles.backIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span className={styles.backText}>Назад</span>
        </button>
      </div>

      <Suspense fallback={<div>Загрузка пользователя...</div>}>
        <Await resolve={data.user}>
          {(user: ApiUser) => (
            <div className={styles.content}>
              <aside className={styles.sidebar}>
                <div className={styles.userCard}>
                  <div className={styles.avatarSection}>
                    <img
                      src={`https://i.pravatar.cc/240?u=${user.id}`}
                      alt={user.username}
                      className={styles.avatar}
                    />
                  </div>
                  <nav className={styles.menu}>
                    <div className={`${styles.menuItem} ${styles.active}`}>
                      Данные профиля
                    </div>
                    <div className={styles.menuItem}>Рабочее пространство</div>
                    <div className={styles.menuItem}>Приватность</div>
                    <div className={styles.menuItem}>Безопасность</div>
                  </nav>
                </div>
              </aside>

              <main className={styles.formCard}>
                <h2 className={styles.formTitle}>Данные профиля</h2>
                <UserForm user={user} onSuccess={handleSuccess} />
              </main>
            </div>
          )}
        </Await>
      </Suspense>

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}