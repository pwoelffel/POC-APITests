-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `POC`;
CREATE DATABASE `POC` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `POC`;

DROP TABLE IF EXISTS `animal`;
CREATE TABLE `animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `owner_id` int NOT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `type` (`type`),
  CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `animal_ibfk_2` FOREIGN KEY (`type`) REFERENCES `animal_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `animal` (`id`, `name`, `owner_id`, `type`) VALUES
(1,	'a',	1,	1),
(2,	'b',	1,	1),
(3,	'c',	1,	2),
(4,	'd',	2,	3),
(5,	'e',	2,	3),
(6,	'f',	3,	4)
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `name` = VALUES(`name`), `owner_id` = VALUES(`owner_id`), `type` = VALUES(`type`);

DROP TABLE IF EXISTS `animal_type`;
CREATE TABLE `animal_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `animal_type` (`id`, `type`) VALUES
(1,	'dog'),
(2,	'cat'),
(3,	'hamster'),
(4,	'horse')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `type` = VALUES(`type`);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user` (`id`, `username`) VALUES
(1,	'toto'),
(2,	'tata'),
(3,	'titi')
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`), `username` = VALUES(`username`);

-- 2023-04-16 11:43:43
