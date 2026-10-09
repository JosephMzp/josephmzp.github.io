FROM nginx:alpine
COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY _site /usr/share/nginx/html
EXPOSE 8080