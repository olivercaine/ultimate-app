# docker build . -t olliecaine/dev:node20.11alpinePNPM8.15.3arm64
# docker push olliecaine/dev:node20.11alpinePNPM8.15.3arm64
# FROM --platform=linux/amd64 node:20.11.0-alpine
FROM olliecaine/dev:node20.11alpinePNPM8.15.3arm64

WORKDIR /app

# Verify Node.js version
RUN node --version

# Install pnpm@8.15.3 and verify pnpm version
RUN npm install -g pnpm@8.15.3 && pnpm --version