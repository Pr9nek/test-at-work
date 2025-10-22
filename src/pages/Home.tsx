import { useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';
import { useUserStore } from '../store/users';
import UserCard from '../components/UserCard/UserCard';
import styles from './Home.module.css';

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
};

export default function Home() {
  const data = useLoaderData() as { users: Promise<ApiUser[]> };
  const { archivedIds, hiddenIds, archiveUser, unarchiveUser, hideUser } = useUserStore();

  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Загрузка списка...</div>}>
        <Await resolve={data.users}>
          {(users: ApiUser[]) => {
            if (!users || !Array.isArray(users)) {
              return <div>Ошибка: данные не загружены или имеют неверный формат</div>;
            }

            if (users.length === 0) {
              return <div>Нет пользователей</div>;
            }

            const firstSix = users.slice(0, 6).map(useUserStore.getState().getEffectiveUser);
            const active = firstSix.filter(u => !archivedIds.has(u.id) && !hiddenIds.has(u.id));
            const archived = firstSix.filter(u => archivedIds.has(u.id) && !hiddenIds.has(u.id));

            return (
              <>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Активные</h2>
                  <hr className={styles.divider}></hr>
                  <div className={styles.usersGrid}>
                    {active.map((u) => (
                      <UserCard
                        key={u.id}
                        user={u}
                        onArchive={() => archiveUser(u.id)}
                        onHide={() => hideUser(u.id)}
                      />
                    ))}
                  </div>
                </section>

                {archived.length > 0 && (
                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Архив</h2>
                    <div className={styles.usersGrid}>
                      {archived.map((u) => (
                        <UserCard
                          key={u.id}
                          user={u}
                          archived
                          onActivate={() => unarchiveUser(u.id)}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
