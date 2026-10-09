# Perfil: Joseph Miguel Zavaleta Polo
[![CI/CD](https://github.com/josephmzp/josephmzp.github.io/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/josephmzp/josephmzp.github.io/actions/workflows/ci-cd.yml)

Sitio personal publicado en https://josephmzp.github.io

## Cómo se publica
Cada push a `main` despliega automáticamente con GitHub Pages.

## Flujo de trabajo
- `main` protegida; todo cambio entra por pull request
- Una rama por cambio: `feature/*`, `fix/*`
- Mensajes de commit en imperativo, ≤ 50 caracteres

## Historial del curso
- **S02**: Sitio inicial, ramas y pull requests

## Delivery o deployment
Para pasar a Continuous Deployment, quitaría la regla de "Required reviewers" en el entorno `github-pages`. No lo haría si este fuera un sistema crítico de un banco, donde el control humano antes de salir a producción es obligatorio.

## Bitácora de decisiones

### Pregunta B3: ¿Cómo le llega `_site/` al job `test`?
- **Decisión:** Armé nuevamente la carpeta `_site/` ejecutando los mismos comandos `mkdir` y `cp` en el job de `test`.
- **Alternativas que evalué:** Descargar el artefacto subido en el job de `build`.
- **Por qué elegí esta:** Es más rápido copiar los archivos localmente que descargar un artefacto de la nube.

### Reto 1: Pipeline rápido
- **Decisión:** Agregué `cache: 'npm'` al paso de `setup-node`.
- **Alternativas que evalué:** Caché manual con `actions/cache`.
- **Por qué elegí esta:** La opción integrada en `setup-node` es nativa y requiere una sola línea de código.

### Reto 2: SAST y resultados a la vista
- **Decisión:** Agregué Semgrep ejecutándolo mediante Docker en el job `security` y subí el reporte en formato SARIF a GitHub Code Scanning. También agregué un archivo `.trivyignore`.
- **Alternativas que evalué:** Usar CodeQL nativo de GitHub.
- **Por qué elegí esta:** Semgrep corre más rápido usando un contenedor Docker en una sola línea y sube los resultados al instante.

### Reto 3: Pruebas de integración con Compose
- **Decisión:** Creé un nuevo job llamado `integration-compose` que genera un archivo `.env` temporal, levanta los servicios con `docker compose up -d --wait` y lanza pruebas de contrato (200, 400 y 201) a la API usando `curl`.
- **Alternativas que evalué:** Escribir un script con Vitest y la API `fetch`.
- **Por qué elegí esta:** Bash y `curl` son directos, verifican el tráfico de red real de NGINX hacia la API, y usando `if: failure()` muestro los logs de los contenedores automáticamente.

### Reto 4: Mínimo privilegio y cadena de suministro
- **Decisión:** Creé un archivo `.github/dependabot.yml` para mantener las acciones actualizadas.
- **Alternativas que evalué:** Actualizar manualmente.
- **Por qué elegí esta:** Dependabot automatiza el proceso creando PRs por su cuenta.

### Reto 5: Revisar producción y volver atrás
- **Decisión:** Usé `curl` en un paso extra después del despliegue en GitHub Pages. Para volver atrás en caso de fallo, simplemente selecciono un despliegue anterior exitoso en la pestaña "Actions" y le doy a "Re-run jobs".
- **Alternativas que evalué:** Herramientas de testing E2E como Playwright.
- **Por qué elegí esta:** Un simple `curl` es suficiente como smoke test.

### Reto 6: El pipeline se explica solo
- **Decisión:** Puse un badge en el README y usé `$GITHUB_STEP_SUMMARY` en el job de Security para dejar registro del escaneo.