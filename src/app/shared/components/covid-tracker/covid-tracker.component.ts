import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '@app/shared/services/request.service';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { COUNTRIES } from './countries';
import { CountUp } from 'countup.js';

export type CovidState = 'confirmed' | 'recovered' | 'deaths';
export interface CovidStatus {
  region: string;
  deaths: number;
  confirmed: number;
  recovered: number;
  lastUpdate?: string;
}

@Component({
  selector: 'app-covid-tracker',
  templateUrl: './covid-tracker.component.html',
  styleUrls: ['./covid-tracker.component.scss']
})
export class CovidTrackerComponent implements OnInit {

  @Input() country: string;

  @ViewChild('confirmedRef') confirmedRef: ElementRef;
  @ViewChild('recoveredRef') recoveredRef: ElementRef;
  @ViewChild('deathsRef') deathsRef: ElementRef;

  public covidStatus$: BehaviorSubject<CovidStatus> = new BehaviorSubject(null);

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.reload();
  }

  private reload() {
    this.getCovidStatus(this.country).then((status) => {
      if (!status) {
        return;
      }

      this.covidStatus$.next(status);
      this.counter(status);
    });
  }

  private counter(status) {
    setTimeout(() => {
      const counters = [
        {element: this.confirmedRef?.nativeElement, value: status.confirmed},
        {element: this.recoveredRef?.nativeElement, value: status.recovered},
        {element: this.deathsRef?.nativeElement, value: status.deaths}
      ];

      counters.forEach((counter) => {
        const count = new CountUp(counter.element, counter.value);

        if (count && !count.error) {
          count.start();
        }
      });
    }, 250);
  }

  private getCovidStatus(countryCode?: string): Promise<CovidStatus> {
    let api = 'https://covid19.mathdro.id/api';
    let region = 'Worldwide';

    if (countryCode) {
      api += '/countries/' + countryCode;
      region = this.getCountryName(countryCode);
    }

    return this.request.get(api).pipe(
      map((res: any) => {
        const deaths: number = res?.deaths?.value;
        const confirmed: number = res?.confirmed.value;
        const recovered: number = res?.recovered.value;
        const lastUpdate = new Date(res?.lastUpdate);

        const status: CovidStatus = {
          region: region || 'Worldwide',
          confirmed: confirmed || 0,
          recovered: recovered || 0,
          deaths: deaths || 0,
          lastUpdate: lastUpdate.toString().slice(0, 24)
        };

        return status;
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    ).toPromise();
  }

  private getCountryName(code: string) {
    return COUNTRIES.find(c => c.iso2 === code)?.name || '';
  }

}
