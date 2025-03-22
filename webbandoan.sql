-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2025 at 07:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webbandoan`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `ward` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `idUser`, `name`, `phone`, `address`, `province`, `district`, `ward`, `location`, `isDefault`) VALUES
(4, 1, 'Nguyễn Phát', '1234567890', '26/10', 'Thành phố Cần Thơ', 'Quận Bình Thuỷ', 'Phường Bình Thủy', '[10.078621649474586, 105.74668542652915]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `idEditor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `image`, `link`, `idEditor`) VALUES
(1, '1742295708851.jpg', '#', 1),
(2, '1742295721624.png', '#', 1),
(3, '1742295729733.jpg', '#', 1);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isBuy` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `idUser`, `idProduct`, `quantity`, `created_at`, `isBuy`) VALUES
(19, 1, 1, 1, '2025-03-21 07:04:45', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Ít calo'),
(2, 'Cân bằng'),
(3, 'Giàu calo'),
(4, 'Đồ ăn vặt'),
(5, 'Đồ uống'),
(6, 'Món ăn kèm');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `itemaddmore`
--

CREATE TABLE `itemaddmore` (
  `idProduct` int(11) NOT NULL,
  `idProductAdd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `itemaddmore`
--

INSERT INTO `itemaddmore` (`idProduct`, `idProductAdd`) VALUES
(1, 84),
(1, 90),
(1, 97),
(1, 101),
(1, 103);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `idOrder` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`id`, `idOrder`, `idProduct`, `quantity`, `price`, `created_at`) VALUES
(15, 10, 2, 1, 84000, '2025-03-20 19:32:08'),
(16, 10, 7, 1, 88000, '2025-03-20 19:32:08'),
(17, 10, 5, 1, 104000, '2025-03-20 19:32:08');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `note` text DEFAULT NULL,
  `total` int(11) NOT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `distance` int(11) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `idUser`, `name`, `phone`, `address`, `note`, `total`, `status`, `created_at`, `distance`, `location`) VALUES
(10, 1, 'Nguyễn Phát', '1234567890', '26/10 - Phường Bình Thủy - Quận Bình Thuỷ - Thành phố Cần Thơ', '        ', 313000, 5, '2025-03-20 19:32:08', 5261, '[10.078621649474586, 105.74668542652915]');

-- --------------------------------------------------------

--
-- Table structure for table `pricehistory`
--

