-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2021 at 11:41 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `placcid`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments_and_rates`
--

CREATE TABLE `comments_and_rates` (
  `news_url` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `comment` text NOT NULL,
  `rates` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments_and_rates`
--

INSERT INTO `comments_and_rates` (`news_url`, `email`, `comment`, `rates`) VALUES
('https://www.cnn.com/videos/tv/2021/03/13/smerconish-is-one-shot-for-all-better-than-none-for-some.cnn\"', 'ogaleo@lwane.com', 'real good', 6),
('https://www.cnn.com/videos/tv/2021/03/13/smerconish-is-one-shot-for-all-better-than-none-for-some.cnn\"', 'ogaleone85@gmail.com', 'Boring', 4),
('https://www.cnn.com/videos/tv/2021/03/13/smerconish-is-one-shot-for-all-better-than-none-for-some.cnn\"', 'salesrep@gmail.com', 'fretion', 3),
('https://www.nytimes.com/2021/03/02/sports/ncaabasketball/gonzaga-ncaa-tournamment-march-madness.html\"', 'ogaleone83@gmail.com', 'yes goyanzaaaaa!!!!!!!!!!!', 8);

-- --------------------------------------------------------

--
-- Table structure for table `newsforshare`
--

CREATE TABLE `newsforshare` (
  `url` varchar(255) NOT NULL,
  `fb` int(11) NOT NULL,
  `tw` int(11) NOT NULL,
  `wh` int(11) NOT NULL,
  `te` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments_and_rates`
--
ALTER TABLE `comments_and_rates`
  ADD PRIMARY KEY (`news_url`,`email`);

--
-- Indexes for table `newsforshare`
--
ALTER TABLE `newsforshare`
  ADD PRIMARY KEY (`url`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
