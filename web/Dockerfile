# Usamos una imagen especial de nginx que NO es root (Reto 3)
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Cambiar a root temporalmente para actualizar paquetes vulnerables
USER root
RUN apk upgrade --no-cache
# Volver al usuario sin privilegios
USER nginx

COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 8080