FROM node:20-bookworm-slim
WORKDIR /app

# Outils de build pour modules natifs
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates git build-essential python3 pkg-config \
 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm set audit false && npm set fund false \
 && if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","start"]   # adaptez selon votre script "start"
