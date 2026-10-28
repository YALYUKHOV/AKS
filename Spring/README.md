# Практическая работа №2: Spring

**Дисциплина:** Архитектура корпоративных систем
**Студент:** Ялюхов Александр Дмитриевич  
**Группа:** 6132-010402D

---

1. **Слой данных:** PostgreSQL 16 + Hibernate (JPA-сущности `Category`, `Product`, связь One-to-Many) + репозитории Spring Data JPA.
2. **Бизнес-слой:** Spring Beans (`@Service`) с декларативными транзакциями (`@Transactional`) и бизнес-правилами:
   уникальность названия категории и артикула товара, запрет удаления категории с товарами.
3. **Слой представления:** Spring MVC (`@Controller`) + шаблоны Thymeleaf, серверная валидация форм (Bean Validation).

| Задание                        | Реализация                                                                 |
| ------------------------------ | -------------------------------------------------------------------------- |
| 1. Модель и скрипт БД          | `sql/init.sql` — таблицы `categories`, `products`, тестовые данные         |
| 2. Java Beans для Hibernate    | `model/Category`, `model/Product`; настройки Hibernate в `application.yml` |
| 3. Бизнес-слой на Spring Beans | `service/CategoryService`, `service/ProductService`                        |
| 4. Представление на Spring MVC | `web/*Controller`, `templates/**`                                          |
| 5. Всё вместе                  | `docker compose up`                                                        |

---

## Запуск

### Вариант 1 — всё в Docker

В папке `Spring`:

```bash
docker compose up -d --build
```

Приложение: [http://localhost:8080](http://localhost:8080)

### Вариант 2 — БД в Docker, приложение локально

```bash
docker compose up -d postgres
mvn spring-boot:run
```

---

## Возможности

- **Обзор** (`/`) — статистика каталога и карточки категорий.
- **Товары** (`/products`) — список с фильтром по категории, добавление, редактирование, удаление.
- **Категории** (`/categories`) — список с числом товаров, добавление, редактирование, удаление.

---

## Структура

```
Spring/
├── docker-compose.yml          # PostgreSQL 16 + приложение
├── Dockerfile                  # Сборка и запуск jar
├── pom.xml                     # Spring Boot 3.5, Spring MVC, Data JPA (Hibernate), Thymeleaf
├── sql/init.sql                # Скрипт создания и заполнения БД
└── src/main/
    ├── java/ru/university/aks/
    │   ├── model/              # Сущности Hibernate
    │   ├── repository/         # Spring Data JPA репозитории
    │   ├── service/            # Бизнес-слой
    │   └── web/                # Контроллеры Spring MVC и формы
    └── resources/
        ├── application.yml     # Настройки DataSource и Hibernate
        ├── templates/          # Представления Thymeleaf
        └── static/css/         # Стили
```
