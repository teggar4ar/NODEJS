// Jest setup file untuk konfigurasi global test
const { execSync } = require('child_process');

// Set timeout untuk test yang lebih lama
jest.setTimeout(10000);

// Mock console.log untuk mengurangi noise dalam test output
const originalConsoleLog = console.log;
console.log = (...args) => {
  // Hanya tampilkan log jika ada error atau dalam debug mode
  if (process.env.TEST_DEBUG || args.some(arg => 
    typeof arg === 'string' && (arg.includes('error') || arg.includes('Error'))
  )) {
    originalConsoleLog(...args);
  }
};

// Global test utilities
global.testUtils = {
  // Helper untuk membuat test data
  createTestUser: (index = 1) => ({
    name: `Test User ${index}`,
    email: `testuser${index}@example.com`,
    message: `Test message ${index}`
  }),

  // Helper untuk menunggu delay
  sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Helper untuk membuat random string
  randomString: (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Helper untuk validasi response format
  validateApiResponse: (response, expectedFields = []) => {
    expect(response).toBeDefined();
    expect(typeof response).toBe('object');
    
    expectedFields.forEach(field => {
      expect(response).toHaveProperty(field);
    });
  }
};

// Before all tests
beforeAll(async () => {
  console.log('🚀 Starting test suite...');
  
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.PORT = '3001'; // Use different port for testing
  
  console.log('✅ Test environment configured');
});

// After all tests
afterAll(async () => {
  console.log('🏁 Test suite completed');
  
  // Cleanup any resources if needed
  // Reset environment variables
  delete process.env.NODE_ENV;
  delete process.env.PORT;
});

// Before each test
beforeEach(() => {
  // Reset any mocks or states if needed
});

// After each test
afterEach(() => {
  // Cleanup after each test if needed
});
