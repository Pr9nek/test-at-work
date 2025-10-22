import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./UserCard.module.css";

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
};

interface UserCardProps {
  user: ApiUser;
  archived?: boolean;
  onArchive?: () => void;
  onActivate?: () => void;
  onHide?: () => void;
}

export default function UserCard({
  user,
  archived = false,
  onArchive,
  onActivate,
  onHide,
}: UserCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // return (
  //   <div className={`${styles.userCard} ${archived ? styles.archived : ""}`}>
  //     <div className={styles.avaAndInfo}>
  //       <img
  //         src={`https://i.pravatar.cc/64?u=${user.id}`}
  //         alt={user.username}
  //         className={styles.avatar}
  //       />
  //       {/* <div className={styles.userInfoButtonContent}> */}
  //       <div className={styles.userInfo}>
  //         <div className={styles.userDetails}>
  //           <div className={styles.username}>@{user.username}</div>
  //           <div className={styles.company}>{user.company?.name}</div>
  //         </div>
  //         <div className={styles.city}>{user.address?.city}</div>
  //       </div>
  //     </div>
  //     <div className={styles.actionsContainer}>
  //       <div ref={dropdownRef} style={{ position: "relative" }}>
  //         {/* перенести в стили position: "relative" */}
  //         <button
  //           className={styles.menuButton}
  //           onClick={toggleDropdown}
  //           aria-label="Меню действий"
  //         >
  //           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  //             <path
  //               d="M10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18ZM10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z"
  //               fill="currentColor"
  //             />
  //           </svg>
  //         </button>
        
  //       {isDropdownOpen && (
  //         <div className={styles.dropdown}>
  //           {archived ? (
  //             <button
  //               className={styles.dropdownItem}
  //               onClick={() => {
  //                 onActivate?.();
  //                 setIsDropdownOpen(false);
  //               }}
  //             >
  //               Активировать
  //             </button>
  //           ) : (
  //             <>
  //               <Link
  //                 to={`/users/${user.id}`}
  //                 className={styles.dropdownItem}
  //                 onClick={() => setIsDropdownOpen(false)}
  //               >
  //                 Редактировать
  //               </Link>
  //               <button
  //                 className={styles.dropdownItem}
  //                 onClick={() => {
  //                   onArchive?.();
  //                   setIsDropdownOpen(false);
  //                 }}
  //               >
  //                 Архивировать
  //               </button>
  //               <button
  //                 className={`${styles.dropdownItem}`}
  //                 onClick={() => {
  //                   onHide?.();
  //                   setIsDropdownOpen(false);
  //                 }}
  //               >
  //                 Скрыть
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // </div>
  // );
  return (
    <div className={`${styles.userCard} ${archived ? styles.archived : ""}`}>
      <div className={styles.ava}>
        <img
          src={`https://i.pravatar.cc/64?u=${user.id}`}
          alt={user.username}
          className={styles.avatar}
        />
      </div>
      
      <div className={styles.infoAndActions}>
        <div className={styles.userInfo}>
          <div className={styles.userDetails}>
            <div className={styles.username}>@{user.username}</div>
            <div className={styles.company}>{user.company?.name}</div>
          </div>
          <div className={styles.city}>{user.address?.city}</div>
        </div>
        
        <div className={styles.actionsContainer}>
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              className={styles.menuButton}
              onClick={toggleDropdown}
              aria-label="Меню действий"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18ZM10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                {archived ? (
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      onActivate?.();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Активировать
                  </button>
                ) : (
                  <>
                    <Link
                      to={`/users/${user.id}`}
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Редактировать
                    </Link>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        onArchive?.();
                        setIsDropdownOpen(false);
                      }}
                    >
                      Архивировать
                    </button>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        onHide?.();
                        setIsDropdownOpen(false);
                      }}
                    >
                      Скрыть
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