CREATE TABLE `pricehistory` (
  `id` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `oldPrice` int(11) NOT NULL,
  `newPrice` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pricehistory`
--

INSERT INTO `pricehistory` (`id`, `idProduct`, `oldPrice`, `newPrice`, `created_at`) VALUES
(1, 1, 30000, 30000, '2025-03-18 10:57:19');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `currentPrice` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `sold` int(11) DEFAULT 0,
  `isExit` tinyint(1) DEFAULT 1,
  `isBussiness` tinyint(1) DEFAULT 1,
  `idCategory` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `currentPrice`, `description`, `image`, `sold`, `isExit`, `isBussiness`, `idCategory`, `created_at`) VALUES
(1, 'L12', 30000, 'Salad tự chọn: dưa chua, cà chua ta, khoai tây, cà rốt, xà lách tím cuộn, xà lách xanh cuộn, bắp cải trắng, bắp cải tím, dưa chuột, ngô ngọt, củ đậu, ớt vàng Đà Lạt, ớt xanh Đà Lạt, cải ngó xuân, xà lách Frise, đậu Hà Lan, rau rocket, hành tây tím, dứa quả, đậu đũa, củ cải', 'L12 (liên hệ để được tư vấn cụ thể)1742292903.5529604.png', 1, 1, 1, 1, '2025-03-18 10:17:56'),
(2, 'L11', 84000, 'Mì soba Nhật, cá saba áp chảo, nấm mèo xào, cải bó xôi luộc', 'L111742292904.1814141.png', 5, 1, 1, 1, '2025-03-18 10:17:56'),
(3, 'L10', 109000, 'Cá hồi áp chảo, bí đỏ nướng, măng tây xào, nấm mèo xào, hạnh nhân', 'L101742292904.439046.png', 1, 1, 1, 1, '2025-03-18 10:17:56'),
(4, 'L9', 56000, 'Nui xoắn, nạc vai bò, rau củ xào, đậu Hà Lan xào', 'L91742292904.6827044.png', 1, 1, 1, 1, '2025-03-18 10:17:56'),
(5, 'L8', 104000, 'Cơm gạo tẻ, tôm sốt tiêu chanh, súp lơ trắng luộc, đậu Hà Lan xào', 'L81742292904.9153395.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(6, 'L7', 85000, 'Mỳ soba trà xanh, cá ngừ áp chảo, nấm hương tươi xào, súp lơ trắng luộc, đậu phụ sốt mật ong', 'L71742292905.1484206.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(7, 'L6', 88000, 'Mỳ soba trà xanh, sườn heo nướng, rau củ xào, măng tây xào', 'L61742292905.37961.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(8, 'L5', 53000, 'Cơm gạo tẻ, tôm hấp sả, củ dền luộc, cải bó xôi luộc', 'L51742292905.6098151.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(9, 'L4', 90000, 'Mỳ soba trà xanh, tôm hấp sả, súp lơ trắng luộc, hạt điều', 'L41742292905.8845797.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(10, 'L3', 62000, 'Khoai tây nướng, nạc vai bò xào, cà chua bi, đậu nành Nhật luộc, củ sen muối/dưa chuột trộn', 'L31742292906.1230383.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(11, 'L2', 71000, 'Bí đỏ nướng, trứng gà luộc, tôm hấp sả, bắp Mỹ luộc, cần tây xào', 'L21742292906.3729086.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(12, 'L1', 105000, 'Cơm gạo tẻ, cá hồi áp chảo, đậu phụ sốt mật ong, súp lơ xanh luộc', 'L11742292906.9549332.png', 0, 1, 1, 1, '2025-03-18 10:17:56'),
(13, 'B11', 175000, 'Khoai lang nướng, cá hồi nướng, bí đỏ nướng, măng tây xào, hạt điều', 'B111742293246.4686337.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(14, 'B10', 114000, 'Bí đỏ nướng, cá ngừ áp chảo, tôm hấp sả, đậu gà rang, cần tây xào', 'B101742293246.8651066.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(15, 'B9', 118000, 'Mỳ soba Nhật, bí đỏ nướng, thịt bê xào sả ớt, ức gà áp chảo, súp lơ xanh luộc, cà chua bi, hạt điều', 'B91742293247.2692018.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(16, 'B8', 145000, 'Khoai tây nướng, sườn heo nướng, cá hồi áp chảo, xà lách hạt điều vỡ, hạt điều, cà rốt dưa chuột muối', 'B81742293247.674325.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(17, 'B7', 50000, 'Cơm gạo lứt, ức gà áp chảo, cà chua bi, măng tây xào', 'B71742293248.049319.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(18, 'B6', 95000, 'Súp lơ xanh, nạc vai bò áp chảo, bắp Mỹ luộc, hạnh nhân, trứng gà ốp la', 'B61742293248.448141.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(19, 'B5', 105000, 'Cơm gạo tẻ, tôm sốt tiêu chanh, trứng gà luộc, bắp cải xào, cà chua bi', 'B51742293248.8610165.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(20, 'B4', 112000, 'Mỳ soba Nhật, ức gà áp chảo, cá saba áp chảo, măng tây xào, bắp Mỹ luộc', 'B41742293249.2494466.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(21, 'B3', 75000, 'Nui xoắn, nạc vai bò xào, nấm hương tươi xào, cải bó xôi luộc', 'B31742293249.655248.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(22, 'B2', 122000, 'Mỳ soba trà xanh, nạc vai bò xào, cá ngừ áp chảo, củ dền luộc, bắp non xào, súp lơ xanh luộc, hạt hỗn hợp', 'B21742293250.0563793.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(23, 'B1', 84000, 'Khoai tây nướng, thịt bê xào sả ớt, tôm hấp sả, cải bó xôi luộc, đậu gà rang', 'B11742293250.4360566.png', 0, 1, 1, 2, '2025-03-18 10:22:04'),
(24, 'H8', 156000, 'Cơm gạo lứt, nạc vai bò áp chảo, nấm hương tươi xào, cá hồi áp chảo, rau củ xào, hạt điều', 'H81742293379.5177162.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(25, 'H7', 125000, 'Khoai lang nướng, nạc vai bò xào, cá saba áp chảo, cần tây xào, xà lách hạt điều vỡ, bắp Mỹ luộc', 'H71742293379.9262657.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(26, 'H6', 125000, 'Mỳ soba Nhật, cá saba áp chảo, cà ngừ áp chảo, cà chua dưa chuột trộn, súp lơ xanh luộc, bắp Mỹ luộc', 'H61742293380.3138378.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(27, 'H5', 99000, 'Cơm gạo lứt, sườn heo nướng, cá hồi áp chảo, bắp Mỹ luộc, cải bó xôi luộc', 'H51742293380.7204936.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(28, 'H4', 84000, 'Nui xoắn, tôm hấp sả, xà lách hạt điều vỡ, bắp Mỹ luộc, trứng gà luộc', 'H41742293381.1183205.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(29, 'H3', 130000, 'Khoai tây nướng, củ dền luộc, ức gà áp chảo, tôm sốt tiêu chanh, nấm mèo xào, quả bơ', 'H31742293381.5389185.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(30, 'H2', 103000, 'Mỳ soba trà xanh, thịt bê xào sả ớt, ức gà áp chảo, quả bơ, đậu gà rang', 'H21742293381.9447615.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(31, 'H1', 128000, 'Nui xoắn, nạc vai bò xào, tôm hấp sả, nấm mèo xào, bắp non xào, súp lơ xanh luộc', 'H11742293382.3528407.png', 0, 1, 1, 3, '2025-03-18 10:25:48'),
(32, 'Granola (Hạt ngũ cốc mix)', 168000, 'Granola: hạnh nhân, hạt bí, hạt điều, macca, hạt óc chó, nho', 'Granola (Hạt ngũ cốc mix)1742293437.7427692.png', 0, 1, 1, 4, '2025-03-18 10:25:48'),
(33, 'Bánh thuyền siêu hạt', 90000, 'Hạt điều, hạt bí, hạt hạnh nhân, hạt mè, mật ong, muối, đế thuyền', 'Bánh thuyền siêu hạt1742293439.1019473.png', 0, 1, 1, 4, '2025-03-18 10:25:48'),
(34, 'Thanh gạo lứt chà bông', 48000, 'Hạt gạo lứt, hạt điều, hạt bí, hạt hạnh nhân, chà bông, mật ong', 'Thanh gạo lứt chà bông1742293440.4292688.png', 0, 1, 1, 4, '2025-03-18 10:25:48'),
(35, 'Thanh gạo lứt mix hạt', 48000, 'Hạt gạo lứt, hạt điều, hạt bí, hạt hạnh nhân, mật ong', 'Thanh gạo lứt mix hạt1742293441.9494643.png', 0, 1, 1, 4, '2025-03-18 10:25:48'),
(36, 'Thanh gạo lứt rong biển', 50000, 'Hạt gạo lứt, hạt điều, hạt bí, hạt hạnh nhân, rong biển, mật ong', 'Thanh gạo lứt rong biển1742293443.2571087.png', 0, 1, 1, 4, '2025-03-18 10:25:48'),
(37, 'Thanh gạo lứt siêu hạt', 52000, 'Hạt gạo lứt, hạt điều, hạt hạnh nhân, mật ong, mạch nha', 'Thanh gạo lứt siêu hạt1742293444.6561651.png', 0, 1, 1, 4, '2025-03-18 10:25:48'),
(38, 'Mira pH9+', 15000, 'Nước ion kiềm', 'Mira pH9+1742293500.3246882.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(39, 'Antiox hương đào', 30000, 'Vitamin E+C+Biotin+Selen', 'Antiox hương đào1742293500.5487628.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(40, 'Care hương vải', 30000, 'Vitamin D3+ Magie+Selen', 'Care hương vải1742293500.7778518.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(41, 'Relax hương chanh', 30000, 'Vitamin C+ZinC+Magie', 'Relax hương chanh1742293500.978875.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(42, 'Energy hương dâu', 30000, 'Vitamin C+Axit Folic+Magie', 'Energy hương dâu1742293501.1897125.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(43, 'Healthy cải thiện đề kháng', 40000, 'Nước ép mix táo, ổi', 'Healthy cải thiện đề kháng1742293501.4210289.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(44, 'Healthy khỏe da đẹp dáng', 40000, 'Nước ép mix cà rốt, cam tươi', 'Healthy khỏe da đẹp dáng1742293501.644342.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(45, 'Healthy giảm cân thải độc', 40000, 'Nước ép mix táo, cà rốt, củ dền', 'Healthy giảm cân thải độc1742293501.904508.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(46, 'Healthy ngăn ngừa lão hóa', 40000, 'Nước ép mix táo, lê', 'Healthy ngăn ngừa lão hóa1742293502.1627944.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(47, 'Healthy thanh lọc', 35000, 'Nước ép mix táo, dưa chuột', 'Healthy thanh lọc1742293502.4003253.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(48, 'Healthy đào thải độc tố', 35000, 'Nước ép cần tây', 'Healthy đào thải độc tố1742293502.6682463.png', 0, 1, 1, 5, '2025-03-18 10:25:48'),
(54, 'Trứng gà ốp la', 7000, NULL, 'Trứng gà ốp la1742294458.4939735.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(55, 'Trứng gà luộc', 6000, NULL, 'Trứng gà luộc1742294458.6829665.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(56, 'Tôm sốt tiêu chanh', 81000, NULL, 'Tôm sốt tiêu chanh1742294458.8657448.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(57, 'Tôm hấp xả', 39000, NULL, 'Tôm hấp xả1742294459.0841608.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(59, 'Bê xào sả ớt (60g)', 40000, NULL, 'Bê xào sả ớt (60g)1742294459.433923.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(60, 'Bê xào sả ớt (30g)', 20000, NULL, 'Bê xào sả ớt (30g)1742294459.6501358.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(61, 'Sườn heo nướng (60g)', 34000, NULL, 'Sườn heo nướng (60g)1742294459.8653474.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(62, 'Sườn heo nướng (30g)', 18000, NULL, 'Sườn heo nướng (30g)1742294460.049716.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(63, 'Cá saba áp chảo', 54000, NULL, 'Cá saba áp chảo1742294460.2424252.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(64, 'Cá hồi Nauy áp chảo (50g)', 50000, NULL, 'Cá hồi Nauy áp chảo (50g)1742294460.4572916.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(65, 'Cá hồi Nauy nướng (100g)', 45000, NULL, 'Cá hồi Nauy nướng (100g)1742294460.6689324.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(66, 'Nạc vai bò xào (30g)', 26000, NULL, 'Nạc vai bò xào (30g)1742294460.8849807.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(67, 'Nạc vai bò áp chảo (60g)', 51000, NULL, 'Nạc vai bò áp chảo (60g)1742294461.1221457.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(68, 'Ức gà áp chảo (90g)', 18000, NULL, 'Ức gà áp chảo (90g)1742294461.3418016.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(69, 'Ức gà áp chảo (60g)', 12000, NULL, 'Ức gà áp chảo (60g)1742294461.5594199.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(70, 'Ức gà áp chảo (30g)', 6000, NULL, 'Ức gà áp chảo (30g)1742294461.7756054.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(71, 'Cơm trắng', 3000, NULL, 'Cơm trắng1742294684.1719542.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(72, 'Cơm gạo lứt', 7000, NULL, 'Cơm gạo lứt1742294684.4129233.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(73, 'Mỳ soba trà xanh (150g)', 29000, NULL, 'Mỳ soba trà xanh (150g)1742294684.6402194.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(74, 'Mỳ soba trà xanh (100g)', 19000, NULL, 'Mỳ soba trà xanh (100g)1742294685.0285983.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(75, 'Mỳ soba Nhật (150g)', 25000, NULL, 'Mỳ soba Nhật (150g)1742294685.2513025.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(76, 'Mỳ soba Nhật (100g)', 17000, NULL, 'Mỳ soba Nhật (100g)1742294685.478177.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(77, 'Nui xoắn xào bơ (150g)', 23000, NULL, 'Nui xoắn xào bơ (150g)1742294685.714738.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(78, 'Nui xoắn xào bơ (100g)', 15000, NULL, 'Nui xoắn xào bơ (100g)1742294685.9469218.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(79, 'Bí đỏ nướng (200g)', 13000, NULL, 'Bí đỏ nướng (200g)1742294686.1799376.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(80, 'Bí đỏ nướng (150g)', 10000, NULL, 'Bí đỏ nướng (150g)1742294686.369424.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(81, 'Bí đỏ nướng (100g)', 6000, NULL, 'Bí đỏ nướng (100g)1742294686.5734253.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(82, 'Khoai lang nướng (150g)', 12000, NULL, 'Khoai lang nướng (150g)1742294687.1403031.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(83, 'Khoai lang nướng (100g)', 8000, NULL, 'Khoai lang nướng (100g)1742294687.3509266.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(84, 'Khoai tây nướng (150g)', 7000, NULL, 'Khoai tây nướng (150g)1742294687.5494523.png', 0, 0, 0, 6, '2025-03-18 10:48:12'),
(85, 'Khoai tây nướng (100g)', 5000, NULL, 'Khoai tây nướng (100g)1742294687.7510066.png', 0, 0, 0, 6, '2025-03-18 10:48:12'),
(87, 'Đậu phụ sốt mật ong', 17000, NULL, 'Đậu phụ sốt mật ong1742294776.8610992.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(88, 'Quả bơ (80g)', 12000, NULL, 'Quả bơ (80g)1742294777.1330101.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(89, 'Quả bơ (40g)', 6000, NULL, 'Quả bơ (40g)1742294777.362255.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(90, 'Xà lách hạt điều vỡ', 17000, NULL, 'Xà lách hạt điều vỡ1742294777.5980747.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(91, 'Súp lơ xanh luộc', 18000, NULL, 'Súp lơ xanh luộc1742294777.8328986.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(92, 'Súp lơ trắng luộc', 10000, NULL, 'Súp lơ trắng luộc1742294778.0767782.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(93, 'Cải bó xôi luộc (120g)', 11000, NULL, 'Cải bó xôi luộc (120g)1742294778.2925138.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(94, 'Cải bó xôi luộc (60g)', 6000, NULL, 'Cải bó xôi luộc (60g)1742294778.5170424.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(95, 'Măng tây xào tỏi', 20000, NULL, 'Măng tây xào tỏi1742294778.7586565.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(96, 'Cần tây xào', 9000, NULL, 'Cần tây xào1742294778.9846363.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(97, 'Bắp cải xào', 4000, NULL, 'Bắp cải xào1742294779.200808.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(98, 'Su su, cà rốt xào', 5000, NULL, 'Su su, cà rốt xào1742294779.441133.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(99, 'Nấm hương tươi xào', 15000, NULL, 'Nấm hương tươi xào1742294779.6880627.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(100, 'Nấm mèo xào', 7000, NULL, 'Nấm mèo xào1742294779.9240675.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(101, 'Dưa chuột, cà rốt trộn (60g)', 7000, NULL, 'Dưa chuột, cà rốt trộn (60g)1742294780.150077.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(102, 'Dưa chuột, cà chua trộn (30g)', 4000, NULL, 'Dưa chuột, cà chua trộn (30g)1742294780.3752546.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(103, 'Cà chua bi (100g)', 11000, NULL, 'Cà chua bi (100g)1742294780.5971618.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(104, 'Cà chua bi (50g)', 6000, NULL, 'Cà chua bi (50g)1742294780.8407276.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(105, 'Củ dền luộc', 5000, NULL, 'Củ dền luộc1742294781.046009.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(106, 'Bắp Mỹ luộc (100g)', 7000, NULL, 'Bắp Mỹ luộc (100g)1742294781.2381136.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(107, 'Bắp Mỹ luộc (50g)', 4000, NULL, 'Bắp Mỹ luộc (50g)1742294781.529227.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(108, 'Bắp non xào', 15000, NULL, 'Bắp non xào1742294781.7726445.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(109, 'Đậu Hà Lan xào', 10000, NULL, 'Đậu Hà Lan xào1742294781.9824367.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(110, 'Đậu nành Nhật luộc', 16000, NULL, 'Đậu nành Nhật luộc1742294782.1987398.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(111, 'Đậu gà rang (80g)', 22000, NULL, 'Đậu gà rang (80g)1742294782.4241595.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(112, 'Đậu gà rang (40g)', 12000, NULL, 'Đậu gà rang (40g)1742294782.6415927.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(113, 'Hạt hỗn hợp', 16000, NULL, 'Hạt hỗn hợp1742294782.861907.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(114, 'Hạt điều', 12000, NULL, 'Hạt điều1742294783.0720482.png', 0, 1, 1, 6, '2025-03-18 10:48:12'),
(115, 'Hạt hạnh nhân', 12000, NULL, 'Hạt hạnh nhân1742294783.2868972.png', 0, 1, 1, 6, '2025-03-18 10:48:12');

-- --------------------------------------------------------

--
-- Table structure for table `shopinfo`
--

CREATE TABLE `shopinfo` (
  `name` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `taxCode` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `activeTime` varchar(255) NOT NULL,
  `idEditor` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `ward` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shopinfo`
--

INSERT INTO `shopinfo` (`name`, `phone`, `taxCode`, `email`, `address`, `activeTime`, `idEditor`, `location`, `province`, `district`, `ward`) VALUES
('ShopBear', '0382909902', '24244432242-24324', 'lienhe@shopbear.com', 'heẻm 311', '8:00 - 22:00', 1, '[10.046690426873429, 105.76783776283266]', 'Thành phố Cần Thơ', 'Quận Ninh Kiều', 'Phường An Hòa'),
('ShopBear', '0382909902', '24244432242-24324', 'lienhe@shopbear.com', 'heẻm 311', '8:00 - 22:00', 1, '[10.046690426873429, 105.76783776283266]', 'Thành phố Cần Thơ', 'Quận Ninh Kiều', 'Phường An Hòa');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) DEFAULT 1,
  `role` int(11) DEFAULT 1,
  `date` date NOT NULL,
  `sex` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `created_at`, `status`, `role`, `date`, `sex`) VALUES
