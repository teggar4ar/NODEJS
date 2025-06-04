# Aplikasi Web Node.js Sederhana

Aplikasi web sederhana yang dibuat menggunakan Node.js dan Express.js untuk pembelajaran dasar pengembangan web dengan JavaScript di sisi server.

## 🚀 Fitur

- **Express.js Server** - Web server yang cepat dan minimalis
- **Static File Serving** - Melayani file CSS, JavaScript, dan gambar
- **RESTful API** - Endpoint untuk GET dan POST data
- **Form Handling** - Pemrosesan form dengan validasi
- **Responsive Design** - Tampilan yang mobile-friendly
- **Error Handling** - Halaman 404 dan error handling
- **Interactive UI** - JavaScript untuk interaktivitas client-side

## 🛠️ Teknologi

- **Node.js** - Runtime JavaScript untuk server-side
- **Express.js** - Framework web minimalis
- **HTML5** - Markup language untuk struktur halaman
- **CSS3** - Styling dan layout halaman
- **Vanilla JavaScript** - Interaktivitas di sisi client

## 📁 Struktur Project

```
├── index.js              # Main server file
├── package.json           # NPM configuration
├── README.md             # Project documentation
├── .github/
│   └── copilot-instructions.md
├── views/                # HTML templates
│   ├── index.html        # Halaman utama
│   ├── about.html        # Halaman about
│   └── 404.html          # Halaman error 404
└── public/               # Static assets
    ├── css/
    │   └── style.css     # Main stylesheet
    └── js/
        └── script.js     # Client-side JavaScript
```

## 🏃‍♂️ Cara Menjalankan

### Prerequisites
- Node.js (versi 14 atau lebih baru)
- NPM (biasanya sudah include dengan Node.js)

### Instalasi dan Menjalankan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan aplikasi:**
   ```bash
   npm start
   ```
   atau untuk development:
   ```bash
   npm run dev
   ```

3. **Buka browser dan akses:**
   ```
   http://localhost:3000
   ```

## 📱 Halaman yang Tersedia

- **Home** (`/`) - Halaman utama dengan form kontak dan demo API
- **About** (`/about`) - Informasi tentang aplikasi dan teknologi yang digunakan
- **API Data** (`/api/data`) - Endpoint API untuk mendapatkan data JSON
- **API Submit** (`/api/submit`) - Endpoint API untuk menerima data POST

## 🔧 API Endpoints

### GET /api/data
Mendapatkan data sample dalam format JSON.

**Response:**
```json
{
  "message": "Hello from Node.js API!",
  "timestamp": "2025-06-05T01:00:00.000Z",
  "data": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "Deskripsi item pertama"
    }
  ]
}
```

### POST /api/submit
Menerima data dari form kontak.

**Request Body:**
```json
{
  "name": "Nama User",
  "email": "email@example.com",
  "message": "Pesan dari user"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Data berhasil diterima!",
  "data": {
    "name": "Nama User",
    "email": "email@example.com",
    "message": "Pesan dari user"
  }
}
```

## 🎨 Fitur UI

- **Responsive Design** - Tampilan yang menyesuaikan dengan ukuran layar
- **Modern CSS** - Menggunakan Flexbox dan Grid untuk layout
- **Interactive Elements** - Button hover effects dan form validation
- **Loading States** - Indikator loading untuk operasi async
- **Error Handling** - Pesan error yang user-friendly

## 🧪 Testing

Aplikasi ini menyediakan utility functions di browser console untuk testing:

```javascript
// Test API endpoint
window.debugUtils.testAPI();

// Test form submission
window.debugUtils.submitTestForm();

// Load data from API
window.debugUtils.loadData();
```

## 📝 Development Notes

- Server berjalan di port 3000 secara default
- Static files disajikan dari folder `public/`
- HTML templates berada di folder `views/`
- Aplikasi menggunakan middleware Express untuk JSON parsing
- Error handling mencakup 404 page dan server errors

## 🤝 Contributing

Ini adalah project pembelajaran. Silakan fork dan modifikasi sesuai kebutuhan untuk pembelajaran Anda.

## 📄 License

ISC License - Project ini dibuat untuk tujuan pembelajaran.

---

**Dibuat dengan ❤️ untuk pembelajaran Node.js dan Express.js**
