import { Component, AfterViewInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { BehaviorSubject, of } from 'rxjs';

import { IAQI, AQI_MAP, AQI_API_URL, AQI_API_KEY } from './aqi';
import { map, catchError } from 'rxjs/operators';
import * as momnet from 'moment';

@Component({
  selector: 'app-air-quality-index',
  templateUrl: './air-quality-index.component.html',
  styleUrls: ['./air-quality-index.component.scss']
})
export class AirQualityIndexComponent implements AfterViewInit {

  current$ = new BehaviorSubject(null);

  constructor(private request: RequestService) { }

  ngAfterViewInit() {
    this.getAQI();
  }

  private getAQI() {
    this.current$.next(null);

    return this.request.get(`${AQI_API_URL}?key=${AQI_API_KEY}`).pipe(
      map((res: any) => {
        const data = res && res.data ? res.data : null;

        // request fail
        if (!data) {
          return;
        }

        const weather = data.current?.weather;
        const pollution = data.current?.pollution;

        if (!weather || !pollution) {
          return;
        }

        const aqi = pollution.aqius || 0;
        const pm = this.aqi2pm(aqi);
        const level = this.getLevel(aqi);
        const wind = (weather.ws || 0) * 3.6; // m/s to km/h

        const cityData: IAQI = {
          aqi,
          pm,
          city: data.city || '',
          time: momnet(pollution.ts).format('HH:mm DD/MM'),
          temperature: weather.tp || 0,
          humidity: weather.hu || 0,
          wind: (Math.round(wind * 10) / 10),
          description: level.description,
          face: level.face,
          level: level.level
        }

        this.current$.next(cityData);
        return cityData;
      }),
      catchError((error: any) => {
        return of();
      })
    ).toPromise();
  }

  private aqi2pm(aqi: number) {
    function InvLinear(AQIhigh, AQIlow, Conchigh, Conclow, a) {
      var AQIhigh;
      var AQIlow;
      var Conchigh;
      var Conclow;
      var a;
      var c;
      c = ((a - AQIlow) / (AQIhigh - AQIlow)) * (Conchigh - Conclow) + Conclow;
      return c;
    }

    function ConcPM25(a) {
      if (a >= 0 && a <= 50) {
        return InvLinear(50, 0, 12, 0, a);
      }
      else if (a > 50 && a <= 100) {
        return InvLinear(100, 51, 35.4, 12.1, a);
      }
      else if (a > 100 && a <= 150) {
        return InvLinear(150, 101, 55.4, 35.5, a);
      }
      else if (a > 150 && a <= 200) {
        return InvLinear(200, 151, 150.4, 55.5, a);
      }
      else if (a > 200 && a <= 300) {
        return InvLinear(300, 201, 250.4, 150.5, a);
      }
      else if (a > 300 && a <= 400) {
        return InvLinear(400, 301, 350.4, 250.5, a);
      }
      else if (a > 400 && a <= 500) {
        return InvLinear(500, 401, 500.4, 350.5, a);
      }
      else {
        return 0;
      }
    }

    // out of range
    if (aqi < 0 || aqi > 500) {
      return 0;
    }

    return Math.floor(10 * ConcPM25(aqi)) / 10
  }

  private getLevel(aqi: number) {
    let level;

    switch(true) {
      case (aqi < 51): {
        level = 'good';
        break;
      }
      case (aqi < 101): {
        level = 'moderate';
        break;
      }
      case (aqi < 151): {
        level = 'light_unhealthy';
        break;
      }
      case (aqi < 201): {
        level = 'unhealthy';
        break;
      }
      case (aqi > 200): {
        level = 'very_unhealthy';
        break;
      }
      default: {
        level = 'good';
      }
    }

    return AQI_MAP[level];
  }

}
