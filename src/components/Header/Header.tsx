import { Link } from 'react-router';
import styles from './Header.module.css';
import logImage from '../../images/logo-sign.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        {/* <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#E53935"/>
          <path d="M12 6L14.5 11H9.5L12 6Z" fill="white"/>
          <path d="M12 18L9.5 13H14.5L12 18Z" fill="white"/>
        </svg> */}
        <img src={logImage} alt='logo_picture'></img>
        <span className={styles.logoText}>at-<strong>work</strong></span>
      </Link>
      
      <div className={styles.actions}>
        <button className={styles.iconButton} aria-label="Избранное">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        
        <button className={styles.iconButton} aria-label="Уведомления">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        
        <Link to="/profile" className={styles.profile}>
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
            alt="Ivan1234" 
            className={styles.avatar}
          />
          <span className={styles.username}>Ivan1234</span>
        </Link>
      </div>
    </header>
  );
}