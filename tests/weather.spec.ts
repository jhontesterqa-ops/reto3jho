import { test, expect } from '@playwright/test';
import { WeatherAPI } from '../lib/WeatherAPI';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

test.describe('OpenWeatherMap API Testing Challenge', () => {
    let api: WeatherAPI;

    test.beforeEach(async ({ request }) => {
        api = new WeatherAPI(request);
    });

    test('Obtener clima consultando por nombre de ciudad (Londres)', async () => {
        let response: any;
        const city = 'London';

        await test.step(`DADO que tengo una ciudad válida "${city}"`, async () => {
            // Preparación implícita en beforeEach
        });

        await test.step(`CUANDO consulto el clima por nombre`, async () => {
            response = await api.getWeatherByCity(city);
        });

        await test.step(`ENTONCES debería recibir un código de estado 200`, async () => {
            expect(response.status()).toBe(200);
        });

        await test.step(`Y la respuesta debe contener el nombre de la ciudad "${city}"`, async () => {
            const data = await response.json();
            expect(data.name).toBe(city);
            expect(data.sys.country).toBe('GB');
        });
    });

    test('Obtener clima consultando por Latitud y Longitud', async () => {
        let response: any;
        const lat = 40.7128; // New York
        const lon = -74.0060;

        await test.step(`DADO que tengo coordenadas lat: ${lat}, lon: ${lon}`, async () => {
           // Datos listos
        });

        await test.step(`CUANDO consulto el clima por coordenadas`, async () => {
            response = await api.getWeatherByCoordinates(lat, lon);
        });

        await test.step(`ENTONCES debería recibir un código de estado 200`, async () => {
            expect(response.status()).toBe(200);
        });

        await test.step(`Y la respuesta debe corresponder a una ubicación cercana`, async () => {
            const data = await response.json();
            expect(data.coord.lat).toBeCloseTo(lat, 1);
            expect(data.coord.lon).toBeCloseTo(lon, 1);
        });
    });

    test('Obtener la información del clima en formato JSON', async () => {
        let response: any;

        await test.step(`CUANDO solicito el clima explícitamente en formato JSON`, async () => {
            response = await api.getWeatherByCity('Madrid', 'json');
        });

        await test.step(`ENTONCES la cabecera Content-Type debe ser application/json`, async () => {
            expect(response.headers()['content-type']).toContain('application/json');
        });

        await test.step(`Y el cuerpo de la respuesta debe ser un JSON válido`, async () => {
            const data = await response.json();
            expect(data).toHaveProperty('weather');
            expect(data).toHaveProperty('main');
        });
    });

    test('Obtener la información del clima en formato XML', async () => {
        let response: any;

        await test.step(`CUANDO solicito el clima explícitamente en formato XML`, async () => {
            response = await api.getWeatherByCity('Paris', 'xml');
        });

        await test.step(`ENTONCES debería recibir un código de estado 200`, async () => {
            expect(response.status()).toBe(200);
        });

        await test.step(`Y la cabecera Content-Type debe ser application/xml`, async () => {
            expect(response.headers()['content-type']).toContain('application/xml');
        });

        await test.step(`Y el cuerpo de la respuesta debe contener tags XML`, async () => {
            const text = await response.text();
            expect(text).toContain('<current>');
           expect(text).toMatch(/<city.*name="Paris"/);
        });
    });
});