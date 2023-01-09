-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: project_db
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

CREATE DATABASE IF NOT EXISTS project_db;
USE project_db;

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `userType` int(1) NOT NULL DEFAULT 2,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COMMENT='Tabla generada con el fin de almacenar los datos de los usuarios registrados en el sistema del proyecto integrador "proyecto la union"';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alejo95','Pedro Alejandro','Gutierrez','alejoguti77@gmail.com','$2a$10$gXzYYSEvWbVr7lZYoPZ3q.L47TjGIehyetdIkYQrMoRcLW0yib8Zm','avatar1669531337074.jpg',1),(2,'Andres','Camilo ','Gutierrez ','camilo95@correo.com','$2a$10$q8WryIahiIe.5jJEEnRPfO0Bzqr.6d/WPzqdfCJ.Ol2n4IUNHkXMy','avatar1669775788487.jpg',1),(4,'Ricardo73','Fabio Ricardo','Gutierrez Barrios','ricardo@correo.com','$2a$10$2O7EHYVGJv5HLdILA331ceH7TEgHNFlLn3y9p2gyVk8lmYDwQnHu6','avatar1669523220094.jpg',1),(5,'Paola79','Paola Andrea','Garcia Becerra','pao@correo.com','$2a$10$Hj6u/hHZVqflsdZ1AMMLDuGeUwl8B51lhi7/F4bvGlwArQwRseRp2','avatar1669582377992.png',1),(7,'Manuel99','Manuel Ricardo','Gutierrez Garcia','manuel@correo.com','$2a$10$h3NZeijWkLvZRr8rt0dUZeoDiQPpr5lrD57ZnYL9o8J3RPeLsTwdS','avatar1669586574561.jpg',1),(10,'Michael96','Michael Daniel','Suarez Rivera','michael@correo.com','$2a$10$E6TvMvbRK.cFEU67/HFE0.KKv7ps.0/4beBLUq1ovOXzBkbnh0b2i','avatar1669700123330.jpg',1),(16,'Joan59','Joan Sebastian','Diaz Parra','joan@correo.com','$2a$10$lLvUfjjZyiNFWR64/AwAkegcKnjVoGRyrIeZL8ejZBkSZQ3/vM.fy','avatar1669700337699.jpg',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-30 17:38:25
