# LAB-06: Modernizar un sitio web con IA generativa en Google Cloud

- **Estudiante:** Joseph Miguel Zavaleta Polo
- **Código / Correo:** 202111354@urp.edu.pe
- **Lab:** Modernize your Website with Generative AI on Google Cloud (`OCBL451`)
- **Proyecto temporal:** `qwiklabs-gcp-01-e3d2fb7e0252`
- **Puntaje obtenido en Google Skills:** 100 / 100

## Puntos de control y evidencias

| Punto de control | Puntaje | Evidencia | Estado / Observaciones |
| :--- | :---: | :--- | :--- |
| **1. API de Agent Platform habilitada** | 2 pts | [`puntaje.png`](./evidencia/puntaje.png) | Completado (100/100 en Google Skills). |
| **2. App de Agent Search creada** | 6 pts | [`agent-search-preview.png`](./evidencia/agent-search-preview.png) | Data store `my-data-store` indexado y probado en Preview. |
| **3. Sitio desplegado en Cloud Run** | 5 pts | [`cloud-run.png`](./evidencia/cloud-run.png) | Servicio `webmod-svc` desplegado en `us-west1` con búsqueda y seguimiento sobre ETFs funcionando. |
| **4. Contenido editado con IA y Logs** | 7 pts | [`imagen.png`](./evidencia/imagen.png)<br>[`traduccion.png`](./evidencia/traduccion.png)<br>[`refine.png`](./evidencia/refine.png)<br>[`logs-refine-prompt.png`](./evidencia/logs-refine-prompt.png) | Se ejecutaron las acciones en el editor (`20:40–20:45`). Como se evidencia en `logs-refine-prompt.png`, el proyecto temporal de Google arrojó `400 FAILED_PRECONDITION (Organization Policy constraint)` en `gemini-3.6-flash`, generando el toast `Error refining text` en la UI. Google Skills validó el 100 % del lab. |