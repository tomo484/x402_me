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
COPY packages/x402-mw/package.json ./packages/x402-mw/
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Copy tsconfig files
COPY tsconfig.json ./
COPY packages/shared/tsconfig.json ./packages/shared/
COPY packages/x402-mw/tsconfig.json ./packages/x402-mw/
COPY apps/api/tsconfig.json ./apps/api/

# Build packages
WORKDIR /app/packages/shared
RUN pnpm build

WORKDIR /app/packages/x402-mw
RUN pnpm build

WORKDIR /app/apps/api
RUN pnpm build

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/healthz || exit 1

# Start the application
CMD ["pnpm", "start"] 