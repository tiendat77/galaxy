import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MagicButtonComponent } from './magic-button/magic-button.component';
import { TypeWritterComponent } from './type-writter/type-writter.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/effect/magic-button' },
  { path: 'magic-button', component: MagicButtonComponent },
  { path: 'type-writter', component: TypeWritterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EffectsRoutingModule { }
