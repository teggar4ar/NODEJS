const request = require('supertest');
const app = require('../app');

describe('Node.js Web App API Tests', () => {
    
    // Test Health Check Endpoint
    describe('GET /health', () => {
        test('should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);
            
            expect(response.body).toHaveProperty('status', 'healthy');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('uptime');
            expect(response.body).toHaveProperty('version');
        });
    });

    // Test API Data Endpoint
    describe('GET /api/data', () => {
        test('should return JSON data with correct structure', async () => {
            const response = await request(app)
                .get('/api/data')
                .expect(200)
                .expect('Content-Type', /json/);
            
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data).toHaveLength(3);
        });

        test('should return data items with correct properties', async () => {
            const response = await request(app)
                .get('/api/data')
                .expect(200);
            
            const dataItems = response.body.data;
            dataItems.forEach(item => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('name');
                expect(item).toHaveProperty('description');
                expect(typeof item.id).toBe('number');
                expect(typeof item.name).toBe('string');
                expect(typeof item.description).toBe('string');
            });
        });
    });

    // Test API Submit Endpoint
    describe('POST /api/submit', () => {
        const validData = {
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message'
        };

        test('should accept valid form data', async () => {
            const response = await request(app)
                .post('/api/submit')
                .send(validData)
                .expect(200)
                .expect('Content-Type', /json/);
            
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('message', 'Data berhasil diterima!');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toMatchObject(validData);
        });

        test('should reject empty name field', async () => {
            const invalidData = { ...validData, name: '' };
            
            const response = await request(app)
                .post('/api/submit')
                .send(invalidData)
                .expect(400);
            
            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message', 'Semua field harus diisi!');
        });

        test('should reject missing email field', async () => {
            const invalidData = { name: 'Test', message: 'Test message' };
            
            const response = await request(app)
                .post('/api/submit')
                .send(invalidData)
                .expect(400);
            
            expect(response.body).toHaveProperty('status', 'error');
        });

        test('should reject missing message field', async () => {
            const invalidData = { name: 'Test', email: 'test@example.com' };
            
            const response = await request(app)
                .post('/api/submit')
                .send(invalidData)
                .expect(400);
            
            expect(response.body).toHaveProperty('status', 'error');
        });

        test('should handle JSON content type', async () => {
            const response = await request(app)
                .post('/api/submit')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(validData))
                .expect(200);
            
            expect(response.body.status).toBe('success');
        });
    });

    // Test 404 Handling
    describe('404 Error Handling', () => {
        test('should return 404 for non-existent routes', async () => {
            await request(app)
                .get('/non-existent-route')
                .expect(404);
        });

        test('should return 404 for non-existent API endpoints', async () => {
            await request(app)
                .get('/api/non-existent')
                .expect(404);
        });
    });

    // Test Static File Routes (basic check)
    describe('Static Routes', () => {
        test('should serve main page', async () => {
            await request(app)
                .get('/')
                .expect(200);
        });

        test('should serve about page', async () => {
            await request(app)
                .get('/about')
                .expect(200);
        });
    });
});
