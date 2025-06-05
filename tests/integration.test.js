const request = require('supertest');
const app = require('../app');

describe('Integration Tests', () => {
    
    // Test complete workflow
    describe('Complete API Workflow', () => {
        test('should complete full API workflow', async () => {
            // 1. Check health status
            const healthResponse = await request(app)
                .get('/health')
                .expect(200);
            
            expect(healthResponse.body.status).toBe('healthy');
            
            // 2. Get data from API
            const dataResponse = await request(app)
                .get('/api/data')
                .expect(200);
            
            expect(dataResponse.body.data).toHaveLength(3);
            
            // 3. Submit valid form data
            const submitResponse = await request(app)
                .post('/api/submit')
                .send({
                    name: 'Integration Test User',
                    email: 'integration@test.com',
                    message: 'Testing complete workflow'
                })
                .expect(200);
            
            expect(submitResponse.body.status).toBe('success');
        });
    });

    // Test error scenarios
    describe('Error Handling Integration', () => {
        test('should handle multiple invalid requests gracefully', async () => {
            // Test multiple 404 requests
            const promises = [];
            for (let i = 0; i < 5; i++) {
                promises.push(
                    request(app)
                        .get(`/non-existent-${i}`)
                        .expect(404)
                );
            }
            
            await Promise.all(promises);
        });

        test('should handle multiple invalid form submissions', async () => {
            const invalidSubmissions = [
                { name: '', email: 'test@example.com', message: 'test' },
                { name: 'test', email: '', message: 'test' },
                { name: 'test', email: 'test@example.com', message: '' },
                {}
            ];

            for (const invalidData of invalidSubmissions) {
                await request(app)
                    .post('/api/submit')
                    .send(invalidData)
                    .expect(400);
            }
        });
    });

    // Test concurrent requests
    describe('Concurrent Request Handling', () => {
        test('should handle multiple concurrent API requests', async () => {
            const promises = [];
            
            // Create 10 concurrent requests
            for (let i = 0; i < 10; i++) {
                promises.push(
                    request(app)
                        .get('/api/data')
                        .expect(200)
                );
            }
            
            const responses = await Promise.all(promises);
            
            // Verify all responses are correct
            responses.forEach(response => {
                expect(response.body.data).toHaveLength(3);
                expect(response.body.message).toBe('Hello from Node.js API!');
            });
        });

        test('should handle mixed concurrent requests', async () => {
            const promises = [];
            
            // Mix of GET and POST requests
            for (let i = 0; i < 5; i++) {
                promises.push(
                    request(app)
                        .get('/api/data')
                        .expect(200)
                );
                
                promises.push(
                    request(app)
                        .post('/api/submit')
                        .send({
                            name: `User ${i}`,
                            email: `user${i}@test.com`,
                            message: `Message ${i}`
                        })
                        .expect(200)
                );
            }
            
            const responses = await Promise.all(promises);
            expect(responses).toHaveLength(10);
        });
    });

    // Test response time (performance test)
    describe('Performance Tests', () => {
        test('API response time should be reasonable', async () => {
            const startTime = Date.now();
            
            await request(app)
                .get('/api/data')
                .expect(200);
            
            const responseTime = Date.now() - startTime;
            
            // Response should be faster than 100ms for simple API
            expect(responseTime).toBeLessThan(100);
        });

        test('Form submission should be processed quickly', async () => {
            const startTime = Date.now();
            
            await request(app)
                .post('/api/submit')
                .send({
                    name: 'Performance Test User',
                    email: 'perf@test.com',
                    message: 'Testing response time'
                })
                .expect(200);
            
            const responseTime = Date.now() - startTime;
            
            // Response should be faster than 200ms
            expect(responseTime).toBeLessThan(200);
        });
    });
});
