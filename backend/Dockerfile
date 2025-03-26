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

# Install dependencies (including Prisma)
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3100

# Ensure Prisma schema and migrations are correctly set
COPY src/prisma/schema.prisma ./prisma/
COPY src/prisma/migrations ./prisma/migrations

# Generate Prisma client
RUN npx prisma generate

# Ensure NestJS listens on 0.0.0.0
ENV HOST=0.0.0.0
ENV PORT=3100

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3100/api/health || exit 1

# Start the application with Prisma migrations
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]




# # Use an official Node runtime as a parent image
# FROM node:18-alpine

# # Set working directory
# WORKDIR /app

# # Install system dependencies and tools
# RUN apk add --no-cache \
#     postgresql-client \
#     git

# # Copy package files first to leverage Docker layer caching
# COPY package*.json ./

# # Install dependencies
# RUN npm ci --only=production

# # Copy the rest of the application code
# COPY . .

# # Generate Prisma client
# COPY src/prisma/schema.prisma ./prisma/
# RUN npx prisma generate --schema=./prisma/schema.prisma 

# # Ensure migrations are copied
# COPY src/prisma/migrations ./prisma/migrations


# # Expose the port the app runs on
# EXPOSE 3100

# # Create a non-root user for security
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser

# # Health check
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
#   CMD wget --no-verbose --tries=1 --spider http://localhost:3100/api/health || exit 1

# # Start the application
# CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]