import { ChangeDetectionStrategy, Component, Input, HostListener } from '@angular/core';
import { GalaxySidenav } from './sidenav';

@Component({
  selector: '[galaxy-sidenav-toggle]',
  template: '<ng-content></ng-content>',
  styleUrls: ['sidenav-toggle.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxySidenavToggle {

  @Input('galaxyTriggerFor') private sidenav : GalaxySidenav;

  @HostListener('click', ['$event'])
  open(e) {
    this.sidenav?.open();
  }

  constructor() { }

}
