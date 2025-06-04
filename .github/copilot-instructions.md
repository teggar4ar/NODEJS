<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions untuk Node.js Web App

## Konteks Proyek
Ini adalah aplikasi web sederhana yang dibuat dengan Node.js dan Express.js untuk pembelajaran dasar web development.

## Teknologi yang Digunakan
- **Backend**: Node.js dengan Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Struktur**: Server-side rendering dengan static assets

## Panduan Coding
- Gunakan bahasa Indonesia untuk komentar dan pesan user-facing
- Ikuti pola RESTful API untuk endpoint
- Gunakan async/await untuk operasi asynchronous
- Implementasikan error handling yang proper
- Gunakan responsive design untuk UI
- Gunakan semantic HTML dan accessible markup

## Struktur File
- `index.js`: Main server file dengan Express routes
- `views/`: HTML templates
- `public/`: Static assets (CSS, JS, images)
- `package.json`: NPM configuration dan dependencies

## Best Practices
- Validasi input di client dan server side
- Gunakan middleware Express untuk functionality yang reusable
- Implement proper HTTP status codes
- Log errors untuk debugging
- Gunakan environment variables untuk configuration
- Implement graceful shutdown handling
