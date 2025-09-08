# === etapa 1: build ===
FROM node:18-alpine AS build

WORKDIR /app

# instala dependências (usa package-lock se existir para reprodutibilidade)
COPY package*.json ./
# se você usa npm ci:
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

# copia todo o código (inclui tsconfig, vite.config, src, public, etc.)
COPY . .

# se você usa variáveis de ambiente de build (Vite: VITE_...), você pode colocar .env.production antes do build
# ex: echo "VITE_API_URL=https://abitus-api.geia.vip" > .env.production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

# === etapa 2: servidor nginx para servir arquivos estáticos ===
FROM nginx:alpine

# remove site default
RUN rm -rf /usr/share/nginx/html/*

# copia build do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# copia configuração nginx customizada (garante suporte ao history mode do SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
