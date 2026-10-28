DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    sku VARCHAR(50) NOT NULL UNIQUE,
    category_id BIGINT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) 
        REFERENCES categories(id) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);


INSERT INTO categories (name, description) VALUES
('Ноутбуки и ПК', 'Портативные и стационарные компьютеры для учебы, работы и игр'),
('Смартфоны и гаджеты', 'Мобильные устройства, смарт-часы и аксессуары к ним'),
('Комплектующие для ПК', 'Процессоры, видеокарты, оперативная память и накопители'),
('Сетевое оборудование', 'Маршрутизаторы, коммутаторы, сетевые адаптеры');

INSERT INTO products (name, description, price, quantity, sku, category_id) VALUES
('Ноутбук ThinkPad T14 Gen 4', '14" FHD IPS, AMD Ryzen 7 PRO 7840U, 32GB RAM, 1TB SSD', 119990.00, 12, 'LNV-TP-T14G4', 1),
('Ноутбук MacBook Air 13 M2', '13.6" Liquid Retina, Apple M2 8-core, 16GB RAM, 512GB SSD', 134990.00, 8, 'APL-MBA13-M2', 1),
('Смартфон Pixel 8 Pro', '6.7" OLED 120Hz, Google Tensor G3, 12GB RAM, 256GB, Obsidian', 79990.00, 15, 'GOOG-P8P-256', 2),
('Смартфон Galaxy S24 Ultra', '6.8" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 12GB RAM, 512GB', 124990.00, 5, 'SAM-S24U-512', 2),
('Процессор AMD Ryzen 7 7800X3D', '8 ядер, 16 потоков, до 5.0 ГГц, 96MB L3 кэш, AM5, BOX', 41500.00, 20, 'AMD-R7-7800X3D', 3),
('Видеокарта GeForce RTX 4070 Ti Super', '16GB GDDR6X, 256-bit, PCI-E 4.0, 3x DisplayPort, HDMI', 92000.00, 6, 'NV-RTX4070TIS', 3),
('Роутер MikroTik hEX S', '5x Gigabit Ethernet, SFP port, RouterOS L4, microSD slot', 8400.00, 25, 'MT-HEXS-E50UG', 4),
('Wi-Fi 6 роутер Keenetic Giga', 'AX1800, 5x Gigabit Ethernet, USB 3.0, USB 2.0, Mesh', 13800.00, 18, 'KN-GIGA-KN1011', 4);
