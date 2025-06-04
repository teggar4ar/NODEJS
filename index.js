const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk parsing JSON dan URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route untuk halaman about
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route untuk API sederhana
app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello from Node.js API!',
        timestamp: new Date().toISOString(),
        data: [
            { id: 1, name: 'Item 1', description: 'Deskripsi item pertama' },
            { id: 2, name: 'Item 2', description: 'Deskripsi item kedua' },
            { id: 3, name: 'Item 3', description: 'Deskripsi item ketiga' }
        ]
    });
});

// Route untuk menerima data POST
app.post('/api/submit', (req, res) => {
    const { name, email, message } = req.body;
    
    // Simulasi pemrosesan data
    console.log('Data diterima:', { name, email, message });
    
    res.json({
        status: 'success',
        message: 'Data berhasil diterima!',
        data: { name, email, message }
    });
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
