# Use the official Node.js 20 image as the base image
FROM node:alpine

# Install PNPM globally
RUN npm install -g pnpm@8

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install project dependencies using PNPM
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

RUN pnpm build

# Expose any necessary ports
# EXPOSE 3000

# Define any environment variables, if needed
# ENV NODE_ENV=production