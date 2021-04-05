import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SplashService {

  private subject$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  subscribe(state): Subscription {
    return this.subject$.subscribe(state);
  }

  set(state: boolean) {
    this.subject$.next(state);
  }

}
