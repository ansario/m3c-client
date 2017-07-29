import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BodyFormPage } from './body-form';

@NgModule({
  declarations: [
    BodyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BodyFormPage),
  ],
})
export class BodyFormPageModule {}
