CREATE TABLE mensajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    mensaje VARCHAR(280) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO mensajes (nombre, mensaje) VALUES ('Joseph', 'Bienvenidos a mi perfil, dejen sus comentarios.');