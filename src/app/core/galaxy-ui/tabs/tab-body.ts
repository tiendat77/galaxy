import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[galaxy-tab-body]',
  template: `
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyTabBody {

  @Input() content: TemplateRef<void> | null = null;

  constructor() { }

}
