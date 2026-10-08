# 1. Base pequeña y tag fijo (regla de oro)
FROM node:22-slim

WORKDIR /app

# 2. Copiamos package.json e instalamos PRIMERO (orden para la caché)
COPY package.json ./
RUN npm install

# 3. Luego copiamos el resto del código
COPY . .

# 4. Cambiamos a un usuario sin privilegios para no ser "root"
USER node

EXPOSE 3000
CMD ["node", "index.js"]