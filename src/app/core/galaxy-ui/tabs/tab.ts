import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { GalaxyTabDirective } from './tab.directive';

@Component({
  selector: 'galaxy-tab',
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyTab {

  @Input() id: string;
  @Input() title: string;
  @Input() active: boolean;
  @Input() iconRef: TemplateRef<any>;

  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;
  @ContentChild(GalaxyTabDirective, { static: false, read: TemplateRef }) template: TemplateRef<void> | null = null;

  get content(): TemplateRef<any> {
    return this.template || this.contentTemplate;
  }

  constructor() { }

}
