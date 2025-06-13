# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Install Ngrok with the latest version
RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz && \
    tar xvzf ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin && \
    chmod +x /usr/local/bin/ngrok && \
    rm -f ngrok-v3-stable-linux-amd64.tgz

COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration (optional, if you have a custom one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a startup script
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 80

CMD ["start.sh"]