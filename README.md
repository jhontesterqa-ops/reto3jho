# 🌤️ OpenWeatherMap API Automation 

Este proyecto contiene una suite de pruebas automatizadas para la API de [OpenWeatherMap](https://openweathermap.org/current).

El objetivo es validar endpoints críticos de clima en tiempo real, asegurando la integridad de datos JSON/XML y códigos de respuesta, bajo una arquitectura escalable.

## 🚀 Stack Tecnológico

* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estático para mayor robustez).
* **Framework:** [Playwright Test](https://playwright.dev/) (Rápido, confiable y con soporte nativo para APIs).
* **Patrón de Diseño:** **API Object Model** (Variación del Page Object Model para APIs) para encapsular la lógica de negocio.
* **Estilo de Pruebas:** **BDD/Gherkin** (Implementado vía `test.step` para legibilidad de negocio).
* **Entorno:** Variables gestionadas con `dotenv`.
* **CI/CD:** Configuración lista para integración continua (GitHub Actions).

## 📋 Funcionalidades Probadas

Se cubren los siguientes escenarios de prueba:
1.  ✅ Consultar clima por **Nombre de Ciudad** (e.g., London).
2.  ✅ Consultar clima por **Coordenadas Geográficas** (Latitud/Longitud).
3.  ✅ Validación de formato de respuesta **JSON**.
4.  ✅ Validación de formato de respuesta **XML** (Manejo de tags dinámicos).

## ⚙️ Pre-requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (v16 o superior recomendado).
* [NPM](https://www.npmjs.com/) (Viene instalado con Node).
* Una **API Key** válida de OpenWeatherMap.

## 📦 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en local:

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd weather-automation-challenge
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    * Crea un archivo llamado `.env` en la raíz del proyecto.
    * Copia el siguiente contenido y reemplaza `TU_API_KEY_REAL` con tu llave:

    ```env
    API_KEY=14ce84145c77b0b6e82fcfd7dd22747e
    BASE_URL=[https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)
    ```

    > **Nota:** El archivo `.env` está ignorado por git por seguridad. Debes crearlo manualmente.

## ▶️ Ejecución de Pruebas

### Ejecutar todos los tests (Headless)
```bash
npx playwright test


Nota: Por buenas practicas no subimos los resultados al repositorio pero aqui excepcionalmente se subieron para mostrar evidencia de la ejecucion correcta.