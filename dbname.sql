-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: ayudalos_production
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.16.04.1

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
-- Table structure for table `categoryDonations`
--

DROP TABLE IF EXISTS `categoryDonations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoryDonations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `moneyRequired` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoryDonations`
--

LOCK TABLES `categoryDonations` WRITE;
/*!40000 ALTER TABLE `categoryDonations` DISABLE KEYS */;
INSERT INTO `categoryDonations` VALUES (1,'Comida',0,'2018-10-24 22:15:25','2018-10-24 22:15:25'),(2,'Ropa',0,'2018-10-24 22:15:30','2018-10-24 22:15:30'),(3,'Educación',1,'2018-10-24 22:15:54','2018-10-24 22:17:51'),(4,'Tecnología',0,'2018-10-24 22:16:23','2018-10-24 22:18:09'),(5,'Voluntariado',0,'2018-10-24 22:16:36','2018-10-24 22:18:18'),(6,'Otros',0,'2018-10-24 22:16:59','2018-10-24 22:18:24'),(7,'Fondos monetarios',1,'2018-10-25 15:19:25','2018-10-25 15:19:25');
/*!40000 ALTER TABLE `categoryDonations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentPetitions`
--

DROP TABLE IF EXISTS `commentPetitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentPetitions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `petitionId` int(11) DEFAULT NULL,
  `userUid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `petitionId` (`petitionId`),
  KEY `userUid` (`userUid`),
  CONSTRAINT `commentPetitions_ibfk_1` FOREIGN KEY (`petitionId`) REFERENCES `petitions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `commentPetitions_ibfk_2` FOREIGN KEY (`userUid`) REFERENCES `users` (`uid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentPetitions`
--

LOCK TABLES `commentPetitions` WRITE;
/*!40000 ALTER TABLE `commentPetitions` DISABLE KEYS */;
INSERT INTO `commentPetitions` VALUES (1,NULL,'Hola historia','2018-10-25 15:17:42','2018-10-25 15:17:42',1,'H9MoHIlmm2eDDpuXuLsiwmqEeSy2'),(2,NULL,'Segunda historia','2018-10-25 15:18:25','2018-10-25 15:18:25',2,'H9MoHIlmm2eDDpuXuLsiwmqEeSy2'),(3,NULL,'También me pueden escribir a mi numero 3003213431','2018-11-10 05:21:55','2018-11-10 05:21:55',3,'H9MoHIlmm2eDDpuXuLsiwmqEeSy2');
/*!40000 ALTER TABLE `commentPetitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentPosts`
--

DROP TABLE IF EXISTS `commentPosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentPosts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `userUid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `postId` (`postId`),
  KEY `userUid` (`userUid`),
  CONSTRAINT `commentPosts_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `commentPosts_ibfk_2` FOREIGN KEY (`userUid`) REFERENCES `users` (`uid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentPosts`
--

LOCK TABLES `commentPosts` WRITE;
/*!40000 ALTER TABLE `commentPosts` DISABLE KEYS */;
INSERT INTO `commentPosts` VALUES (1,NULL,'Hola','2018-10-25 15:01:35','2018-10-25 15:01:35',2,'H9MoHIlmm2eDDpuXuLsiwmqEeSy2'),(2,NULL,'Hola','2018-10-25 17:05:20','2018-10-25 17:05:20',4,'Tm2Yn7Sv7rWRrbMsK4VgJFSsu4r2'),(3,NULL,'Hello','2018-10-30 01:12:23','2018-10-30 01:12:23',5,'H9MoHIlmm2eDDpuXuLsiwmqEeSy2');
/*!40000 ALTER TABLE `commentPosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parentComments`
--

DROP TABLE IF EXISTS `parentComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parentComments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parentComments`
--

LOCK TABLES `parentComments` WRITE;
/*!40000 ALTER TABLE `parentComments` DISABLE KEYS */;
/*!40000 ALTER TABLE `parentComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petitions`
--

DROP TABLE IF EXISTS `petitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `petitions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tittle` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photoURL` varchar(255) DEFAULT NULL,
  `userUid` varchar(255) DEFAULT NULL,
  `expirationTime` datetime DEFAULT NULL,
  `goal` int(11) DEFAULT NULL,
  `raised` int(11) DEFAULT NULL,
  `stateId` int(11) DEFAULT NULL,
  `typePetitionId` int(11) DEFAULT NULL,
  `typeDestinationId` int(11) DEFAULT NULL,
  `categoryDonationId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petitions`
--

LOCK TABLES `petitions` WRITE;
/*!40000 ALTER TABLE `petitions` DISABLE KEYS */;
INSERT INTO `petitions` VALUES (1,'Primera historia','Primera historia',NULL,'H9MoHIlmm2eDDpuXuLsiwmqEeSy2',NULL,NULL,NULL,NULL,NULL,NULL,1,'2018-10-25 15:17:35','2018-10-25 15:17:35'),(2,'Segunda historia con dinero','Segunda historia con dinero','','H9MoHIlmm2eDDpuXuLsiwmqEeSy2',NULL,30000,21492,NULL,NULL,NULL,3,'2018-10-25 15:18:10','2018-10-25 15:18:10'),(3,'Adopción de gatos','Tengo 4 gatitos en mi apartamento que encontré en la calle, no puedo tenerlos todos, alguien quiere adoptar uno? Sería de mucha ayuda. Están vacunados.',NULL,'H9MoHIlmm2eDDpuXuLsiwmqEeSy2',NULL,NULL,0,NULL,NULL,NULL,6,'2018-11-10 05:21:29','2018-11-10 05:21:29');
/*!40000 ALTER TABLE `petitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tittle` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photoURL` varchar(255) DEFAULT NULL,
  `destine` varchar(255) DEFAULT NULL,
  `expirationTime` datetime DEFAULT NULL,
  `deliverTime` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userUid` varchar(255) DEFAULT NULL,
  `categoryDonationId` int(11) DEFAULT NULL,
  `typeDestinationId` int(11) DEFAULT NULL,
  `typeDonationId` int(11) DEFAULT NULL,
  `stateId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userUid` (`userUid`),
  KEY `categoryDonationId` (`categoryDonationId`),
  KEY `typeDestinationId` (`typeDestinationId`),
  KEY `typeDonationId` (`typeDonationId`),
  KEY `stateId` (`stateId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userUid`) REFERENCES `users` (`uid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`categoryDonationId`) REFERENCES `categoryDonations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`typeDestinationId`) REFERENCES `typeDestinations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_4` FOREIGN KEY (`typeDonationId`) REFERENCES `typeDonations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_5` FOREIGN KEY (`stateId`) REFERENCES `states` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'Primera donacion','Primera donacion','',NULL,NULL,NULL,'2018-10-25 15:01:29','2018-10-25 15:01:29','H9MoHIlmm2eDDpuXuLsiwmqEeSy2',1,NULL,NULL,NULL),(4,'Segunda donacion','Segunda donacion',NULL,NULL,NULL,NULL,'2018-10-25 17:05:12','2018-10-25 17:05:12','Tm2Yn7Sv7rWRrbMsK4VgJFSsu4r2',1,NULL,NULL,NULL),(5,'Quiero regalar libros para niños entre 3 y 7 años ','El que quiera venir por ellos estoy ubicado en Oporto',NULL,NULL,NULL,NULL,'2018-10-28 19:44:48','2018-10-28 19:44:48','Zqwlz5J41cXXXS2az9iBrCDz7Ky1',3,NULL,NULL,NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Activo','2018-10-24 22:19:36','2018-10-24 22:19:36'),(2,'Inactivo','2018-10-24 22:19:46','2018-10-24 22:19:46'),(3,'Eliminado','2018-10-24 22:19:53','2018-10-24 22:19:53');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeComments`
--

DROP TABLE IF EXISTS `typeComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `typeComments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeComments`
--

LOCK TABLES `typeComments` WRITE;
/*!40000 ALTER TABLE `typeComments` DISABLE KEYS */;
INSERT INTO `typeComments` VALUES (1,'Eliminado','2018-10-24 22:20:48','2018-10-24 22:20:48'),(2,'Activo','2018-10-24 22:20:53','2018-10-24 22:20:53'),(3,'Inactivo','2018-10-24 22:21:20','2018-10-24 22:21:20');
/*!40000 ALTER TABLE `typeComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeDestinations`
--

DROP TABLE IF EXISTS `typeDestinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `typeDestinations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeDestinations`
--

LOCK TABLES `typeDestinations` WRITE;
/*!40000 ALTER TABLE `typeDestinations` DISABLE KEYS */;
INSERT INTO `typeDestinations` VALUES (1,'Fundación','2018-10-24 22:21:46','2018-10-24 22:21:46'),(2,'Suscriptor','2018-10-24 22:22:05','2018-10-24 22:22:05'),(3,'Recaudo','2018-10-24 22:22:56','2018-10-24 22:22:56');
/*!40000 ALTER TABLE `typeDestinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeDonations`
--

DROP TABLE IF EXISTS `typeDonations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `typeDonations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeDonations`
--

LOCK TABLES `typeDonations` WRITE;
/*!40000 ALTER TABLE `typeDonations` DISABLE KEYS */;
INSERT INTO `typeDonations` VALUES (1,'Eliminado','2018-10-24 22:20:36','2018-10-24 22:20:36'),(2,'Activo','2018-10-24 22:20:58','2018-10-24 22:20:58'),(3,'Inactivo','2018-10-24 22:21:16','2018-10-24 22:21:16');
/*!40000 ALTER TABLE `typeDonations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typePetitions`
--

DROP TABLE IF EXISTS `typePetitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `typePetitions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typePetitions`
--

LOCK TABLES `typePetitions` WRITE;
/*!40000 ALTER TABLE `typePetitions` DISABLE KEYS */;
INSERT INTO `typePetitions` VALUES (1,'Eliminado','2018-10-24 22:20:42','2018-10-24 22:20:42'),(2,'Activo','2018-10-24 22:21:03','2018-10-24 22:21:03'),(3,'Inactivo','2018-10-24 22:21:11','2018-10-24 22:21:11');
/*!40000 ALTER TABLE `typePetitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeUsers`
--

DROP TABLE IF EXISTS `typeUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `typeUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `passwordRequired` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeUsers`
--

LOCK TABLES `typeUsers` WRITE;
/*!40000 ALTER TABLE `typeUsers` DISABLE KEYS */;
INSERT INTO `typeUsers` VALUES (1,'Google',0,'2018-10-24 22:23:28','2018-10-25 14:23:02'),(2,'Facebook',0,'2018-10-24 22:23:34','2018-10-25 14:23:13'),(3,'Telefono',1,'2018-10-24 22:24:14','2018-10-25 15:30:55'),(4,'Email',1,'2018-10-25 15:31:30','2018-10-25 15:31:30');
/*!40000 ALTER TABLE `typeUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `displayName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photoURL` varchar(255) DEFAULT NULL,
  `uid` varchar(255) NOT NULL,
  `typeUserId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Fashion Fever','fashion@fever2.com','https://firebasestorage.googleapis.com/v0/b/ayudalosprod.appspot.com/o/2KW902eHqBYNDq7Fiy064gk3gf63%2Fphoto?alt=media&token=57ac31bc-2694-4f49-b3f9-ffe79979618e','2KW902eHqBYNDq7Fiy064gk3gf63',4,'2018-10-25 15:24:23','2018-10-25 15:24:23'),('Fashion Fever','fashion@fever4.com','https://firebasestorage.googleapis.com/v0/b/ayudalosprod.appspot.com/o/Cjpjp6uwG6XaaF61JzcaYwiSpVW2%2Fphoto?alt=media&token=90acb5bc-3149-43a2-abdc-0ff54397632d','Cjpjp6uwG6XaaF61JzcaYwiSpVW2',4,'2018-10-25 15:26:44','2018-10-25 15:26:44'),('Fashion Fever ','fashionfever2@gmail.com','https://png.icons8.com/color/1600/person-male.png','H44RVsEqjBY12COOkiB9T0n3Nvh1',4,'2018-11-19 23:57:55','2018-11-19 23:57:55'),('Wilson Manzano Sanz','wilson.manzanosanz@gmail.com','https://lh3.googleusercontent.com/-6Rkws4trSF4/AAAAAAAAAAI/AAAAAAAAMIw/3Ym9TRyMmGY/photo.jpg','H9MoHIlmm2eDDpuXuLsiwmqEeSy2',1,'2018-10-25 15:00:50','2018-12-30 20:34:49'),('Sofia Gomez Figueroa','sofiagf62@gmail.com','https://lh6.googleusercontent.com/-4wDBBJi4s1k/AAAAAAAAAAI/AAAAAAAAACw/254MQno0P9A/photo.jpg','jYzGB2OfNncEmLES069PlykpfI53',1,'2018-11-01 23:57:02','2018-11-01 23:57:02'),('Fashion Fever','fashion@fever3.com','https://png.icons8.com/color/1600/person-male.png','T58DMkigjhcpJdVpA68Tm11mNhC2',4,'2018-10-25 15:26:16','2018-10-25 15:26:16'),('Fashion Fever','fashion@fever.com','https://firebasestorage.googleapis.com/v0/b/ayudalosprod.appspot.com/o/Tm2Yn7Sv7rWRrbMsK4VgJFSsu4r2%2Fphoto?alt=media&token=ddfd5dda-9f34-4439-83b9-9d1120725b86','Tm2Yn7Sv7rWRrbMsK4VgJFSsu4r2',4,'2018-10-25 15:20:52','2018-10-25 15:20:52'),('Marta Sanz','martasanzb06@gmail.com','https://lh6.googleusercontent.com/-PAERau6n-JI/AAAAAAAAAAI/AAAAAAAAAAA/ABtNlbD-tkchWet9vIa9Ig-KAsRydg6XUg/mo/photo.jpg','Zqwlz5J41cXXXS2az9iBrCDz7Ky1',1,'2018-10-28 19:40:51','2018-10-28 19:40:51');
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

-- Dump completed on 2019-01-03 15:49:45
