// Dữ liệu banner mẫu (tạm hard-code, sau này có thể lấy từ DB)
const banners = [
  {
    id: 1,
    image: 'https://example.com/banner1.jpg',
    title: 'Giảm giá đến 50%',
    link: '/products'
  },
  {
    id: 2,
    image: 'https://example.com/banner2.jpg',
    title: 'Mua 1 tặng 1 cuối tuần',
    link: '/products'
  },
  {
    id: 3,
    image: 'https://example.com/banner3.jpg',
    title: 'iPhone 15 Series chính hãng',
    link: '/product/iphone-15'
  }
];

exports.getBanners = (req, res) => {
  res.json(banners);
};
