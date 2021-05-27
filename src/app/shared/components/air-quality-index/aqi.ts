export const AQI_API_URL = 'https://api.airvisual.com/v2/nearest_city';
export const AQI_API_KEY = '7a56fc95-682e-44f0-8916-76b32400b3ae';

export interface IAQI {
  face: string;
  aqi: number;
  pm: number;
  city: string;
  time: string;
  level: string;
  description: string;
  temperature: number;
  humidity: number;
  wind: number;
}

export interface IAQI_MAP {
  [level: string]: {
    level: string;
    description: string;
    face: string;
    color: string;
    background: string;
    backgroundDark: string;
  }
};

export const AQI_MAP: IAQI_MAP = {
  'good': {
    level: 'good',
    description: 'Good',
    face: 'https://www.iqair.com/assets/aqi/ic-face-green.svg',
    color: '#607631',
    background: '#a8e05f',
    backgroundDark: '#87c13c'
  },
  'moderate': {
    level: 'moderate',
    description: 'Moderate',
    face: 'https://www.iqair.com/assets/aqi/ic-face-yellow.svg',
    color: '#8c6c1d',
    background: '#fdd64b',
    backgroundDark: '#efbe1d'
  },
  'lite_unhealthy': {
    level: 'lite_unhealthy',
    description: 'Unhealthy for Sensitive Groups',
    face: 'https://www.iqair.com/assets/aqi/ic-face-orange.svg',
    color: '#974a20',
    background: '#ff9b57',
    backgroundDark: '#f27e2f'
  },
  'unhealthy': {
    level: 'unhealthy',
    description: 'Unhealthy',
    face: 'https://www.iqair.com/assets/aqi/ic-face-red.svg',
    color: '#942431',
    background: '#fe6a69',
    backgroundDark: '#e84b50'
  },
  'very_unhealthy': {
    level: 'very_unhealthy',
    description: 'Hazardous',
    face: 'https://www.iqair.com/assets/aqi/ic-face-maroon.svg',
    color: '#573344',
    background: '#a87383',
    backgroundDark: '#915c6c'
  },
};

export const MOCK = {
  status: 'success',
  data: {
    city: 'Mukdahan',
    state: 'Mukdahan',
    country: 'Thailand',
    location: {
      type: 'Point',
      coordinates: [
        104.72351,
        16.54531
      ]
    },
    current: {
      weather: {
        ts: '2021-05-27T12:00:00.000Z',
        tp: 30,
        pr: 1005,
        hu: 66,
        ws: 1.03,
        wd: 40,
        ic: '03n'
      },
      pollution: {
        ts: '2021-05-27T13:00:00.000Z',
        aqius: 41,
        mainus: 'p2',
        aqicn: 14,
        maincn: 'p2'
      }
    }
  }
};