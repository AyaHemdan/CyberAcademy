window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5,5,5);
    scene.add(directionalLight);

    // Data Packets (مكعبات)
    const packetGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const packetMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x002200 });
    const packet1 = new THREE.Mesh(packetGeometry, packetMaterial);
    packet1.position.set(-3, 1, -5);
    scene.add(packet1);
    const packet2 = new THREE.Mesh(packetGeometry, packetMaterial);
    packet2.position.set(3, -1, -5);
    scene.add(packet2);

    // Keychain
    const keychainGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
    const keychainMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0x222200 });
    const keychain = new THREE.Mesh(keychainGeometry, keychainMaterial);
    keychain.position.set(0, 0, -5);
    scene.add(keychain);

    // Beacon
    const beaconGeometry = new THREE.ConeGeometry(0.5, 1, 8);
    const beaconMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x220000 });
    const beacon = new THREE.Mesh(beaconGeometry, beaconMaterial);
    beacon.position.set(0, -2, -5);
    scene.add(beacon);

    // Particle Background
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 1 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.001;
        packet1.position.y += Math.sin(Date.now() * 0.001) * 0.01;
        packet2.position.y += Math.sin(Date.now() * 0.001 + Math.PI) * 0.01;
        keychain.rotation.z += 0.02;
        beacon.scale.y = 1 + Math.sin(Date.now() * 0.005) * 0.2;
        renderer.render(scene, camera);
    }
    animate();

    // Responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

// ====== Sign In / Sign Up Tabs ======
const signinTab = document.getElementById('signinTab');
const signupTab = document.getElementById('signupTab');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const gotoSignup = document.getElementById('gotoSignup');
const gotoSignin = document.getElementById('gotoSignin');

// Display correct tab based on firstTime
const firstTime = localStorage.getItem('firstTime');
if(!firstTime) {
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
    signupTab.classList.add('active');
} else {
    signinForm.style.display = 'block';
    signupForm.style.display = 'none';
    signinTab.classList.add('active');
}

// Tab Switching
signinTab?.addEventListener('click', () => {
    signinForm.style.display = 'block';
    signupForm.style.display = 'none';
    signinTab.classList.add('active');
    signupTab.classList.remove('active');
});

signupTab?.addEventListener('click', () => {
    signinForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupTab.classList.add('active');
    signinTab.classList.remove('active');
});

gotoSignup?.addEventListener('click', () => signupTab.click());
gotoSignin?.addEventListener('click', () => signinTab.click());

// ====== ✅ تعديلات الاتصال بال Backend (Relative URLs) ======

// ✅ تسجيل حساب جديد (Signup)
signupForm?.addEventListener('submit', async e => {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // ✅ دالة الاتصال بالـ API (Relative URL)
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // ✅ حفظ التوكين وبيانات المستخدم
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('firstTime', 'no');
            
            alert('✅ تم إنشاء الحساب بنجاح! جاري التوجه إلى لوحة التحكم...');
            window.location.href = 'dashboard.html';
        } else {
            alert('❌ ' + data.message);
        }
    } catch (error) {
        console.error('❌ Error connecting to server:', error);
        alert('❌ حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيل الـ Backend!');
    }
});

// ✅ تسجيل الدخول (Sign In)
signinForm?.addEventListener('submit', async e => {
    e.preventDefault();
    
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    
    // ✅ دالة الاتصال بالـ API (Relative URL)
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // ✅ حفظ التوكين وبيانات المستخدم
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('loggedIn', 'true');
            
            alert('✅ تم تسجيل الدخول بنجاح! جاري التوجه إلى لوحة التحكم...');
            window.location.href = 'dashboard.html';
        } else {
            alert('❌ ' + data.message);
        }
    } catch (error) {
        console.error('❌ Error connecting to server:', error);
        alert('❌ حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيل الـ Backend!');
    }
});