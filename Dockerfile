# Dockerfile for NestJS Backend
FROM node:21.6.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

# Install env-cmd globally
RUN npm install -g env-cmd

# Expose the application port
EXPOSE 3000

# Command to run the application using env-cmd for loading environment variables
CMD ["env-cmd", "-f", ".env-cmdrc.json", "npm", "run", "start:local"]
