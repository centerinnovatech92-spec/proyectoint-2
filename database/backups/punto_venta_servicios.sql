-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: punto_venta
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `Id_servicio` int NOT NULL AUTO_INCREMENT,
  `Nombre_servicio` varchar(100) NOT NULL,
  `Categoria` varchar(50) DEFAULT NULL,
  `Costo_unitario` decimal(10,2) DEFAULT NULL,
  `Precio_cliente` decimal(10,2) DEFAULT NULL,
  `Tiempo_estimado` time DEFAULT NULL,
  PRIMARY KEY (`Id_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Programación','Tecnología',300.00,850.00,'01:00:00'),(2,'Desarrollo Web y de Software','Tecnología',500.00,15000.00,'40:00:00'),(3,'Diseño de Baseses de Datos','Tecnología',800.00,2500.00,'08:00:00'),(4,'Diseño Gráfico','Diseño',400.00,1800.00,'05:00:00'),(5,'Edición e Ilustración Digital','Diseño',250.00,900.00,'03:00:00'),(6,'Animación','Diseño',150.00,600.00,'02:00:00'),(7,'Electrónica','Técnicos',200.00,750.00,'01:30:00'),(8,'Montaje de Circuitos','Técnicos',350.00,1200.00,'02:00:00'),(9,'Mantenimiento y Diagnóstico','Técnicos',150.00,500.00,'01:00:00'),(10,'Matemáticas/Álgebra','Educación',100.00,350.00,'01:00:00'),(11,'Cálculo Diferencial e Integral','Educación',120.00,450.00,'01:00:00'),(12,'Física','Educación',120.00,450.00,'01:00:00');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-26  8:24:13
