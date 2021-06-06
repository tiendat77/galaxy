import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { RequestService } from '@app/shared/services/request.service';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

export type CovidState = 'confirmed' | 'recovered' | 'deaths';

@Component({
  selector: 'app-covid-tracker',
  templateUrl: './covid-tracker.component.html',
  styleUrls: ['./covid-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidTrackerComponent implements OnChanges, OnInit {

  @Input() state: CovidState;
  deaths: string;
  confirmed: string;
  recovered: string;
  country: string;

  private apiUrl = 'https://covid19.mathdro.id/api';

  constructor(
    private request: RequestService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnChanges() {
  }

  ngOnInit() {
    this.getWorldDetailStatus().then((status: any) => {
      if (!status) {
        return;
      }

      this.confirmed = status.confirmed;
      this.recovered = status.recovered;
      this.deaths = status.deaths;
      this.cdr.detectChanges();
    });
  }

  private getWorldDetailStatus() {
    return this.request.get(this.apiUrl).pipe(
      map((res: any) => {
        const deaths = res?.deaths?.value || 0;
        const confirmed = res?.confirmed.value || 0;
        const recovered = res?.recovered.value || 0;

        return {
          confirmed: Number(confirmed).toLocaleString(),
          recovered: Number(recovered).toLocaleString(),
          deaths: Number(deaths).toLocaleString(),
        };
      }),
      catchError((error) => {
        console.error(error);
        return of();
      })
    ).toPromise();
  }

}
