import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BodyFormPage } from "../body-form/body-form"
import {BarcodeScanner} from "@ionic-native/barcode-scanner"

/**
 * Generated class for the IdentificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identification',
  templateUrl: 'identification.html',
})
export class IdentificationPage {

  idNumber: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentificationPage');
  }

  scanCode()
  {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.idNumber = barcodeData.text;
    }, (err) => {
      // An error occurred
    });
  }

  createRecord(event) {
    this.navCtrl.push(BodyFormPage, {'idNumber': this.idNumber})
  }
}
