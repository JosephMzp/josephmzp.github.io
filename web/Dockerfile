# Usamos una imagen especial de nginx que NO es root (Reto 3)
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Copiamos nuestra configuración
COPY web/nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el index.html desde la RAÍZ de tu proyecto
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 8080