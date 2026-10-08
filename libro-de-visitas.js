document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-visitas');
    const lista = document.getElementById('lista-mensajes');

    const cargarMensajes = async () => {
        try {
            const res = await fetch('/api/mensajes');
            if (res.ok) {
                const mensajes = await res.json();
                lista.innerHTML = mensajes.map(m => `<li><strong>${m.nombre}:</strong> ${m.mensaje}</li>`).join('');
            } else {
                lista.innerHTML = '<li>Error al cargar mensajes</li>';
            }
        } catch (e) {
            lista.innerHTML = '<li>La API no está conectada.</li>';
        }
    };

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const mensaje = document.getElementById('mensaje').value;

            try {
                const res = await fetch('/api/mensajes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, mensaje })
                });
                if (res.ok) {
                    form.reset();
                    cargarMensajes();
                }
            } catch (e) {
                alert('Error al enviar el mensaje');
            }
        });
    }
    cargarMensajes();
});