# Frontend Dockerfile (React + Vite)
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for vite preview)
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 4173

# Start with vite preview (serves the built dist folder)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]