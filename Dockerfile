FROM node:20.11.0-alpine

WORKDIR /app

# Verify Node.js version
RUN node --version

# Install pnpm@8.15.3 and verify pnpm version
RUN npm install -g pnpm@8.15.3 && pnpm --version