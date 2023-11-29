# Use an official Node runtime as the parent image
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force 
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

# Check memory usage
RUN echo "Memory usage before build:" && free -h

RUN npm run build
CMD [ "npx", "nuxt", "start" ]
