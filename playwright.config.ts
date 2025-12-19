import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export default defineConfig({
  testDir: './tests',
  /* Ejecutar tests en archivos en paralelo */
  fullyParallel: true,
  /* Fallar si hay test.only en CI */
  forbidOnly: !!process.env.CI,
  /* Reintentar en CI solamente */
  retries: process.env.CI ? 2 : 0,
  /* Optar por no usar workers paralelos en CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Configuración de Reportes (Lo que pide el reto) */
  reporter: [
    ['html', { open: 'never' }], 
    ['json', { outputFile: 'test-results/report.json' }], 
    ['junit', { outputFile: 'test-results/results.xml' }] 
  ],

  use: {
    /* Recolectar traza cuando falla el test */
    trace: 'on-first-retry',
  },

  /* Configuración de proyectos (Navegadores) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});