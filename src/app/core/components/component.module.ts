import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GalaxyUIModule } from '../galaxy-ui/galaxy-ui.module';

/** Components */
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SplashScreenComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GalaxyUIModule
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS, FooterComponent],
})
export class ComponentModule { }
