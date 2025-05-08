# Stage 1: Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Copy only what's needed for installing dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build Nuxt app
RUN npm run build

# ------------------------------------------------------

# Stage 2: Production stage
FROM node:18-slim

WORKDIR /app

# Copy only built output and required files
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]