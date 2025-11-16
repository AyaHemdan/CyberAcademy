const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// مخزن مؤقت للمستخدمين (استبدلي بـ MongoDB Model لاحقاً)
const users = [];

// @desc    تسجيل مستخدم جديد
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        // التحقق إذا المستخدم موجود
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists' 
            });
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // إنشاء المستخدم
        const user = { 
            id: users.length + 1, 
            name: name || email.split('@')[0], 
            email, 
            password: hashedPassword 
        };
        
        users.push(user);

        // إنشاء Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully', 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email 
            } 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    تسجيل الدخول
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        // البحث عن المستخدم
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // إنشاء Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        res.json({ 
            success: true, 
            message: 'Login successful', 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email 
            } 
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    الحصول على بيانات المستخدم (لاحقاً)
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        // سيتم تنفيذه عند إضافة Middleware للتحقق من الـ Token
        res.json({ 
            success: true, 
            message: 'Get user data - under construction' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};