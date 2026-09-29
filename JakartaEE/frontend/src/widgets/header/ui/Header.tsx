import React, { useState } from 'react';
import { ThemeSwitcher, ThemeMode } from '@features/theme-switcher/ui/ThemeSwitcher';
import styles from './Header.module.scss';

interface HeaderProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onThemeChange,
}) => {

  return (
    <header className={styles.header}>
      <div className={styles.rightSection}>

        <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />

        <div className={styles.userProfile} title="Профиль администратора системы">
          <div className={styles.avatar}>А</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Администратор</span>
            <span className={styles.userRole}>admin • Jakarta EE</span>
          </div>
        </div>
      </div>
    </header>
  );
};
