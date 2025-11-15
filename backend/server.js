require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');  // ← أضيفي دي
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// استيراد الـ Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// الاتصال بقاعدة البيانات
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5000',  // ← غيري من 3000 لـ 5000
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// خدمة الـ Frontend Static Files ← أضيفي الكود ده هنا
app.use(express.static(path.join(__dirname, '../frontend')));

// Route للصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Route لصفحات تانية
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

// Middleware للأخطاء
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});