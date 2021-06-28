import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';

import { GalaxyUI, GALAXY_UI } from './galaxy-ui-modules';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyComponent implements OnInit, OnDestroy {

  public module$: BehaviorSubject<GalaxyUI>;

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
    this.module$ = new BehaviorSubject(null);
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

    const module = GALAXY_UI.find(g => g.id === params.id);

    if (!module) {
      return;
    }

    this.module$.next(module);
  }

}
