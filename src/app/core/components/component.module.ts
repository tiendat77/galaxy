import { NgModule } from '@angular/core';
import { GalaxyUIModule } from '../galaxy-ui/galaxy-ui.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SplashScreenComponent
];

@NgModule({
  imports: [GalaxyUIModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS, FooterComponent],
})
export class ComponentModule { }
