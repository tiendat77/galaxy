import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MagicButtonComponent } from './magic-button/magic-button.component';
import { TypeWriterComponent } from './type-writer/type-writer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/effect/magic-button' },
  { path: 'magic-button', component: MagicButtonComponent },
  { path: 'type-writer', component: TypeWriterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EffectsRoutingModule { }
