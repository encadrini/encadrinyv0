# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies and tools
RUN apk add --no-cache \
    postgresql-client \
    git

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Generate Prisma client
COPY src/prisma/schema.prisma ./prisma/
RUN npx prisma generate --schema=./prisma/schema.prisma

# Expose the port the app runs on
EXPOSE 3100

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3100/api/health || exit 1

# Start the application
CMD ["npm", "start"]