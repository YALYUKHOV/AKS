import React from 'react';
import { ArrowDown } from 'lucide-react';
import styles from './ArchitecturePage.module.scss';

export const ArchitecturePage: React.FC = () => {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Архитектура системы</h1>
        <p className={styles.subtitle}>
          Типовая 3-уровневая корпоративная архитектура Jakarta EE 10 (Стек: GlassFish 7 + PostgreSQL 16)
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>Слой 1</span>
            <h2>Слой представления (Presentation Layer)</h2>
          </div>
          <p className={styles.desc}>
            Обеспечивает взаимодействие с клиентом. Реализован на современной архитектуре Feature-Sliced Design (FSD) с модулями стилей SCSS на клиенте и RESTful-контроллерами <code>@Path</code> (Jakarta RESTful Web Services / JAX-RS) на сервере приложений GlassFish 7.
          </p>
          <div className={styles.pills}>
            <span className={styles.pill}>React 18 + FSD</span>
            <span className={styles.pill}>SCSS Modules</span>
            <span className={styles.pill}>CategoryResource.java</span>
            <span className={styles.pill}>ProductResource.java</span>
            <span className={styles.pill}>RestApplication.java</span>
          </div>
        </div>

        <div className={styles.connector}>
          <ArrowDown size={18} />
          <span>Внедрение зависимостей через @EJB</span>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>Слой 2</span>
            <h2>Бизнес-слой (Business / EJB Layer)</h2>
          </div>
          <p className={styles.desc}>
            Реализован на основе <strong>сессионных EJB-компонентов без сохранения состояния</strong> (<code>@Stateless</code>). Управляет транзакциями (Container-Managed Transactions / CMT), валидирует бизнес-правила (например, запрет на удаление категории с привязанными товарами) и делегирует вызовы JPA.
          </p>
          <div className={styles.pills}>
            <span className={styles.pill}>CategoryService.java (@Stateless)</span>
            <span className={styles.pill}>ProductService.java (@Stateless)</span>
            <span className={styles.pill}>CMT (Container-Managed Transactions)</span>
          </div>
        </div>

        <div className={styles.connector}>
          <ArrowDown size={18} />
          <span>@PersistenceContext (EntityManager)</span>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>Слой 3</span>
            <h2>Слой данных (Persistence / Data Layer)</h2>
          </div>
          <p className={styles.desc}>
            Реализован на базе спецификации <strong>Jakarta Persistence 3.1 (EclipseLink)</strong> в виде сущностей Java Beans. Использует пул соединений JNDI <code>jdbc/AksDS</code> и реляционную СУБД <strong>PostgreSQL 16</strong>.
          </p>
          <div className={styles.pills}>
            <span className={styles.pill}>Category.java (@Entity, Java Bean)</span>
            <span className={styles.pill}>Product.java (@Entity, Java Bean)</span>
            <span className={styles.pill}>persistence.xml (jdbc/AksDS)</span>
            <span className={styles.pill}>PostgreSQL 16 (aks_db)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
