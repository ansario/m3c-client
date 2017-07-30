import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from "@angular/forms"
/**
 * Generated class for the BodyFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-body-form',
  templateUrl: 'body-form.html',
})
export class BodyFormPage {

  private bodyForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.bodyForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('idNumber'));
  }

}
