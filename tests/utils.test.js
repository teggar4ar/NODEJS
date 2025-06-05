// Test untuk utility functions dan helper methods
describe('Utility Functions Tests', () => {
    
    // Test Date formatting
    describe('Date and Time Utilities', () => {
        test('should create valid ISO timestamp', () => {
            const timestamp = new Date().toISOString();
            expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        });

        test('should handle date parsing correctly', () => {
            const testDate = '2025-06-05T10:00:00.000Z';
            const parsedDate = new Date(testDate);
            expect(parsedDate.getFullYear()).toBe(2025);
            expect(parsedDate.getMonth()).toBe(5); // Month is 0-indexed
            expect(parsedDate.getDate()).toBe(5);
        });
    });

    // Test Input Validation
    describe('Input Validation', () => {
        test('should validate required fields', () => {
            const validateRequiredFields = (data, requiredFields) => {
                return requiredFields.every(field => 
                    data[field] && data[field].toString().trim().length > 0
                );
            };

            const validData = { name: 'Test', email: 'test@example.com', message: 'Hello' };
            const invalidData = { name: '', email: 'test@example.com', message: 'Hello' };
            const requiredFields = ['name', 'email', 'message'];

            expect(validateRequiredFields(validData, requiredFields)).toBe(true);
            expect(validateRequiredFields(invalidData, requiredFields)).toBe(false);
        });

        test('should validate email format', () => {
            const isValidEmail = (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            };

            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user@domain.co.id')).toBe(true);
            expect(isValidEmail('invalid-email')).toBe(false);
            expect(isValidEmail('test@')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
        });
    });

    // Test Data Processing
    describe('Data Processing', () => {
        test('should process form data correctly', () => {
            const processFormData = (formData) => {
                return {
                    name: formData.name?.trim(),
                    email: formData.email?.toLowerCase().trim(),
                    message: formData.message?.trim()
                };
            };

            const inputData = {
                name: '  John Doe  ',
                email: '  TEST@EXAMPLE.COM  ',
                message: '  Hello World  '
            };

            const processed = processFormData(inputData);
            
            expect(processed.name).toBe('John Doe');
            expect(processed.email).toBe('test@example.com');
            expect(processed.message).toBe('Hello World');
        });

        test('should handle null and undefined values', () => {
            const safeStringify = (value) => {
                if (value === null || value === undefined) {
                    return '';
                }
                return String(value);
            };

            expect(safeStringify(null)).toBe('');
            expect(safeStringify(undefined)).toBe('');
            expect(safeStringify('test')).toBe('test');
            expect(safeStringify(123)).toBe('123');
        });
    });

    // Test Environment Configuration
    describe('Environment Configuration', () => {
        test('should use default port when PORT env is not set', () => {
            const getPort = () => process.env.PORT || 3000;
            
            // Backup original PORT
            const originalPort = process.env.PORT;
            
            // Test default port
            delete process.env.PORT;
            expect(getPort()).toBe(3000);
            
            // Test custom port
            process.env.PORT = '8080';
            expect(getPort()).toBe('8080');
            
            // Restore original PORT
            if (originalPort) {
                process.env.PORT = originalPort;
            } else {
                delete process.env.PORT;
            }
        });

        test('should handle NODE_ENV correctly', () => {
            const isProduction = () => process.env.NODE_ENV === 'production';
            const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
            
            const originalEnv = process.env.NODE_ENV;
            
            process.env.NODE_ENV = 'production';
            expect(isProduction()).toBe(true);
            expect(isDevelopment()).toBe(false);
            
            process.env.NODE_ENV = 'development';
            expect(isProduction()).toBe(false);
            expect(isDevelopment()).toBe(true);
            
            // Restore original environment
            if (originalEnv) {
                process.env.NODE_ENV = originalEnv;
            } else {
                delete process.env.NODE_ENV;
            }
        });
    });

    // Test Error Handling
    describe('Error Handling', () => {
        test('should create error response object', () => {
            const createErrorResponse = (message, statusCode = 500) => {
                return {
                    status: 'error',
                    message: message,
                    statusCode: statusCode,
                    timestamp: new Date().toISOString()
                };
            };

            const error = createErrorResponse('Test error', 400);
            
            expect(error.status).toBe('error');
            expect(error.message).toBe('Test error');
            expect(error.statusCode).toBe(400);
            expect(error.timestamp).toBeDefined();
        });

        test('should create success response object', () => {
            const createSuccessResponse = (data, message = 'Success') => {
                return {
                    status: 'success',
                    message: message,
                    data: data,
                    timestamp: new Date().toISOString()
                };
            };

            const response = createSuccessResponse({ id: 1 }, 'Data retrieved');
            
            expect(response.status).toBe('success');
            expect(response.message).toBe('Data retrieved');
            expect(response.data).toEqual({ id: 1 });
            expect(response.timestamp).toBeDefined();
        });
    });
});
