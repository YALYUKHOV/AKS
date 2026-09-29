import React from 'react';
import {
  Package,
  FolderKanban,
  LayoutDashboard,
  Layers,
} from 'lucide-react';
import { Logo } from '@shared/ui/logo/Logo';
import styles from './Sidebar.module.scss';

export type NavTab = 'products' | 'categories' | 'dashboard' | 'architecture';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  productsCount: number;
  categoriesCount: number;
  serverOnline?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  productsCount,
  categoriesCount,
  serverOnline = true,
}) => {
  const menuItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'products', label: 'Товары и техника', icon: <Package size={18} />, badge: productsCount },
    { id: 'categories', label: 'Категории', icon: <FolderKanban size={18} />, badge: categoriesCount },
    { id: 'dashboard', label: 'Дашборд склада', icon: <LayoutDashboard size={18} /> },
    { id: 'architecture', label: 'Архитектура КС', icon: <Layers size={18} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <Logo />

      <nav className={styles.navMenu}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className={styles.counterBadge}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.serverStatus}>
          <span className={`${styles.dot} ${!serverOnline ? styles.offline : ''}`} />
          <span>{serverOnline ? 'GlassFish 7 • Online' : 'Сервер офлайн'}</span>
        </div>
        <div className={styles.techStack}>
          <span>EJB 4.0</span>
          <span>JPA 3.1</span>
          <span>PostgreSQL</span>
        </div>
      </div>
    </aside>
  );
};
