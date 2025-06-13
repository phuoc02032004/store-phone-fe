#!/bin/sh

# Start Nginx in the background
nginx &

# Wait a bit for Nginx to start
sleep 2

# Configure ngrok
if [ -z "$NGROK_AUTHTOKEN" ]; then
    echo "Error: NGROK_AUTHTOKEN environment variable not set."
    echo "Please run the container with -e NGROK_AUTHTOKEN=<your_ngrok_authtoken>"
    exit 1
fi

# Configure ngrok authtoken
ngrok config add-authtoken "$NGROK_AUTHTOKEN"

# Start ngrok in the background
ngrok http 80 --log=stdout > /var/log/ngrok.log 2>&1 &

# Keep the container running and follow nginx logs
tail -f /var/log/ngrok.log