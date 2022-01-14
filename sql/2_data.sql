-- MySQL dump 10.13  Distrib 5.7.36, for Linux (x86_64)
--
-- Host: localhost    Database: post-restaurant-reviews
-- ------------------------------------------------------
-- Server version	5.7.36

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
-- Current Database: `post-restaurant-reviews`
--

USE `post-restaurant-reviews`;

--
-- Dumping data for table `mst_shop_category`
--

LOCK TABLES `mst_shop_category` WRITE;
/*!40000 ALTER TABLE `mst_shop_category` DISABLE KEYS */;
INSERT INTO `mst_shop_category` VALUES (1,'中華'),(2,'洋食');
/*!40000 ALTER TABLE `mst_shop_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tran_shop_categorys`
--

LOCK TABLES `tran_shop_categorys` WRITE;
/*!40000 ALTER TABLE `tran_shop_categorys` DISABLE KEYS */;
INSERT INTO `tran_shop_categorys` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `tran_shop_categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tran_shops`
--

LOCK TABLES `tran_shops` WRITE;
/*!40000 ALTER TABLE `tran_shops` DISABLE KEYS */;
INSERT INTO `tran_shops` VALUES (1,'本格中華','2022-01-06 10:03:29','2022-01-06 02:19:24'),(2,'ビストロ','2022-01-06 10:04:00','2022-01-06 02:19:24');
/*!40000 ALTER TABLE `tran_shops` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-14 12:56:46
