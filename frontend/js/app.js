async function testBackend() {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/`);
        const data = await response.json();
        console.log(`✅ الاتصال ناجح: ${data.message}`);
        return true;
    } catch (error) {
        console.error(`❌ خطأ في الاتصال: ${error.message}`);
        return false;
    }
}

async function apiSignup(userData) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SIGNUP}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Error connecting to server' };
    }
}

async function apiSignin(credentials) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SIGNIN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Error connecting to server' };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Frontend loaded. Testing backend connection...');
    testBackend();
});