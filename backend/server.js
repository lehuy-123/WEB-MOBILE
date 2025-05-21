const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); // Cấu hình passport Google

// Import routes
const googleAuthRoutes = require('./routes/auth'); // Route Google OAuth
const productRoutes = require('./routes/productRoutes');
const brandRoutes = require('./routes/brandRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Load biến môi trường
dotenv.config();
connectDB();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware cơ bản
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Bổ sung middleware cho session & passport
app.use(session({
  secret: 'supersecret', // hoặc process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Đăng ký routes Google OAuth (KHÔNG prefix /api)
app.use('/auth', googleAuthRoutes);

// Đăng ký các route API như cũ
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment-methods', paymentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Route test mặc định
app.get('/', (req, res) => {
  res.send('✅ MiniTech API đang hoạt động...');
});

// Middleware xử lý lỗi
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy ở cổng ${PORT}`);
});
