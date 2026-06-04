# 📊 Pagos Dashboard — Reto Supabase + Vercel

---

## 🛠️ Stack Tecnológico

* **Frontend:** NextJS + TypeScript
* **Estilos:** Tailwind CSS (Theme Dark)
* **Backend de Datos:** Supabase SDK

---

## 💡 Decisiones de Arquitectura & Optimización (Readiness para Producción)

### 1. Client-Side Aggregation (Una Sola Consulta General)

Inicialmente, se podría pensar en realizar múltiples queries para calcular cada indicador (`completed`, `refunded`, etc.). Sin embargo, para esta escala, opté por **unificar todo en una única consulta general**. Esto hace que se evite enviar de más peticiones innecesarias a Supabase, sin embargo, cuando escale, hacer esto puede colapsar la app y sus recursos, por lo que sí podría necesitar dividir consultas y agregar paginación.

### 2. Internacionalización Dinámica (Sin Hardcodeo)

Para cumplir con el requerimiento de flexibilidad monetaria, se implementó el uso nativo de **`Intl.NumberFormat`**. El formateador lee dinámicamente la divisa de los registros devueltos por la base de datos (en este caso, detecta `COP`), adaptando los separadores de miles, decimales y símbolos de forma automática. Si la base de datos cambia a registros en `USD` o `EUR`, el sistema se adapta sin modificar una sola línea de código.

---

## ✨ Característica Extra Incluida (Iniciativa)

Como propuesta de valor adicional orientada al uso del negocio, implementé:

* **[Exportación de tabla en CSV:]** *Un botón de exportación a CSV para descargar los datos limpios de la tabla directamente al computador.*

---

## 💻 Instalación y Ejecución Local

Si deseas ejecutar este proyecto en tu entorno local:

1. Clona el repositorio

2. Asegúrate de tener las variables de entorno configuradas en un archivo .env en la raíz del projecto

3. Instalar dependencias con pnpm install

4. Correr con el comando:

```bash
  pnpm run dev
```
