FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.0

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/

# Copy tsconfig files
COPY tsconfig.json ./
COPY packages/shared/tsconfig.json ./packages/shared/
COPY apps/web/tsconfig.json ./apps/web/

# Build shared package
WORKDIR /app/packages/shared
RUN pnpm build

# Build and start Next.js app
WORKDIR /app/apps/web

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["pnpm", "dev"] 