import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { GalaxySharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    GalaxySharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
