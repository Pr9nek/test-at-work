import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        At-Work
      </Link>
      
      {/* <nav className={styles.nav}>
        <Link 
          to="/" 
          className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}
        >
          Пользователи
        </Link>
        <Link 
          to="/workspace" 
          className={`${styles.navItem} ${location.pathname === '/workspace' ? styles.active : ''}`}
        >
          Рабочее пространство
        </Link>
        <Link 
          to="/privacy" 
          className={`${styles.navItem} ${location.pathname === '/privacy' ? styles.active : ''}`}
        >
          Приватность
        </Link>
        <Link 
          to="/security" 
          className={`${styles.navItem} ${location.pathname === '/security' ? styles.active : ''}`}
        >
          Безопасность
        </Link>
      </nav> */}
    </header>
  );
}
