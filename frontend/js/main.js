// ====== Canvas Background (Three.js) ======
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const packetGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const packetMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x002200 });
    const packet1 = new THREE.Mesh(packetGeometry, packetMaterial);
    packet1.position.set(-3, 1, -5);
    scene.add(packet1);
    const packet2 = new THREE.Mesh(packetGeometry, packetMaterial);
    packet2.position.set(3, -1, -5);
    scene.add(packet2);

    const keychainGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
    const keychainMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0x222200 });
    const keychain = new THREE.Mesh(keychainGeometry, keychainMaterial);
    keychain.position.set(0, 0, -5);
    scene.add(keychain);

    const beaconGeometry = new THREE.ConeGeometry(0.5, 1, 8);
    const beaconMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x220000 });
    const beacon = new THREE.Mesh(beaconGeometry, beaconMaterial);
    beacon.position.set(0, -2, -5);
    scene.add(beacon);

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

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

// ====== Tabs ======
const signinTab = document.getElementById('signinTab');
const signupTab = document.getElementById('signupTab');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');

function showSignIn() {
    if (signinForm) signinForm.style.display = 'block';
    if (signupForm) signupForm.style.display = 'none';
    if (signinTab) signinTab.classList.add('active');
    if (signupTab) signupTab.classList.remove('active');
}

function showSignUp() {
    if (signinForm) signinForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    if (signupTab) signupTab.classList.add('active');
    if (signinTab) signinTab.classList.remove('active');
}

const firstTime = localStorage.getItem('firstTime');
if (!firstTime) {
    localStorage.setItem('firstTime', 'yes');
    showSignUp();
} else {
    showSignIn();
}

signinTab?.addEventListener('click', showSignIn);
signupTab?.addEventListener('click', showSignUp);
document.getElementById('gotoSignup')?.addEventListener('click', showSignUp);
document.getElementById('gotoSignin')?.addEventListener('click', showSignIn);

// ====== Form Submission ======
function showMessage(msg, isError = false) {
    const existingMsg = document.querySelector('.message');
    if (existingMsg) existingMsg.remove();
    
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = msg;
    message.style.cssText = `
        margin-top: 10px;
        padding: 10px;
        background: ${isError ? '#ff4444' : '#00ff00'};
        color: black;
        border-radius: 5px;
        display: none;
        font-weight: bold;
    `;
    document.getElementById('content').appendChild(message);
    message.style.display = 'block';
    setTimeout(() => message.remove(), 3000);
}

signinForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const credentials = {
        email: document.getElementById('signinEmail').value,
        password: document.getElementById('signinPassword').value
    };
    
    const result = await apiSignin(credentials);
    if (result.success) {
        localStorage.setItem('token', result.token);
        showMessage('Success! Redirecting...');
        setTimeout(() => window.location.href = 'dashboard.html', 2000);
    } else {
        showMessage(result.message || 'Login failed', true);
    }
});

signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = {
        username: document.getElementById('signupUsername').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value
    };
    
    const result = await apiSignup(userData);
    if (result.success) {
        showMessage('Account created! Redirecting...');
        setTimeout(() => {
            localStorage.setItem('firstTime', 'no');
            showSignIn();
        }, 2000);
    } else {
        showMessage(result.message || 'Signup failed', true);
    }
});