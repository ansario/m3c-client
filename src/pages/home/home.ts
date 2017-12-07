import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IdentificationPage } from "../identification/identification"
import {BarcodeScanner} from "@ionic-native/barcode-scanner"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private idNumber;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

  }

  scanCode()
  {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.idNumber = barcodeData;
    }, (err) => {
      // An error occurred
    });
  }

  newRecord(event)
  {
    this.navCtrl.push(IdentificationPage);
  }
}
