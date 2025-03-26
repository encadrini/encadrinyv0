# Use an official Node runtime as a parent image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies and tools
RUN apk add --no-cache \
    postgresql-client \
    git

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application (if using TypeScript or need to compile)
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
RUN apk add --no-cache \
    postgresql-client \
    tini

# Copy built assets and node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Ensure Prisma client is generated
RUN npx prisma generate

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Use Tini as init system
ENTRYPOINT ["/sbin/tini", "--"]

# Expose the port the app runs on
EXPOSE 3100

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3100/api/health || exit 1

# Start the application with Prisma migrations
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]