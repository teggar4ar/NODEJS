// DOM Elements
const loadDataBtn = document.getElementById('loadDataBtn');
const contactForm = document.getElementById('contactForm');
const dataContainer = document.getElementById('dataContainer');

// Utility function untuk menampilkan pesan
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Hapus pesan yang sudah ada
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Tambahkan pesan baru
    if (contactForm) {
        contactForm.appendChild(messageDiv);
        
        // Hapus pesan setelah 5 detik
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Function untuk memuat data dari API
async function loadDataFromAPI() {
    if (!loadDataBtn || !dataContainer) return;
    
    try {
        // Tampilkan loading state
        loadDataBtn.textContent = 'Memuat...';
        loadDataBtn.disabled = true;
        dataContainer.innerHTML = '<p>Memuat data...</p>';
        
        // Fetch data dari API
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Tampilkan data
        displayData(result);
        
    } catch (error) {
        console.error('Error loading data:', error);
        dataContainer.innerHTML = `
            <div class="message error">
                <strong>Error:</strong> Gagal memuat data. ${error.message}
            </div>
        `;
    } finally {
        // Reset button state
        loadDataBtn.textContent = 'Muat Data dari API';
        loadDataBtn.disabled = false;
    }
}

// Function untuk menampilkan data
function displayData(result) {
    if (!dataContainer) return;
    
    const { message, timestamp, data } = result;
    
    let html = `
        <div style="margin-bottom: 2rem;">
            <h4>Response dari API:</h4>
            <p><strong>Pesan:</strong> ${message}</p>
            <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString('id-ID')}</p>
        </div>
    `;
    
    if (data && data.length > 0) {
        html += '<h4>Data Items:</h4>';
        data.forEach(item => {
            html += `
                <div class="data-item">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <div class="item-id">ID: ${item.id}</div>
                </div>
            `;
        });
    }
    
    dataContainer.innerHTML = html;
}

// Function untuk menangani form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!contactForm) return;
    
    // Ambil data form
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validasi sederhana
    if (!data.name || !data.email || !data.message) {
        showMessage('Semua field harus diisi!', 'error');
        return;
    }
    
    try {
        // Tampilkan loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Kirim data ke server
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status === 'success') {
            showMessage('Pesan berhasil dikirim! Terima kasih atas feedback Anda.', 'success');
            contactForm.reset(); // Reset form
        } else {
            throw new Error(result.message || 'Terjadi kesalahan');
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage(`Gagal mengirim pesan: ${error.message}`, 'error');
    } finally {
        // Reset button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Kirim Pesan';
        submitBtn.disabled = false;
    }
}

// Function untuk smooth scrolling
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Function untuk highlight active navigation
function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Node.js Web App loaded successfully!');
    
    // Update active navigation
    updateActiveNavigation();
    
    // Event listener untuk load data button
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', loadDataFromAPI);
    }
    
    // Event listener untuk contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Event listener untuk input validasi real-time
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                this.style.borderColor = '#ddd';
            }
        });
    });
});

// Handle page visibility change (untuk optimasi performance)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page is now hidden');
    } else {
        console.log('Page is now visible');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    showMessage('Koneksi internet tersambung kembali!', 'success');
});

window.addEventListener('offline', function() {
    showMessage('Koneksi internet terputus!', 'error');
});

// Utility functions yang bisa digunakan di console untuk testing
window.debugUtils = {
    loadData: loadDataFromAPI,
    testAPI: async function() {
        try {
            const response = await fetch('/api/data');
            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error('API Test Error:', error);
        }
    },
    submitTestForm: async function() {
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message from console'
        };
        
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });
            const result = await response.json();
            console.log('Form Submit Response:', result);
        } catch (error) {
            console.error('Form Submit Error:', error);
        }
    }
};
