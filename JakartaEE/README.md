# Практическое занятие 1: Приложение с типовой архитектурой JakartaEE

**Дисциплина:** Архитектура корпоративных систем
**Студент:** Ялюхов Александр Дмитриевич  
**Группа:** 6132-010402D  

---

## 📌 Описание проекта
Трехуровневое приложение для управления каталогом товаров и категорий:
1. **Слой данных:** PostgreSQL 16 + JPA (сущности `Category`, `Product` со связью One-to-Many).
2. **Бизнес-слой:** Сессионные EJB-бины (`@Stateless`) с управлением транзакциями (CMT).
3. **Слой представления:** Jakarta REST (JAX-RS) эндпоинты + отдельный SPA-клиент на React + TypeScript (Feature-Sliced Design).

---

## 🚀 Запуск проекта

### 1. База данных и сервер GlassFish
В папке `JakartaEE`:
```bash
docker compose up -d
```
* **Консоль администратора GlassFish 7:** [https://localhost:4848](https://localhost:4848) *(admin / admin)*
* **REST API:** [http://localhost:8080/aks-app/api/products](http://localhost:8080/aks-app/api/products)

### 2. Фронтенд (React / FSD)
В папке `JakartaEE/frontend`:
```bash
npm install
npm run dev
```
Фронтенд доступен по адресу: `http://localhost:5173` (проксирует запросы на бэкенд).

---

## 📦 Сборка и развёртывание

1. **Сборка фронтенда в ресурсы WAR:**
   ```bash
   cd frontend
   npm run build
   ```
2. **Сборка WAR-пакета бэкенда:**
   ```bash
   cd ..
   mvn clean package
   ```
3. **Деплой через консоль GlassFish (не через IDE):**
   * Открыть `https://localhost:4848` -> раздел **Applications**.
   * Нажать **Deploy...** -> загрузить файл `target/aks-app.war`.
   * Задать Context Root: `/aks-app` и нажать **OK**.
   * Приложение доступно на сервере: [http://localhost:8080/aks-app/](http://localhost:8080/aks-app/)

---

## 📁 Структура каталога
```
JakartaEE/
├── docker-compose.yml     # PostgreSQL 16 + GlassFish 7
├── pom.xml                # Maven сборка Jakarta EE 10 WAR
├── sql/
│   └── init.sql           # Скрипт схемы БД и начальных данных
├── glassfish/             # Скрипты инициализации и JDBC-драйвер
├── frontend/              # Фронтенд на React + TypeScript (FSD)
└── src/main/              # Бэкенд на Jakarta EE (JPA, EJB, REST)
```
