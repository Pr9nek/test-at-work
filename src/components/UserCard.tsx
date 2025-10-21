import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`${styles.userCard} ${archived ? styles.archived : ''}`}>
      <div className={styles.userInfo}>
        <img 
          src={`https://i.pravatar.cc/64?u=${user.id}`} 
          alt={user.username}
          className={styles.avatar}
        />
        <div className={styles.userDetails}>
          <div className={styles.username}>@{user.username}</div>
          <div className={styles.city}>{user.address?.city}</div>
          <div className={styles.company}>{user.company?.name}</div>
        </div>
      </div>
      
      <div className={styles.actionsContainer}>
        <Link to={`/users/${user.id}`} className={styles.editButton}>
          Редактировать
        </Link>
        
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            className={styles.menuButton}
            onClick={toggleDropdown}
            aria-label="Меню действий"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="12" cy="19" r="2"/>
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
                    className={`${styles.dropdownItem} ${styles.danger}`}
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
  );
}
