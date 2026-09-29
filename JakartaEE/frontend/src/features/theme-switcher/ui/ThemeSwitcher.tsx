import React from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';
import styles from './ThemeSwitcher.module.scss';

export type ThemeMode = 'auto' | 'light' | 'dark';

interface ThemeSwitcherProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <div className={styles.container} role="group" aria-label="Переключение темы">
      <button
        type="button"
        className={`${styles.itemBtn} ${theme === 'auto' ? styles.active : ''}`}
        onClick={() => onThemeChange('auto')}
        title="Системная тема"
        aria-label="Системная тема"
      >
        <Monitor size={15} />
      </button>

      <button
        type="button"
        className={`${styles.itemBtn} ${theme === 'light' ? styles.active : ''}`}
        onClick={() => onThemeChange('light')}
        title="Светлая тема"
        aria-label="Светлая тема"
      >
        <Sun size={15} />
      </button>

      <button
        type="button"
        className={`${styles.itemBtn} ${theme === 'dark' ? styles.active : ''}`}
        onClick={() => onThemeChange('dark')}
        title="Тёмная тема"
        aria-label="Тёмная тема"
      >
        <Moon size={15} />
      </button>
    </div>
  );
};