(1, 'Nguyễn Phát', 'admin@gmail.com', '1234567890', '$2b$10$/Wjvi313fKgpAEVk572ar.rxnwccm.Vcd7doT6S8LDRxvS66odn8m', '2025-03-18 09:08:45', 1, 0, '2003-12-06', 'nam');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addresses_users` (`idUser`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_carts_users` (`idUser`),
  ADD KEY `fk_carts_products` (`idProduct`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemaddmore`
--
ALTER TABLE `itemaddmore`
  ADD KEY `fk_itemAddMore_product` (`idProduct`),
  ADD KEY `fk_itemAddMore_productAdd` (`idProductAdd`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderDetail_orders` (`idOrder`),
  ADD KEY `fk_orderDetail_products` (`idProduct`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users` (`idUser`);

--
-- Indexes for table `pricehistory`
--
ALTER TABLE `pricehistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_priceHistory_products` (`idProduct`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_categories` (`idCategory`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pricehistory`
--
ALTER TABLE `pricehistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `fk_addresses_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_carts_products` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_carts_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Constraints for table `itemaddmore`
--
ALTER TABLE `itemaddmore`
  ADD CONSTRAINT `fk_itemAddMore_product` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_itemAddMore_productAdd` FOREIGN KEY (`idProductAdd`) REFERENCES `products` (`id`);

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `fk_orderDetail_orders` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `fk_orderDetail_products` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Constraints for table `pricehistory`
--
ALTER TABLE `pricehistory`
  ADD CONSTRAINT `fk_priceHistory_products` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`idCategory`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
