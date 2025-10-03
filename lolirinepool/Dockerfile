FROM node:20-bookworm-slim
WORKDIR /app

ARG GIT_SHA
LABEL org.opencontainers.image.revision=$GIT_SHA

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates git build-essential python3 pkg-config \
 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm set audit false && npm set fund false \
 && if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY . .

# Exécute un build si un script "build" existe (Next.js, Vite, etc.)
RUN node -e "const p=require('./package.json'); process.exit(p.scripts&&p.scripts.build?0:1)" \
 && npm run build || echo 'no build script, skipping'

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","start"]   # ou npm run start si défini
