# Use an official Node.js LTS (Long Term Support) version as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app
RUN ng build

# Expose the port the app runs on (if needed)
EXPOSE 4200

# Start the application (you may need to adjust this depending on your setup)
CMD ["ng", "serve", "--host", "0.0.0.0"]
