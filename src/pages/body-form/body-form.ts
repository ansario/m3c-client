import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray} from "@angular/forms";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {CoolLocalStorage, CoolSessionStorage} from "angular2-cool-storage";
import  { HomePage } from "../home/home";
import { Geolocation } from '@ionic-native/geolocation';

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
  private longitude = 0;
  private latitude = 0;
  private options: CameraOptions = {
    destinationType:  this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    quality: 50,
    targetWidth: 800,
    targetHeight: 600,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              private camera: Camera, private localStorage: CoolLocalStorage, private sessionStorage: CoolSessionStorage,
              private http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
              private geolocation: Geolocation) {

    this.bodyForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      status: [''],
      location: this.formBuilder.group( {
        type: "Point",
        coordinates: this.formBuilder.array([this.formBuilder.control('0'),this.formBuilder.control('0')])
      }),
      description: this.formBuilder.group( {
        bodyCondition: [''],
        generalCondition: [''],
        apparentSex: [''],
        ageGroup: [''],
        height: [''],
        weight: [''],
        eyeColor: [''],
        headHairColor: [''],
        headHairLength: [''],
        facialHair: [''],
        race: ['']
      }),
      associatedEvidence: this.formBuilder.group( {
        clothing: [''],
        footWear: [''],
        eyeWear: [''],
        personalItems: [''],
        identityDocuments:  ['']
      }),
      pictures: this.formBuilder.group({
        fullLength: [''],
        upperHalf:  [''],
        lowerHalf: [''],
        frontViewOfHead:  [''],
        elevatedView: [''],
        uniqueFeatures:  [''],
        personalEffects:  ['']
      })
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('idNumber'));
  }

  prefill()
  {
    this.bodyForm.patchValue({
      id: this.navParams.get('idNumber'),
      title: 'John Doe',
      status: 'field',
      description: {
        bodyCondition: 'completeBody',
        generalCondition:'partionallySkeletonized',
        apparentSex: 'male',
        ageGroup: 'infant',
        height: 'tall',
        weight: 'fat',
        eyeColor: 'brown',
        headHairColor: 'brown',
        headHairLength: 'short',
        facialHair: 'none',
        race: 'white',
      },
      associatedEvidence: {
        clothing: 'Wearing red shirt.',
        footWear: 'No shoes.',
        eyeWear: 'Glasses',
        personalItems: 'Cellphone',
        identityDocuments: 'Drivers license'
      },
      pictures: {
        fullLength: 'http://lorempixel.com/200/200/',
        upperHalf: 'http://lorempixel.com/200/200/',
        lowerHalf: 'http://lorempixel.com/200/200/',
        frontViewOfHead: 'http://lorempixel.com/200/200/',
        elevatedView: 'http://lorempixel.com/200/200/',
        uniqueFeatures: 'http://lorempixel.com/200/200/',
        personalEffects: 'http://lorempixel.com/200/200/'
      }
    });
  }

  takePicture(controlName: string)
  {
    let updateJson = {};

    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let cameraImageSelector = document.getElementById(controlName);
      cameraImageSelector.setAttribute('src', base64Image);
      updateJson[controlName] = base64Image;

      this.bodyForm.patchValue({['pictures'] : updateJson});
     }, (err) => {
       console.log(err);
    });
  }

  submitForm(value){

    value.location = {
      type: "Point",
      coordinates: [this.longitude, this.latitude]
    }

    console.log(value);
    let loading = this.loadingCtrl.create();
    loading.present();

    let storageObject = this.localStorage.getObject('storage');
    storageObject['records'].push(value);

    this.localStorage.setObject('storage', storageObject);
    let headers = new Headers({'Authorization': 'Bearer ' + this.sessionStorage.getObject('token')});


    let options = new RequestOptions({headers: headers});

    this.http.post("http://api.ansario.com/v1/m3c/new", value, options)
        .map(res => res.json())
        .subscribe(data =>  {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Record uploaded.',
            duration: 3000,
            position: 'top'
          });

          toast.present();
          this.navCtrl.push(HomePage);
         }, err =>  {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Error uploading record. Please try again.',
            duration: 3000,
            position: 'top'
          });

          toast.present();
        });

  }

}
