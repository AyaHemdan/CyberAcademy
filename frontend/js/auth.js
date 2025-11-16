// // ملف: frontend/js/auth.js - التواصل مع Backend API

// const API_URL = 'http://localhost:5000';
// // ملف: auth.js - يُحمّل فقط في login.html

// // ====== Sign In / Sign Up Tabs ======
// const signinTab = document.getElementById('signinTab');
// const signupTab = document.getElementById('signupTab');
// const signinForm = document.getElementById('signinForm');
// const signupForm = document.getElementById('signupForm');
// const gotoSignup = document.getElementById('gotoSignup');
// const gotoSignin = document.getElementById('gotoSignin');

// // Display correct tab based on firstTime
// const firstTime = localStorage.getItem('firstTime');
// if (!firstTime) {
//     signupForm?.style.display = 'block';
//     signinForm?.style.display = 'none';
//     signupTab?.classList.add('active');
// } else {
//     signinForm?.style.display = 'block';
//     signupForm?.style.display = 'none';
//     signinTab?.classList.add('active');
// }

// // Tab Switching
// signinTab?.addEventListener('click', () => {
//     signinForm?.style.display = 'block';
//     signupForm?.style.display = 'none';
//     signinTab?.classList.add('active');
//     signupTab?.classList.remove('active');
// });

// signupTab?.addEventListener('click', () => {
//     signinForm?.style.display = 'none';
//     signupForm?.style.display = 'block';
//     signupTab?.classList.add('active');
//     signinTab?.classList.remove('active');
// });

// gotoSignup?.addEventListener('click', () => signupTab?.click());
// gotoSignin?.addEventListener('click', () => signinTab?.click());

// // ====== ✅ Backend API Integration ======

// // تحقق من وجود API_CONFIG
// if (typeof API_CONFIG === 'undefined') {
//     console.error('❌ API_CONFIG is not defined! تأكد من تحميل config.js قبل auth.js');
//     alert('❌ خطأ: ملف config.js غير محمل. تأكد من الترتيب الصحيح في HTML');
// }

// // ✅ تسجيل حساب جديد (Sign Up)
// signupForm?.addEventListener('submit', async e => {
//     e.preventDefault();
    
//     const username = document.getElementById('signupUsername')?.value.trim();
//     const email = document.getElementById('signupEmail')?.value.trim();
//     const password = document.getElementById('signupPassword')?.value.trim();
    
//     if (!username || !email || !password) {
//         alert('❌ يرجى ملء جميع الحقول');
//         return;
//     }
    
//     // التحقق من البريد الإلكتروني
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         alert('❌ البريد الإلكتروني غير صحيح');
//         return;
//     }
    
//     // التحقق من طول كلمة المرور
//     if (password.length < 6) {
//         alert('❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل');
//         return;
//     }
    
//     console.log('🚀 Sending signup request...', { username, email });
    
//     try {
//         const response = await fetch(API_CONFIG.BASE_URL + '/api/auth/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name: username, email, password })
//         });
        
//         const data = await response.json();
//         console.log('✅ Signup response:', data);
        
//         if (data.success) {
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('currentUser', JSON.stringify(data.user));
//             localStorage.setItem('loggedIn', 'true');
//             localStorage.setItem('firstTime', 'no');
            
//             alert('✅ تم إنشاء الحساب بنجاح! جاري التوجه إلى لوحة التحكم...');
//             window.location.href = 'dashboard.html';
//         } else {
//             alert('❌ ' + data.message);
//         }
//     } catch (error) {
//         console.error('❌ Signup error:', error);
//         alert('❌ حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيل الـ Backend على localhost:5000');
//     }
// });

// // ✅ تسجيل الدخول (Sign In)
// signinForm?.addEventListener('submit', async e => {
//     e.preventDefault();
    
//     const email = document.getElementById('signinEmail')?.value.trim();
//     const password = document.getElementById('signinPassword')?.value.trim();
    
//     if (!email || !password) {
//         alert('❌ يرجى ملء جميع الحقول');
//         return;
//     }
    
//     console.log('🚀 Sending login request...', { email });
    
//     try {
//         const response = await fetch(API_CONFIG.BASE_URL + '/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });
        
//         const data = await response.json();
//         console.log('✅ Login response:', data);
        
//         if (data.success) {
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('currentUser', JSON.stringify(data.user));
//             localStorage.setItem('loggedIn', 'true');
            
//             alert('✅ تم تسجيل الدخول بنجاح! جاري التوجه إلى لوحة التحكم...');
//             window.location.href = 'dashboard.html';
//         } else {
//             alert('❌ ' + data.message);
//         }
//     } catch (error) {
//         console.error('❌ Login error:', error);
//         alert('❌ حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيل الـ Backend على localhost:5000');
//     }
// });