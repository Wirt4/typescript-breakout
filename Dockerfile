FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev && \
    npm install

COPY . .

EXPOSE 1234

# Define the command to start your app
CMD ["npm", "run", "start"]
