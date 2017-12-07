import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BodyFormPage } from '../pages/body-form/body-form';
import {  MapPage } from "../pages/map/map";
import { IdentificationPage } from "../pages/identification/identification"
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login"
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../services/AuthenticationService";
import  { Camera } from "@ionic-native/camera";
import { HttpModule } from '@angular/http';
import { CoolLocalStorage, CoolSessionStorage } from "angular2-cool-storage";
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MapPage,
    BodyFormPage,
    ContactPage,
    IdentificationPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQQt9X9nVbPwGBEnT9_WOFgFkCcfullUg'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    BodyFormPage,
    ContactPage,
    IdentificationPage,
    HomePage,
    MapPage,
    TabsPage
  ],
  providers: [
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    Camera,
    CoolLocalStorage,
    CoolSessionStorage,
    AuthService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
