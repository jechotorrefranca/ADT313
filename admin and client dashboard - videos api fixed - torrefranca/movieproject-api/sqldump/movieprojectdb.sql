-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 11:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieprojectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `characterName` varchar(120) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casts`
--

INSERT INTO `casts` (`id`, `movieId`, `userId`, `name`, `url`, `characterName`, `dateCreated`, `dateUpdated`) VALUES
(1, 38, 1, 'Robert Downey Jr.', 'https://image.tmdb.org/t/p/original/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg', 'Tony Stark / Iron Man', '2024-10-22 03:25:43', '0000-00-00 00:00:00'),
(2, 38, 1, 'Chris Evans', 'https://image.tmdb.org/t/p/original/3bOGNsHlrswhyW79uvIHH1V43JI.jp', 'Steve Rogers / Captain America', '2024-10-22 03:31:13', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text NOT NULL,
  `popularity` float NOT NULL,
  `releaseDate` date NOT NULL,
  `voteAverage` float NOT NULL,
  `backdropPath` varchar(255) NOT NULL,
  `posterPath` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `userId`, `tmdbId`, `title`, `overview`, `popularity`, `releaseDate`, `voteAverage`, `backdropPath`, `posterPath`, `isFeatured`, `dateCreated`, `dateUpdated`) VALUES
(217, 1, 532067, '映画 この素晴らしい世界に祝福を！紅伝説', 'It is not strange that the Demon Lord\'s forces fear the Crimson Demons, the clan from which Megumin and Yunyun originate. Even if the Demon Lord\'s generals attack their village, the Crimson Demons can just easily brush them off with their supreme mastery of advanced and overpowered magic.  When Yunyun receives a seemingly serious letter regarding a potential disaster coming to her hometown, she immediately informs Kazuma Satou and the rest of his party. After a series of wacky misunderstandings, it turns out to be a mere prank by her fellow demon who wants to be an author. Even so, Megumin becomes worried about her family and sets out toward the Crimson Demons\' village with the gang.  There, Kazuma and the others decide to sightsee the wonders of Megumin\'s birthplace. However, they soon come to realize that the nonsense threat they received might have been more than just a joke.', 22.965, '2019-08-30', 8.1, 'https://image.tmdb.org/t/p/original//wqpTrmGiqMJ6onAq3zrBhfomIJl.jpg', 'https://image.tmdb.org/t/p/original//fv5BgcfkpWh3V6Pb1qVlXESBOdl.jpg', 0, '2024-11-30 21:49:12', '0000-00-00 00:00:00'),
(220, 1, 803422, 'Peppa Pig: Princess Peppa & Sir George The Brave', 'Peppa is a lovable, cheeky little piggy who lives with her younger brother George, Mummy Pig and Daddy Pig. Peppa loves playing games, dressing up, visiting exciting places and making new friends, but her absolutely favourite thing is jumping up and down in muddy puddles. Her adventures always end happily with loud snorts of laughter.', 1.436, '2009-01-01', 0, 'https://image.tmdb.org/t/p/original/null', 'https://image.tmdb.org/t/p/original//4cFuBXGUvTu2Xnb6Au36H3yT7Wn.jpg', 0, '2024-11-30 22:07:17', '0000-00-00 00:00:00'),
(221, 1, 597, 'Titanic', '101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic\'s departure through to its death—on its first and last voyage—on April 15, 1912.', 157.105, '1997-11-18', 7.906, 'https://image.tmdb.org/t/p/original//tupgjqhWx5oieQrdyesO3aclUX9.jpg', 'https://image.tmdb.org/t/p/original//9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', 0, '2024-11-30 22:08:01', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 38, 'uploads/photos/poster1728019066.jpg', 'test', '2024-10-04 05:17:46', '0000-00-00 00:00:00'),
(2, 1, 38, 'https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', 'Test Description', '2024-10-22 04:56:09', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `middleName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(1, 'test@mail.com', 'd8578edf8458ce06fbc5bb76a58c5ca4', 'Lem', '', 'Francisco', '09351107560', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `site` varchar(255) NOT NULL,
  `videoKey` varchar(255) NOT NULL,
  `videoType` varchar(255) NOT NULL,
  `official` tinyint(1) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `userId`, `movieId`, `url`, `name`, `site`, `videoKey`, `videoType`, `official`, `dateCreated`, `dateUpdated`) VALUES
(21, 1, 217, 'https://www.youtube.com/embed/5h4rQY9bpgE', 'Official Trailer', 'YouTube', '5h4rQY9bpgE', 'Trailer', 1, '2024-11-30 21:49:13', '0000-00-00 00:00:00'),
(23, 1, 220, 'https://www.youtube.com/embed/not_available', 'No video selected', 'YouTube', 'not_available', 'placeholder', 0, '2024-11-30 22:07:18', '0000-00-00 00:00:00'),
(24, 1, 221, 'https://www.youtube.com/embed/zSRvmHSgaBg', 'Won\'t Let Go Clip', 'YouTube', 'zSRvmHSgaBg', 'Clip', 1, '2024-11-30 22:08:02', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
