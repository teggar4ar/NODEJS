# Gunakan Node.js official image sebagai base
FROM node:18-alpine

# Set metadata untuk image
LABEL version="1.0.0"

# Buat directory untuk aplikasi
WORKDIR /usr/src/app

# Copy package files terlebih dahulu untuk leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Buat user non-root untuk keamanan
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy source code aplikasi
COPY --chown=nodejs:nodejs . .

# Switch ke user non-root
USER nodejs

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check untuk monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]