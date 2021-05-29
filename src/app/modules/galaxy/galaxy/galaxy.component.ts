import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyComponent implements OnInit, OnDestroy {

  public module$: BehaviorSubject<string>;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initialize();
    this.subscribeUrlParam();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initialize() {
    this.module$ = new BehaviorSubject('');
    this.subscription = new Subscription();
  }

  private subscribeUrlParam() {
    const sub = this.route.params.subscribe(params => {
      this.handleUrlParamChange(params);
    });
    this.subscription.add(sub);
  }

  private handleUrlParamChange(params) {
    if (!params || !params.id) {
      return this.router.navigate(['/galaxy']);
    }

    this.module$.next(params.id);
  }

}
