const app = require('./app');
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
