# Usamos una versión específica y ligera de Postgres
FROM postgres:16-alpine

# Copiamos nuestro script inicial. Postgres ejecutará esto automáticamente al arrancar.
COPY init/ /docker-entrypoint-initdb.d/