# Base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only what's needed for installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build Nuxt app
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "run", "start"]