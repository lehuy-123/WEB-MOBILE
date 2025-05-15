const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const brandRoutes = require('./routes/brandRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');


// Load biến môi trường
dotenv.config();

// Kết nối MongoDB
connectDB();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware cơ bản
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/brands', brandRoutes);


// ✅ Import route cần dùng trong giai đoạn hiện tại
const bannerRoutes = require('./routes/bannerRoutes'); // Giai đoạn BE.01

// ✅ Đăng ký route
app.use('/api/banners', bannerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment-methods', paymentRoutes);
app.use('/api/user', userRoutes);

// Route test mặc định
app.get('/', (req, res) => {
  res.send('✅ MiniTech API đang hoạt động...');
});

// Middleware xử lý lỗi
app.use(notFound);
app.use(errorHandler);

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy ở cổng ${PORT}`);
});
