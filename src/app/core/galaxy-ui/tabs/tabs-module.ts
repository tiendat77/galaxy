import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaxyTabs } from './tabs';
import { GalaxyTabBody } from './tab-body';
import { GalaxyTab } from './tab';

import { GalaxyTabDirective } from './tab.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    GalaxyTabs,
    GalaxyTab,
    GalaxyTabBody,
    GalaxyTabDirective
  ],
  declarations: [
    GalaxyTabs,
    GalaxyTab,
    GalaxyTabBody,
    GalaxyTabDirective
  ],
})
export class GalaxyTabsModule {}
