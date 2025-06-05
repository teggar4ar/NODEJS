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
- Docker (opsional, untuk containerization)

### Instalasi dan Menjalankan

#### Method 1: Menjalankan Langsung dengan Node.js

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

#### Method 2: Menjalankan dengan Docker

1. **Build Docker image:**
   ```bash
   docker build -t nodejs-web-app .
   ```
   atau menggunakan npm script:
   ```bash
   npm run docker:build
   ```

2. **Jalankan container:**
   ```bash
   docker run -p 3000:3000 nodejs-web-app
   ```
   atau menggunakan npm script:
   ```bash
   npm run docker:run
   ```

3. **Buka browser dan akses:**
   ```
   http://localhost:3000
   ```

#### Method 3: Menjalankan dengan Docker Compose

1. **Start dengan docker-compose:**
   ```bash
   docker-compose up -d
   ```
   atau menggunakan npm script:
   ```bash
   npm run docker:compose:up
   ```

2. **Stop aplikasi:**
   ```bash
   docker-compose down
   ```
   atau menggunakan npm script:
   ```bash
   npm run docker:compose:down
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

## 🐳 Docker Support

Aplikasi ini sudah dikonfigurasi untuk berjalan dengan Docker dan Docker Compose.

### Docker Files
- **`Dockerfile`** - Multi-stage build dengan optimasi untuk production
- **`.dockerignore`** - Mengecualikan file yang tidak diperlukan dalam container
- **`docker-compose.yml`** - Konfigurasi untuk menjalankan aplikasi dengan Docker Compose
- **`healthcheck.js`** - Script untuk health check container

### Docker Features
- **Multi-stage build** untuk optimasi ukuran image
- **Non-root user** untuk keamanan
- **Health check** untuk monitoring container
- **Environment variables** untuk konfigurasi
- **Volume mounting** support untuk development

### NPM Scripts untuk Docker
```bash
npm run docker:build         # Build Docker image
npm run docker:run           # Run container
npm run docker:compose:up    # Start dengan docker-compose
npm run docker:compose:down  # Stop docker-compose
```

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
