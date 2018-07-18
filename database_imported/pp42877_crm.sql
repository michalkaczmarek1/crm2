-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 18 Lip 2018, 10:02
-- Wersja serwera: 5.6.39
-- Wersja PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `pp42877_crm`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `admin`
--

CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `admin`
--

INSERT INTO `admin` (`username`, `pass`) VALUES
('admin', 'd75fcbd5b2a7cd5c83c66cc8a6772e7d');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `car`
--

CREATE TABLE `car` (
  `id_car` int(11) NOT NULL,
  `mark` varchar(25) DEFAULT NULL,
  `model` varchar(25) DEFAULT NULL,
  `engine` int(11) DEFAULT NULL,
  `horsepower` int(11) DEFAULT NULL,
  `truck_or_delivery` enum('Samochód ciężarowy','Samochód dostawczy') NOT NULL,
  `price` decimal(9,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `car`
--

INSERT INTO `car` (`id_car`, `mark`, `model`, `engine`, `horsepower`, `truck_or_delivery`, `price`) VALUES
(3, 'Reanult', 'Magnum', 11900, 530, 'Samochód ciężarowy', '200000'),
(4, 'Mercedes', 'Sprinter', 3000, 259, 'Samochód dostawczy', '150000'),
(10, 'Mercedes', 'Vito', 3000, 150, 'Samochód dostawczy', '120000');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `client`
--

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `status` enum('Stały','Zwykły') NOT NULL DEFAULT 'Zwykły',
  `id_salesman` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `client`
--

INSERT INTO `client` (`id_client`, `name`, `surname`, `email`, `address`, `city`, `status`, `id_salesman`) VALUES
(15, 'Marta', 'Kowalska', 'm@p.pl', 'testowy', 'Wrocłąw', 'Stały', 55),
(17, 'Jan', 'Kaczmarek', 'w@p.pl', 'adres testowy', 'Warszawa', 'Zwykły', 55),
(19, 'Jan', 'Nowak', 'mi123456ka@gmail.com', 'test', 'test', 'Stały', 55),
(41, 'Arnold', 'Kowalczyk', 'arnie@onet.pl', 'testowy przyklad', 'Zielona Góra', 'Stały', 71),
(42, 'Henryk', 'Konarczyk', 'henryk@wp.pl', 'przykladowy', 'Warszawa', 'Zwykły', 117);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `client_register`
--

CREATE TABLE `client_register` (
  `username` varchar(50) NOT NULL,
  `pass` text NOT NULL,
  `id_client` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `client_register`
--

INSERT INTO `client_register` (`username`, `pass`, `id_client`) VALUES
('test', 'd75fcbd5b2a7cd5c83c66cc8a6772e7d', 15);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `complaint`
--

CREATE TABLE `complaint` (
  `nr_complaint` int(11) NOT NULL,
  `content` text NOT NULL,
  `id_client` int(11) NOT NULL,
  `nr_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `complaint`
--

INSERT INTO `complaint` (`nr_complaint`, `content`, `id_client`, `nr_order`) VALUES
(3, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla maxime, tempora impedit suscipit. Nobis ipsam error, impedit quo placeat fugiat cupiditate officiis aspernatur eos est quisquam quasi dolor, mollitia ducimus! Expedita eligendi illum totam harum optio fugiat, nisi quibusdam deleniti, cumque suscipit minima ducimus ipsam nemo, velit repellat sunt a labore corrupti unde autem libero excepturi saepe maiores voluptatibus, dolorem! Dolorum soluta non maxime dicta omnis laudantium veritatis at quam delectus nemo harum illo, sit tempore esse accusamus laborum quod!', 15, 74),
(4, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla maxime, tempora impedit suscipit. Nobis ipsam error, impedit quo placeat fugiat cupiditate officiis aspernatur eos est quisquam quasi dolor, mollitia ducimus! Expedita eligendi illum totam harum optio fugiat, nisi quibusdam deleniti, cumque suscipit minima ducimus ipsam nemo, velit repellat sunt a labore corrupti unde autem libero excepturi saepe maiores voluptatibus, dolorem! Dolorum soluta non maxime dicta omnis laudantium veritatis at quam delectus nemo harum illo, sit tempore esse accusamus laborum quod!', 15, 75),
(5, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, quae iste itaque provident at voluptate odio officia nam expedita atque molestiae inventore, excepturi reiciendis neque ratione. Rem deleniti amet similique ullam debitis culpa possimus aut! Ex numquam, id illo sapiente dolores ad, obcaecati consequuntur. Optio dignissimos ducimus labore voluptatibus, officiis dicta delectus libero deserunt consectetur, numquam aperiam molestias, nobis rerum recusandae laborum omnis tenetur nisi culpa maiores doloremque repellendus earum nulla tempora accusamus incidunt. Ipsum repellat, doloribus quisquam nobis ipsa!', 15, 76),
(6, 'test', 15, 76),
(7, 'moja 10 reklamacja', 15, 74),
(8, 'test', 15, 82),
(9, 'test', 15, 75),
(10, 'test', 15, 78),
(11, 'test', 15, 76),
(12, 'test', 15, 77),
(13, 'test11', 15, 81);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `content_offer`
--

CREATE TABLE `content_offer` (
  `id_content_offer` int(11) NOT NULL,
  `id_car` int(11) NOT NULL,
  `id_offer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Zrzut danych tabeli `content_offer`
--

INSERT INTO `content_offer` (`id_content_offer`, `id_car`, `id_offer`) VALUES
(17, 3, 1),
(34, 3, 8),
(18, 4, 1),
(35, 10, 8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `invoice`
--

CREATE TABLE `invoice` (
  `id_invoice` int(11) NOT NULL,
  `nr_invoice` text NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `invoice`
--

INSERT INTO `invoice` (`id_invoice`, `nr_invoice`, `date`) VALUES
(329, '2018-07-10/90', '2018-07-10'),
(330, '2018-07-10/446', '2018-07-10'),
(331, '2018-07-10/578', '2018-07-10'),
(332, '2018-07-10/21', '2018-07-10'),
(333, '2018-07-10/836', '2018-07-10'),
(334, '2018-07-10/40', '2018-07-10'),
(335, '2018-07-10/722', '2018-07-10'),
(336, '2018-07-10/434', '2018-07-10'),
(337, '2018-07-10/862', '2018-07-10'),
(338, '2018-07-10/683', '2018-07-10'),
(351, '2018-07-11/187', '2018-07-11'),
(352, '2018-07-11/693', '2018-07-11'),
(353, '2018-07-11/891', '2018-07-11'),
(354, '2018-07-11/449', '2018-07-11'),
(355, '2018-07-12/947', '2018-07-12'),
(356, '2018-07-12/13', '2018-07-12'),
(357, '2018-07-12/415', '2018-07-12'),
(359, '2018-07-13/329', '2018-07-13'),
(360, '2018-07-13/256', '2018-07-13'),
(361, '2018-07-13/371', '2018-07-13'),
(362, '2018-07-15/212', '2018-07-15'),
(363, '2018-07-15/451', '2018-07-15'),
(364, '2018-07-15/879', '2018-07-15'),
(365, '2018-07-15/384', '2018-07-15'),
(366, '2018-07-15/868', '2018-07-15'),
(367, '2018-07-15/540', '2018-07-15'),
(368, '2018-07-15/358', '2018-07-15'),
(369, '2018-07-15/110', '2018-07-15'),
(370, '2018-07-15/816', '2018-07-15'),
(371, '2018-07-15/428', '2018-07-15'),
(372, '2018-07-15/869', '2018-07-15'),
(373, '2018-07-15/51', '2018-07-15'),
(374, '2018-07-15/496', '2018-07-15'),
(376, '2018-07-15/400', '2018-07-15'),
(380, '2018-07-15/939', '2018-07-15'),
(381, '2018-07-15/5', '2018-07-15'),
(382, '2018-07-16/871', '2018-07-16'),
(383, '2018-07-16/372', '2018-07-16'),
(384, '2018-07-16/877', '2018-07-16'),
(385, '2018-07-16/41', '2018-07-16'),
(386, '2018-07-16/367', '2018-07-16'),
(387, '2018-07-16/447', '2018-07-16'),
(388, '2018-07-16/780', '2018-07-16'),
(389, '2018-07-16/101', '2018-07-16'),
(390, '2018-07-16/387', '2018-07-16'),
(391, '2018-07-16/309', '2018-07-16'),
(392, '2018-07-16/73', '2018-07-16'),
(393, '2018-07-16/66', '2018-07-16'),
(394, '2018-07-16/74', '2018-07-16'),
(395, '2018-07-16/931', '2018-07-16'),
(396, '2018-07-16/302', '2018-07-16'),
(397, '2018-07-16/132', '2018-07-16'),
(398, '2018-07-16/394', '2018-07-16'),
(401, '2018-07-16/452', '2018-07-16');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `invoice_paid`
--

CREATE TABLE `invoice_paid` (
  `id_invoice_paid` int(11) NOT NULL,
  `nr_invoice` text CHARACTER SET utf8 NOT NULL,
  `date_invoice` date NOT NULL,
  `id_salesman` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Zrzut danych tabeli `invoice_paid`
--

INSERT INTO `invoice_paid` (`id_invoice_paid`, `nr_invoice`, `date_invoice`, `id_salesman`) VALUES
(41, '2018-07-10/195', '2018-07-10', 71),
(42, '2018-07-10/365', '2018-07-10', 71),
(43, '2018-07-10/906', '2018-07-10', 71),
(44, '2018-07-10/85', '2018-07-10', 71),
(45, '2018-07-10/184', '2018-07-10', 71),
(46, '2018-07-10/946', '2018-07-10', 71),
(47, '2018-07-10/705', '2018-07-10', 71),
(48, '2018-07-10/863', '2018-07-10', 71),
(49, '2018-07-10/25', '2018-07-10', 71),
(50, '2018-07-10/873', '2018-07-10', 71),
(51, '2018-07-10/85', '2018-07-10', 71),
(52, '2018-07-10/864', '2018-07-10', 71),
(53, '2018-07-10/649', '2018-07-10', 71),
(54, '2018-07-10/748', '2018-07-10', 71),
(55, '2018-07-10/182', '2018-07-10', 71),
(56, '2018-07-10/137', '2018-07-10', 71),
(57, '2018-07-10/816', '2018-07-10', 71),
(58, '2018-07-10/581', '2018-07-10', 71),
(59, '2018-07-10/101', '2018-07-10', 71),
(60, '2018-07-10/947', '2018-07-10', 71),
(61, '2018-07-10/845', '2018-07-10', 71),
(62, '2018-07-12/781', '2018-07-12', 55),
(63, '2018-07-10/817', '2018-07-10', 55),
(64, '2018-07-15/68', '2018-07-15', 71),
(65, '2018-07-15/962', '2018-07-15', 71),
(66, '2018-07-15/391', '2018-07-15', 71),
(67, '2018-07-15/801', '2018-07-15', 71),
(68, '2018-07-10/131', '2018-07-10', 71),
(69, '2018-07-10/992', '2018-07-10', 71),
(70, '2018-07-16/856', '2018-07-16', 71),
(71, '2018-07-16/356', '2018-07-16', 71),
(72, '2018-07-17/327', '2018-07-17', 71);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `meeting`
--

CREATE TABLE `meeting` (
  `id_meeting` int(11) NOT NULL,
  `date_meeting` date DEFAULT NULL,
  `id_client` int(11) NOT NULL,
  `comments` text,
  `id_salesman` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `meeting`
--

INSERT INTO `meeting` (`id_meeting`, `date_meeting`, `id_client`, `comments`, `id_salesman`) VALUES
(4, '2018-07-11', 15, 'test', 71),
(5, '2018-07-11', 15, 'test', 71),
(6, '2018-07-11', 15, 'test', 71),
(7, '2018-07-11', 15, 'test', 71),
(10, '2018-07-11', 17, 'test', 55),
(11, '2018-07-18', 19, 'test', 71),
(12, '2018-07-16', 19, 'sadadsa', 71),
(13, '2018-07-16', 19, 'test', 71),
(14, '2018-07-16', 19, 'test', 71),
(15, '2018-07-16', 19, 'test', 71),
(16, '2018-07-16', 19, 'test', 71),
(17, '2018-07-19', 41, 'godz 12', 71),
(18, '2018-07-17', 42, 'test', 117);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `content` text,
  `date_message` date DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_salesman` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `message`
--

INSERT INTO `message` (`id_message`, `content`, `date_message`, `id_client`, `id_salesman`) VALUES
(1, 'tesst', '2018-07-14', 15, 55),
(2, 'tesst2', '2018-07-14', 15, 71),
(3, 'test3', '2018-07-14', 15, 55),
(4, 'test4', '2018-07-14', 15, 71),
(5, 'test5', '2018-07-14', 15, 55),
(8, 'test', '2018-07-15', NULL, 55),
(9, 'test2', '2018-07-15', NULL, 55),
(10, 'test3', '2018-07-15', NULL, 55),
(11, 'witam panie adaie', '2018-07-15', NULL, 71),
(12, 'hej', '2018-07-15', NULL, 55),
(13, 'hej', '2018-07-15', NULL, 55),
(14, 'test', '2018-07-15', 15, 55),
(15, 'test', '2018-07-15', 15, 55),
(16, 'test', '2018-07-15', 15, 55),
(17, 'test', '2018-07-15', 15, 55),
(18, 'test', '2018-07-15', 15, 55),
(19, 'test', '2018-07-15', NULL, 55),
(20, 'test', '2018-07-16', 15, 55),
(21, 'test', '2018-07-16', 15, 55),
(22, 't', '2018-07-16', 15, 55),
(23, 't', '2018-07-16', 15, 55),
(24, 't', '2018-07-16', 15, 55),
(25, 't', '2018-07-16', 15, 55),
(26, 't', '2018-07-16', 15, 55),
(27, 't', '2018-07-16', 15, 55),
(28, 't', '2018-07-16', 15, 55),
(29, 't', '2018-07-16', 15, 55),
(30, 't', '2018-07-16', 15, 55),
(31, 't', '2018-07-16', 15, 55),
(32, 't', '2018-07-16', 15, 55),
(33, 'res', '2018-07-16', 15, 55),
(34, 'dads', '2018-07-16', 15, 55),
(35, 'dsadas', '2018-07-16', 15, 55),
(36, 'sadad', '2018-07-16', 15, 55),
(37, 'dsad', '2018-07-16', 15, 55),
(38, 'test', '2018-07-17', NULL, 55),
(39, 'hej', '2018-07-17', 15, 117),
(40, 'hejka', '2018-07-17', 15, 117),
(41, 'czesc', '2018-07-17', 15, 117);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `offer`
--

CREATE TABLE `offer` (
  `id_offer` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `date_offer` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text,
  `reduction` decimal(4,0) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `offer`
--

INSERT INTO `offer` (`id_offer`, `name`, `date_offer`, `start_date`, `end_date`, `description`, `reduction`) VALUES
(1, 'oferta lipcowa', '2018-07-11', '2018-07-13', '2018-08-11', 'przyklad', '20'),
(8, 'oferta przykladowa', '2018-07-16', '2018-07-17', '2018-08-02', 'dsda', '40');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `order_car`
--

CREATE TABLE `order_car` (
  `nr_order` int(11) NOT NULL,
  `date_order` date NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `id_invoice` int(11) DEFAULT NULL,
  `id_salesman` int(11) DEFAULT NULL,
  `id_client` int(11) NOT NULL,
  `value_order` decimal(9,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Zrzut danych tabeli `order_car`
--

INSERT INTO `order_car` (`nr_order`, `date_order`, `content`, `id_invoice`, `id_salesman`, `id_client`, `value_order`) VALUES
(141, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 329, 71, 15, '150000'),
(142, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 330, 71, 15, '150000'),
(143, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 332, 71, 15, '150000'),
(144, '2018-07-10', 'Volvo truck 10000 300 Samochód ciężarowy', 334, 71, 15, '200000'),
(145, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 336, 71, 15, '150000'),
(146, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 337, 71, 15, '150000'),
(147, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 338, 71, 15, '150000'),
(162, '2018-07-13', 'Volvo truck 10000 300 Samochód ciężarowy', 359, 71, 19, '200000'),
(163, '2018-07-15', '', 367, 71, 19, '0'),
(164, '2018-07-15', '', 369, 71, 19, '0'),
(165, '2018-07-15', '', 370, 71, 19, '0'),
(166, '2018-07-15', '', 372, 71, 19, '0'),
(167, '2018-07-15', '', 374, 71, 19, '0'),
(171, '2018-07-15', '', 376, 71, 19, '0'),
(175, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 389, 71, 19, '150000'),
(176, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 391, 71, 19, '150000'),
(177, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy, MAN TGA 11000 600 Samochód ciężarowy', 392, 71, 19, '555000'),
(178, '2018-07-16', 'Reanult Magnum 11900 530 Samochód ciężarowy', 393, 71, 19, '200000'),
(179, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 394, 71, 19, '150000'),
(180, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 396, 71, 19, '150000'),
(181, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 397, 71, 19, '150000');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `order_car_completed`
--

CREATE TABLE `order_car_completed` (
  `nr_order` int(11) NOT NULL,
  `date_order` date NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `id_invoice_paid` int(11) DEFAULT NULL,
  `id_salesman` int(11) DEFAULT NULL,
  `value_order` decimal(9,0) NOT NULL,
  `id_report_sale` int(11) DEFAULT NULL,
  `id_client` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Zrzut danych tabeli `order_car_completed`
--

INSERT INTO `order_car_completed` (`nr_order`, `date_order`, `content`, `id_invoice_paid`, `id_salesman`, `value_order`, `id_report_sale`, `id_client`) VALUES
(74, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy, Volvo truck 10000 300 Samochód ciężarowy', 41, 71, '350000', 232, 15),
(75, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 42, 71, '150000', 232, 15),
(76, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 43, 71, '150000', 232, 15),
(77, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 44, 71, '150000', 232, 15),
(78, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 45, 71, '150000', 232, 15),
(79, '2018-07-10', 'Reanult Magnum 11900 530 Samochód ciężarowy', 46, 71, '200000', 232, 15),
(80, '2018-07-10', 'Volvo truck 10000 300 Samochód ciężarowy', 47, 71, '200000', 232, 15),
(81, '2018-07-10', 'Volvo truck 10000 300 Samochód ciężarowy', 48, 71, '200000', 232, 15),
(82, '2018-07-10', 'Reanult Magnum 11900 530 Samochód ciężarowy', 49, 71, '200000', 232, 15),
(83, '2018-07-10', 'Volvo truck 10000 300 Samochód ciężarowy', 50, 71, '200000', 232, 15),
(85, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 52, 71, '150000', 232, 15),
(86, '2018-07-10', 'Reanult Magnum 11900 530 Samochód ciężarowy', 53, 71, '200000', 232, 15),
(87, '2018-07-10', 'Reanult Magnum 11900 530 Samochód ciężarowy', 54, 71, '200000', 232, 15),
(91, '2018-07-10', 'Volvo truck 10000 300 Samochód ciężarowy', 58, 71, '200000', 232, 15),
(92, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 59, 71, '150000', 232, 15),
(93, '2018-07-10', 'Reanult Magnum 11900 530 Samochód ciężarowy', 60, 71, '200000', 232, 15),
(94, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 61, 71, '150000', 232, 15),
(95, '2018-07-12', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 62, 55, '150000', 227, 17),
(96, '2018-07-10', '', 63, 55, '0', 227, 17),
(97, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 64, 71, '150000', 232, 19),
(98, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 65, 71, '150000', 232, 19),
(99, '2018-07-15', 'Reanult Magnum 11900 530 Samochód ciężarowy, MAN TGA 11000 600 Samochód ciężarowy', 66, 71, '605000', 232, 19),
(100, '2018-07-15', 'MAN TGA 11000 600 Samochód ciężarowy', 67, 71, '405000', 232, 19),
(101, '2018-07-10', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 68, 71, '150000', 232, 15),
(102, '2018-07-10', 'Volvo truck 10000 300 Samochód ciężarowy', 69, 71, '200000', 232, 15),
(103, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy, MAN TGA 11000 600 Samochód ciężarowy', 70, 71, '555000', 232, 19),
(104, '2018-07-16', 'Mercedes Sprinter 3000 259 Samochód dostawczy', 71, 71, '150000', 232, 19),
(105, '2018-07-17', 'Reanult Magnum 11900 530 Samochód ciężarowy, Mercedes Sprinter 3000 259 Samochód dostawczy, Mercedes Vito 3000 150 Samochód dostawczy', 72, 71, '470000', 232, 41);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `report_preference`
--

CREATE TABLE `report_preference` (
  `id_report_preference` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `comments` text,
  `date_report` date NOT NULL,
  `id_offer` int(11) DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_salesman` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `report_preference`
--

INSERT INTO `report_preference` (`id_report_preference`, `name`, `comments`, `date_report`, `id_offer`, `id_client`, `id_salesman`) VALUES
(22, 'Raport preferencji nr 2018-07-11/398', 'kolejny test', '2018-07-11', 1, 15, 71),
(26, 'Raport preferencji nr 2018-07-11/239', 'test6', '2018-07-11', 1, 17, 55),
(28, 'Raport preferencji nr 2018-07-12/579', '', '2018-07-12', NULL, NULL, NULL),
(29, 'Raport preferencji nr 2018-07-12/907', '', '2018-07-12', NULL, NULL, NULL),
(30, 'Raport preferencji nr 2018-07-12/640', 'test', '2018-07-12', 1, 19, 71),
(31, 'Raport preferencji nr 2018-07-12/100', '', '2018-07-12', NULL, NULL, NULL),
(32, 'Raport preferencji nr 2018-07-13/511', '', '2018-07-13', NULL, NULL, NULL),
(33, 'Raport preferencji nr 2018-07-13/351', '', '2018-07-13', NULL, NULL, NULL),
(35, 'Raport preferencji nr 2018-07-15/850', '', '2018-07-15', NULL, NULL, NULL),
(36, 'Raport preferencji nr 2018-07-15/254', '', '2018-07-15', NULL, NULL, NULL),
(38, 'Raport preferencji nr 2018-07-15/156', '', '2018-07-15', NULL, NULL, NULL),
(39, 'Raport preferencji nr 2018-07-15/34', '', '2018-07-15', NULL, NULL, NULL),
(40, 'Raport preferencji nr 2018-07-16/817', '', '2018-07-16', NULL, NULL, NULL),
(41, 'Raport preferencji nr 2018-07-16/560', '', '2018-07-16', NULL, NULL, NULL),
(42, 'Raport preferencji nr 2018-07-16/282', '', '2018-07-16', NULL, NULL, NULL),
(45, 'Raport preferencji nr 2018-07-16/668', '', '2018-07-16', NULL, NULL, NULL),
(46, 'Raport preferencji nr 2018-07-16/465', '', '2018-07-16', NULL, NULL, NULL),
(47, 'Raport preferencji nr 2018-07-16/268', '', '2018-07-16', 1, 19, 71),
(48, 'Raport preferencji nr 2018-07-16/20', '', '2018-07-16', NULL, NULL, NULL),
(49, 'Raport preferencji nr 2018-07-16/91', '', '2018-07-16', 8, 19, 71),
(50, 'Raport preferencji nr 2018-07-16/259', '', '2018-07-16', NULL, NULL, NULL),
(51, 'Raport preferencji nr 2018-07-17/209', 'bardzo', '2018-07-17', 1, 41, 71),
(52, 'Raport preferencji nr 2018-07-17/493', '', '2018-07-17', 8, 41, 71),
(53, 'Raport preferencji nr 2018-07-17/307', 'Test', '2018-07-17', 1, 41, 71);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `report_sale`
--

CREATE TABLE `report_sale` (
  `id_report_sale` int(11) NOT NULL,
  `name` text NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `date` date NOT NULL,
  `id_salesman` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `report_sale`
--

INSERT INTO `report_sale` (`id_report_sale`, `name`, `start_date`, `end_date`, `date`, `id_salesman`) VALUES
(175, 'Raport sprzedaży nr 2018-07-09/954', '2018-07-08', '2018-07-15', '2018-07-09', 0),
(176, 'Raport sprzedaży nr 2018-07-10/720', '2018-07-08', '2018-07-15', '2018-07-10', 0),
(177, 'Raport sprzedaży nr 2018-07-10/109', '2018-07-08', '2018-07-15', '2018-07-10', 0),
(178, 'Raport sprzedaży nr 2018-07-10/394', '2018-07-08', '2018-07-15', '2018-07-10', 71),
(179, 'Raport sprzedaży nr 2018-07-10/829', '2018-07-08', '2018-07-15', '2018-07-10', 71),
(180, 'Raport sprzedaży nr 2018-07-10/932', '2018-07-08', '2018-07-15', '2018-07-10', 71),
(181, 'Raport sprzedaży nr 2018-07-10/961', '2018-07-08', '2018-07-15', '2018-07-10', 71),
(182, 'Raport sprzedaży nr 2018-07-11/676', '2018-07-08', '2018-07-15', '2018-07-11', 0),
(183, 'Raport sprzedaży nr 2018-07-12/943', '2018-07-08', '2018-07-15', '2018-07-12', 0),
(184, 'Raport sprzedaży nr 2018-07-15/345', '2018-07-08', '2018-07-15', '2018-07-15', 0),
(185, 'Raport sprzedaży nr 2018-07-15/127', '2018-07-08', '2018-07-15', '2018-07-15', 0),
(186, 'Raport sprzedaży nr 2018-07-15/800', '2018-07-08', '2018-07-15', '2018-07-15', 71),
(187, 'Raport sprzedaży nr 2018-07-15/385', '2018-07-08', '2018-07-15', '2018-07-15', 0),
(188, 'Raport sprzedaży nr 2018-07-15/330', '2018-07-08', '2018-07-15', '2018-07-15', 0),
(189, 'Raport sprzedaży nr 2018-07-16/593', '2018-07-16', '2018-07-23', '2018-07-16', 0),
(190, 'Raport sprzedaży nr 2018-07-16/1', '2018-07-16', '2018-07-23', '2018-07-16', 0),
(191, 'Raport sprzedaży nr 2018-07-16/664', '2018-07-16', '2018-07-23', '2018-07-16', 71),
(192, 'Raport sprzedaży nr 2018-07-16/251', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(193, 'Raport sprzedaży nr 2018-07-16/557', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(194, 'Raport sprzedaży nr 2018-07-16/347', '2018-07-09', '2018-07-16', '2018-07-16', 71),
(195, 'Raport sprzedaży nr 2018-07-16/558', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(196, 'Raport sprzedaży nr 2018-07-16/941', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(197, 'Raport sprzedaży nr 2018-07-16/542', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(198, 'Raport sprzedaży nr 2018-07-16/570', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(199, 'Raport sprzedaży nr 2018-07-16/43', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(200, 'Raport sprzedaży nr 2018-07-16/367', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(201, 'Raport sprzedaży nr 2018-07-16/344', '2018-07-09', '2018-07-16', '2018-07-16', 55),
(202, 'Raport sprzedaży nr 2018-07-16/872', '2018-07-09', '2018-07-16', '2018-07-16', 55),
(203, 'Raport sprzedaży nr 2018-07-16/786', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(204, 'Raport sprzedaży nr 2018-07-16/536', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(205, 'Raport sprzedaży nr 2018-07-16/778', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(206, 'Raport sprzedaży nr 2018-07-16/11', '2018-07-09', '2018-07-16', '2018-07-16', 71),
(207, 'Raport sprzedaży nr 2018-07-16/274', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(208, 'Raport sprzedaży nr 2018-07-16/565', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(209, 'Raport sprzedaży nr 2018-07-16/960', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(210, 'Raport sprzedaży nr 2018-07-16/710', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(211, 'Raport sprzedaży nr 2018-07-16/489', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(212, 'Raport sprzedaży nr 2018-07-16/385', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(213, 'Raport sprzedaży nr 2018-07-16/81', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(214, 'Raport sprzedaży nr 2018-07-16/680', '2018-07-09', '2018-07-16', '2018-07-16', 55),
(215, 'Raport sprzedaży nr 2018-07-16/839', '2018-07-09', '2018-07-16', '2018-07-16', 55),
(216, 'Raport sprzedaży nr 2018-07-16/665', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(217, 'Raport sprzedaży nr 2018-07-16/651', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(218, 'Raport sprzedaży nr 2018-07-16/734', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(219, 'Raport sprzedaży nr 2018-07-16/871', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(220, 'Raport sprzedaży nr 2018-07-16/826', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(221, 'Raport sprzedaży nr 2018-07-16/782', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(222, 'Raport sprzedaży nr 2018-07-16/826', '2018-07-09', '2018-07-16', '2018-07-16', 55),
(223, 'Raport sprzedaży nr 2018-07-16/161', '2018-07-09', '2018-07-16', '2018-07-16', 55),
(224, 'Raport sprzedaży nr 2018-07-16/343', '2018-07-09', '2018-07-16', '2018-07-16', 0),
(225, 'Raport sprzedaży nr 2018-07-16/209', '2018-07-09', '2018-07-16', '2018-07-16', 55),
(226, 'Raport sprzedaży nr 2018-07-17/340', '2018-07-10', '2018-07-17', '2018-07-17', 0),
(227, 'Raport sprzedaży nr 2018-07-17/560', '2018-07-10', '2018-07-17', '2018-07-17', 0),
(228, 'Raport sprzedaży nr 2018-07-17/5', '2018-07-10', '2018-07-17', '2018-07-17', 0),
(229, 'Raport sprzedaży nr 2018-07-17/978', '2018-07-10', '2018-07-17', '2018-07-17', 0),
(230, 'Raport sprzedaży nr 2018-07-17/783', '2018-07-10', '2018-07-17', '2018-07-17', 0),
(231, 'Raport sprzedaży nr 2018-07-17/774', '2018-07-10', '2018-07-17', '2018-07-17', 71),
(232, 'Raport sprzedaży nr 2018-07-17/407', '2018-07-10', '2018-07-17', '2018-07-17', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `salesman`
--

CREATE TABLE `salesman` (
  `id_salesman` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `salesman`
--

INSERT INTO `salesman` (`id_salesman`, `name`, `surname`, `address`, `city`, `email`) VALUES
(55, 'Michał', 'Kaczmarek', 'adres testowy', 'Poznań', 'michal@gmail.com'),
(71, 'Adam', 'Nowak', 'test przykladowy', 'Warszawa', 'adam@gmail.com'),
(117, 'Jan', 'Kowalski', 'ul Testowa 24. 64-100 Poznań', 'Poznań', 'michalrugby11@poczta.onet.pl');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `salesman_register`
--

CREATE TABLE `salesman_register` (
  `username` varchar(50) NOT NULL,
  `pass` text NOT NULL,
  `id_salesman` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `salesman_register`
--

INSERT INTO `salesman_register` (`username`, `pass`, `id_salesman`) VALUES
('adam', 'd75fcbd5b2a7cd5c83c66cc8a6772e7d', 71),
('jan22', 'ce8b99989e80b75e84bbe0c44d8284ae', 117),
('michal', '2e63d5d92f8b5f7f2912f8a51645c74e', 55);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id_car`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD KEY `client_salesman_fk` (`id_salesman`);

--
-- Indexes for table `client_register`
--
ALTER TABLE `client_register`
  ADD PRIMARY KEY (`username`),
  ADD KEY `id_client` (`id_client`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`nr_complaint`),
  ADD KEY `complaint_client_fk` (`id_client`),
  ADD KEY `nr_order` (`nr_order`);

--
-- Indexes for table `content_offer`
--
ALTER TABLE `content_offer`
  ADD PRIMARY KEY (`id_content_offer`),
  ADD UNIQUE KEY `id_car_2` (`id_car`,`id_offer`),
  ADD KEY `id_car` (`id_car`),
  ADD KEY `id_offer` (`id_offer`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id_invoice`);

--
-- Indexes for table `invoice_paid`
--
ALTER TABLE `invoice_paid`
  ADD PRIMARY KEY (`id_invoice_paid`),
  ADD KEY `id_salesman` (`id_salesman`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`id_meeting`),
  ADD KEY `meeting_salesman_fk` (`id_salesman`),
  ADD KEY `id_client` (`id_client`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `message_client_fk` (`id_client`),
  ADD KEY `id_salesman` (`id_salesman`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id_offer`);

--
-- Indexes for table `order_car`
--
ALTER TABLE `order_car`
  ADD PRIMARY KEY (`nr_order`),
  ADD KEY `id_invoice` (`id_invoice`),
  ADD KEY `id_salesman` (`id_salesman`),
  ADD KEY `id_client` (`id_client`);

--
-- Indexes for table `order_car_completed`
--
ALTER TABLE `order_car_completed`
  ADD PRIMARY KEY (`nr_order`),
  ADD KEY `id_invoice` (`id_invoice_paid`),
  ADD KEY `id_salesman` (`id_salesman`),
  ADD KEY `id_report_sale` (`id_report_sale`),
  ADD KEY `id_client` (`id_client`);

--
-- Indexes for table `report_preference`
--
ALTER TABLE `report_preference`
  ADD PRIMARY KEY (`id_report_preference`),
  ADD KEY `report_preference_salesman_fk` (`id_salesman`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_offer` (`id_offer`);

--
-- Indexes for table `report_sale`
--
ALTER TABLE `report_sale`
  ADD PRIMARY KEY (`id_report_sale`);

--
-- Indexes for table `salesman`
--
ALTER TABLE `salesman`
  ADD PRIMARY KEY (`id_salesman`);

--
-- Indexes for table `salesman_register`
--
ALTER TABLE `salesman_register`
  ADD PRIMARY KEY (`username`),
  ADD KEY `salesman_id` (`id_salesman`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `car`
--
ALTER TABLE `car`
  MODIFY `id_car` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT dla tabeli `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT dla tabeli `complaint`
--
ALTER TABLE `complaint`
  MODIFY `nr_complaint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT dla tabeli `content_offer`
--
ALTER TABLE `content_offer`
  MODIFY `id_content_offer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT dla tabeli `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id_invoice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=403;
--
-- AUTO_INCREMENT dla tabeli `invoice_paid`
--
ALTER TABLE `invoice_paid`
  MODIFY `id_invoice_paid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
--
-- AUTO_INCREMENT dla tabeli `meeting`
--
ALTER TABLE `meeting`
  MODIFY `id_meeting` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT dla tabeli `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT dla tabeli `offer`
--
ALTER TABLE `offer`
  MODIFY `id_offer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT dla tabeli `order_car`
--
ALTER TABLE `order_car`
  MODIFY `nr_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;
--
-- AUTO_INCREMENT dla tabeli `order_car_completed`
--
ALTER TABLE `order_car_completed`
  MODIFY `nr_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
--
-- AUTO_INCREMENT dla tabeli `report_preference`
--
ALTER TABLE `report_preference`
  MODIFY `id_report_preference` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT dla tabeli `report_sale`
--
ALTER TABLE `report_sale`
  MODIFY `id_report_sale` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;
--
-- AUTO_INCREMENT dla tabeli `salesman`
--
ALTER TABLE `salesman`
  MODIFY `id_salesman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`);

--
-- Ograniczenia dla tabeli `client_register`
--
ALTER TABLE `client_register`
  ADD CONSTRAINT `client_register_client_fk` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `complaint_client_fk` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`),
  ADD CONSTRAINT `complaint_order_car_completed_fk` FOREIGN KEY (`nr_order`) REFERENCES `order_car_completed` (`nr_order`);

--
-- Ograniczenia dla tabeli `content_offer`
--
ALTER TABLE `content_offer`
  ADD CONSTRAINT `content_offer_car_fk` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`),
  ADD CONSTRAINT `content_offer_offer_fk` FOREIGN KEY (`id_offer`) REFERENCES `offer` (`id_offer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `invoice_paid`
--
ALTER TABLE `invoice_paid`
  ADD CONSTRAINT `invoice_paid_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`);

--
-- Ograniczenia dla tabeli `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `meeting_client_fk` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `meeting_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`);

--
-- Ograniczenia dla tabeli `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_client_fk` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`),
  ADD CONSTRAINT `message_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`);

--
-- Ograniczenia dla tabeli `order_car`
--
ALTER TABLE `order_car`
  ADD CONSTRAINT `order_car_invoice` FOREIGN KEY (`id_invoice`) REFERENCES `invoice` (`id_invoice`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_car_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `order_car_completed`
--
ALTER TABLE `order_car_completed`
  ADD CONSTRAINT `order_car_completed_client_fk` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_car_completed_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`);

--
-- Ograniczenia dla tabeli `report_preference`
--
ALTER TABLE `report_preference`
  ADD CONSTRAINT `report_preference_client_fk` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_preference_offer_fk` FOREIGN KEY (`id_offer`) REFERENCES `offer` (`id_offer`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_preference_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`);

--
-- Ograniczenia dla tabeli `salesman_register`
--
ALTER TABLE `salesman_register`
  ADD CONSTRAINT `salesman_register_salesman_fk` FOREIGN KEY (`id_salesman`) REFERENCES `salesman` (`id_salesman`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
