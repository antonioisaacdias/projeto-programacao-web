# Imagem leve do Node
FROM node:20-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copia manifestos e instala dependências (inclui dev para rodar nodemon)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando padrão (pode ser sobrescrito pelo docker-compose)
CMD ["npm", "start"]