import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  private latitude = 0;
  private longitude = 0;
  private distance = 0;
  private records = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private http: Http) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getRecords(this.distance);
    }).catch((error) => {
      console.log('Error getting location', error);
    });



  }
  getRecords(distance: number)
  {
    this.http.get("http://api.ansario.com/v1/m3c/all?longitude=" + this.longitude + "&latitude="+this.latitude + "&distance=" + distance)
      .map(res  =>  res.json())
      .subscribe( data => {
        this.records = data;
        }, err => {

      });
  }

  updateDistance(event)
  {
    this.getRecords(this.distance);
  }
}
