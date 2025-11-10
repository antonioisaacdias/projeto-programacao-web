# Imagem leve do Node
FROM node:20-alpine

# Instala cliente PostgreSQL para o wait-for-db.sh
RUN apk add --no-cache postgresql-client

# Diretório de trabalho no container
WORKDIR /app

# Copia manifestos e instala dependências (inclui dev para rodar nodemon)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Torna o script wait-for-db.sh executável
RUN chmod +x wait-for-db.sh

# Expõe a porta da API
EXPOSE 3000

# Comando padrão (pode ser sobrescrito pelo docker-compose)
CMD ["npm", "start"]