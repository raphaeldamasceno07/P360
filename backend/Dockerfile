FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /usr/src/app

# Instala dependências globais e do projeto
COPY package*.json ./
RUN npm install

# Expõe a porta que o NestJS vai rodar
EXPOSE 4000

# Comando padrão: roda em dev com hot-reload
CMD ["npm", "run", "start:dev"]
