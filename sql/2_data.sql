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
INSERT INTO `mst_shop_category` VALUES (1,'中華','2022-01-16 12:56:45','2022-01-16 03:57:01'),(2,'洋食','2022-01-16 12:56:45','2022-01-16 03:57:01');
/*!40000 ALTER TABLE `mst_shop_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tran_review`
--

LOCK TABLES `tran_review` WRITE;
/*!40000 ALTER TABLE `tran_review` DISABLE KEYS */;
INSERT INTO `tran_review` VALUES (1,1,1,5,'2013-10-31 15:39:15','2013-11-02 12:45:28','最高！','2022-01-16 13:02:37','2022-01-16 04:02:37');
/*!40000 ALTER TABLE `tran_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tran_shop`
--

LOCK TABLES `tran_shop` WRITE;
/*!40000 ALTER TABLE `tran_shop` DISABLE KEYS */;
INSERT INTO `tran_shop` VALUES (1,'本格中華','0120-00-1234','東京都千代田区1丁目',3.92,'7,000-10,000','2022-01-06 10:03:29','2022-01-06 02:19:24'),(2,'ビストロ','0120-00-1234','東京都千代田区1丁目',2.96,'3,000-5,000','2022-01-06 10:04:00','2022-01-06 02:19:24'),(3,'長野寿司','0120-00-1234','東京都千代田区1丁目',3.01,'5,000-8,000','2022-01-16 15:15:06','2022-01-16 06:15:13'),(4,'本格オムライスの卵','0120-00-1234','東京都千代田区1丁目',3.56,'1,000-3,000','2022-01-16 17:22:36','2022-01-18 01:56:26'),(5,'ちゃんこ鍋','0120-00-1234','東京都千代田区1丁目',3,'1,000-3,000','2022-01-17 13:39:53','2022-01-17 04:39:53'),(6,'肉寿司','0120-00-1234','東京都千代田区1丁目',2.12,'1,000-3,000','2022-01-17 20:58:07','2022-01-17 11:58:07'),(7,'すき焼き','0120-00-1234','東京都千代田区1丁目',2.56,'5,000-8,000','2022-01-17 20:58:58','2022-01-17 11:58:58'),(8,'串カツ','0120-00-1234','東京都千代田区1丁目',3.65,'5,000-8,000','2022-01-18 08:51:52','2022-01-17 23:51:52');
/*!40000 ALTER TABLE `tran_shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tran_shop_category`
--

LOCK TABLES `tran_shop_category` WRITE;
/*!40000 ALTER TABLE `tran_shop_category` DISABLE KEYS */;
INSERT INTO `tran_shop_category` VALUES (1,1,'2022-01-16 12:56:45','2022-01-16 03:50:48'),(2,2,'2022-01-16 12:56:45','2022-01-16 03:50:48');
/*!40000 ALTER TABLE `tran_shop_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tran_user`
--

LOCK TABLES `tran_user` WRITE;
/*!40000 ALTER TABLE `tran_user` DISABLE KEYS */;
INSERT INTO `tran_user` VALUES (1,'山田 太郎','sample@example.com','passw0rd',NULL,'2022-01-16 12:56:45','2022-01-16 03:56:45',NULL);
/*!40000 ALTER TABLE `tran_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-18 11:10:48
