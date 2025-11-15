-- ------------------------------------------------------------------
-- Script de inicialización para la base de datos satlife_db
-- Incluye tablas de usuarios, contactos y registro de visitas.
-- Ejecutar este archivo en phpMyAdmin o MySQL CLI antes de usar backend.
-- ------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS satlife_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE satlife_db;

-- ---------------------------------------------------------------
-- Tabla: users
-- Almacena a los usuarios autenticados de la plataforma.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(50) DEFAULT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'usuario',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE INDEX idx_users_email ON users (email);

-- ---------------------------------------------------------------
-- Tabla: contacts
-- Libreta de direcciones por usuario autenticado.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) DEFAULT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  notes TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_contacts_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE INDEX idx_contacts_user ON contacts (user_id);

-- ---------------------------------------------------------------
-- Tabla: visits
-- Registra cada visita para métricas básicas del sitio.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS visits (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(150) NOT NULL,
  visited_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(50) DEFAULT NULL
) ENGINE = InnoDB;

CREATE INDEX idx_visits_page ON visits (page);
