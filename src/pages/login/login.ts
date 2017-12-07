import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from "../../services/AuthenticationService";
import {CoolSessionStorage} from "angular2-cool-storage";
import { TabsPage } from "../tabs/tabs";
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginCredentials = { username: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService:AuthService,  private sessionStorage: CoolSessionStorage, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.authService.login(this.loginCredentials)
      .map(res => res.json())
      .subscribe(data => {
        sessionStorage.setItem('token',JSON.stringify(data));
        loading.dismiss();
        this.navCtrl.push(TabsPage);
      }, err => {
        loading.dismiss();

        let toast = this.toastCtrl.create({
          message: 'Username or password incorrect.',
          duration: 3000,
          position: 'top'
        });

        toast.present();
      });
  }

}
