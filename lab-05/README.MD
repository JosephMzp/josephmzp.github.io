# LAB-05: Terraform en Google Cloud

## Evidencia
| Lab | Puntaje | Captura | Carpeta |
|-----|---------|---------|---------|
| GSP233 | 100/100 | evidencia/gsp233.png | 01-gsp233/ |
| GSP497 | 100/100 | evidencia/gsp497.png | 02-gsp497/ |
| GSP345 | 100/100 | evidencia/gsp345.png | 03-gsp345/ |

## Bitácora
### GSP233
*   **IP externa del Service NGINX:** 34.73.144.93
*   **Qué hice:** Desplegué un clúster de Kubernetes en GKE y un servicio LoadBalancer (NGINX) utilizando los providers de Google y Kubernetes en Terraform. Generé el archivo de plan y apliqué los cambios.
*   **Qué me costó:** Tuve que instalar Terraform manualmente saltando el bloqueo del entorno usando la ruta completa `/usr/bin/terraform` e identificar mi región y zona en el panel de instrucciones para pasar las variables.
*   **Qué cambiaría:** Nada, el proceso fue exitoso.

### GSP497
*   **Qué hice:** Desplegué un clúster GKE con una aplicación de prueba, verifiqué las métricas en Cloud Monitoring y posteriormente destruí la infraestructura completa para no generar costos.
*   **Qué me costó:** El script automatizado del repositorio fallaba al intentar ejecutar `apply` directamente sin generar previamente los archivos yaml necesarios. Tuve que limpiar el estado y generar el archivo con `sed` manualmente antes de planificar.
*   **Qué cambiaría:** Comprender mejor cómo los scripts bash interactúan con Terraform antes de la fase de inicialización.
### GSP345
*   **Qué hice:** Con Terraform importé dos instancias existentes (`tf-instance-1` y `tf-instance-2`) a un módulo `instances`, creé un bucket en un módulo `storage` y migré el estado a ese bucket como backend remoto (`prefix = terraform/state`). Luego subí las instancias a `e2-standard-2`, agregué y destruí una tercera instancia, creé una VPC con dos subredes usando el módulo `terraform-google-modules/network` v10.0.0, conecté cada instancia a su subred y agregué la regla `tf-firewall` (TCP 80).
*   **Evidencia por tarea:**

| Tarea | Plan | Resultado |
|-------|------|-----------|
| 2 Importar | `plan-2.txt` | No changes |
| 3 Backend | `plan-3a.txt`, `plan-3.txt` | Bucket creado primero con estado local (1 to add); tras migrar el estado, No changes |
| 4 Modificar | `plan-4.txt` | 1 to add, 2 to change |
| 5 Destruir | `plan-5.txt` | 0 to add, 0 to change, 1 to destroy |
| 6 Módulo Registry | `plan-6a.txt`, `plan-6.txt` | [pega aquí el "Plan:" real de cada uno] |
| 7 Firewall | `plan-7.txt` | 1 to add |

*   **Qué me costó:**
    *   **Debian 11 frente a Debian 12.** Al migrar al provider `~> 6.0`, el plan proponía `3 to add, 0 to change, 2 to destroy`. El atributo `image` marcaba `forces replacement`: las instancias reales usaban `debian-12-bookworm-v20261102` y mi código decía `debian-cloud/debian-11`. No apliqué. Corregí la imagen y el plan bajó a `1 to add, 2 to change, 0 to destroy`. Ese plan original se sobrescribió, así que lo cito de la salida de terminal:
      `image = ".../debian-12-bookworm-v20261102" -> "debian-cloud/debian-11" # forces replacement`.
    *   **Provider.** Había dejado `~> 4.0` en vez de `~> 6.0` y lo corregí en la Tarea 3. `plan-2.txt` se generó con `~> 4.0` y `debian-11`, así que no corresponde exactamente a los `.tf` finales.
    *   **Variables del módulo.** El error `Reference to undeclared input variable` se debía a que los `variables.tf` de los módulos estaban vacíos.
    *   **Bloque duplicado.** Ejecuté dos veces un `cat >>` y quedó duplicada la tercera instancia. `validate` lo detectó antes de aplicar y borré la copia.
*   **Limitación conocida:** [si tus instancias no tienen `metadata_startup_script`, escríbelo aquí: el enunciado lo pedía, el plan daba No changes y no lo agregué para que los planes siguieran correspondiendo a los `.tf`.]
*   **Qué cambiaría:** Copiaría la imagen, el tipo de máquina y la red reales de cada instancia (`gcloud compute instances describe`) antes de escribir el recurso, y guardaría cada plan con nombre distinto en lugar de sobrescribirlo.

## Uso de IA

GSP233 y GSP497: Usé Gemini como apoyo consultivo para comprender la convivencia de los dos providers (google y kubernetes) en el primer lab, interpretar los logs del despliegue del clúster de GKE y entender el ciclo de creación y destrucción limpia (destroy) en Cloud Operations.   GSP345 (Challenge Lab): Usé Claude como asistente para: (1) guiarme paso a paso en el orden de las tareas sin pasos, (2) interpretar errores (variables no declaradas, el plan que forzaba recreación), y (3) revisar cada plan antes de aplicar. 
