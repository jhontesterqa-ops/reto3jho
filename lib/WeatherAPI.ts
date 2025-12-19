import { APIRequestContext, APIResponse } from '@playwright/test';

export class WeatherAPI {
    readonly request: APIRequestContext;
    readonly apiKey: string;
    readonly baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        // Leemos las variables de entorno, si no existen lanzamos error
        this.apiKey = process.env.API_KEY || '';
        this.baseUrl = process.env.BASE_URL || '';
        
        if (!this.apiKey) throw new Error('API_KEY no definida en .env');
    }

    /**
     * Obtiene el clima por nombre de ciudad
     */
    async getWeatherByCity(city: string, mode: string = 'json'): Promise<APIResponse> {
        return await this.request.get(this.baseUrl, {
            params: {
                q: city,
                appid: this.apiKey,
                mode: mode // json o xml
            }
        });
    }

    /**
     * Obtiene el clima por coordenadas (Latitud y Longitud)
     */
    async getWeatherByCoordinates(lat: number, lon: number): Promise<APIResponse> {
        return await this.request.get(this.baseUrl, {
            params: {
                lat: lat,
                lon: lon,
                appid: this.apiKey
            }
        });
    }
}