# Stage 1: Build React app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install --force

COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

USER root
# FaaS-safe writable temp directories
RUN mkdir -p /tmp/nginx-temp/client_temp \
             /tmp/nginx-temp/proxy_temp \
             /tmp/nginx-temp/fastcgi_temp \
             /tmp/nginx-temp/uwsgi_temp \
             /tmp/nginx-temp/scgi_temp && \
    chmod -R 777 /tmp/nginx-temp

# Remove default static content
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Use custom nginx config if needed
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

