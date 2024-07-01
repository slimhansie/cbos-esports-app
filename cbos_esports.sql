-- phpMyAdmin SQL Dump

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cbos_esports`
--

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `match_id` int NOT NULL,
  `team1_id` int NOT NULL,
  `team2_id` int NOT NULL,
  `outcome_id` int NOT NULL,
  `match_format_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `starting_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `match_formats`
--

CREATE TABLE `match_formats` (
  `match_format_id` int NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `match_formats`
--

INSERT INTO `match_formats` (`match_format_id`, `title`) VALUES
(1, 'BO1'),
(2, 'BO3'),
(3, 'BO5');

-- --------------------------------------------------------

--
-- Table structure for table `outcomes`
--

CREATE TABLE `outcomes` (
  `outcome_id` int NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `outcomes`
--

INSERT INTO `outcomes` (`outcome_id`, `title`) VALUES
(1, 'Team 1 Win'),
(2, 'Team 2 Win'),
(3, 'Draw'),
(4, 'Cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `rounds`
--

CREATE TABLE `rounds` (
  `round_id` int NOT NULL,
  `match_id` int NOT NULL,
  `outcome_id` int NOT NULL,
  `round_format_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `starting_time` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `round_formats`
--

CREATE TABLE `round_formats` (
  `round_format_id` int NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` blob,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `team1_id` (`team1_id`),
  ADD KEY `team2_id` (`team2_id`),
  ADD KEY `outcome_id` (`outcome_id`),
  ADD KEY `match_format_id` (`match_format_id`);

--
-- Indexes for table `match_formats`
--
ALTER TABLE `match_formats`
  ADD PRIMARY KEY (`match_format_id`);

--
-- Indexes for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD PRIMARY KEY (`outcome_id`);

--
-- Indexes for table `rounds`
--
ALTER TABLE `rounds`
  ADD PRIMARY KEY (`round_id`),
  ADD KEY `match_id` (`match_id`),
  ADD KEY `outcome_id` (`outcome_id`),
  ADD KEY `round_format_id` (`round_format_id`);

--
-- Indexes for table `round_formats`
--
ALTER TABLE `round_formats`
  ADD PRIMARY KEY (`round_format_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `match_formats`
--
ALTER TABLE `match_formats`
  MODIFY `match_format_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `outcomes`
--
ALTER TABLE `outcomes`
  MODIFY `outcome_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rounds`
--
ALTER TABLE `rounds`
  MODIFY `round_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `round_formats`
--
ALTER TABLE `round_formats`
  MODIFY `round_format_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team1_id`) REFERENCES `teams` (`team_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`team2_id`) REFERENCES `teams` (`team_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`match_format_id`) REFERENCES `match_formats` (`match_format_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `matches_ibfk_4` FOREIGN KEY (`outcome_id`) REFERENCES `outcomes` (`outcome_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `rounds`
--
ALTER TABLE `rounds`
  ADD CONSTRAINT `rounds_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `rounds_ibfk_2` FOREIGN KEY (`outcome_id`) REFERENCES `outcomes` (`outcome_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `rounds_ibfk_3` FOREIGN KEY (`round_format_id`) REFERENCES `round_formats` (`round_format_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
