import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from "@angular/forms";

import { Camera, CameraOptions } from "@ionic-native/camera";
import {CoolLocalStorage} from "angular2-cool-storage";
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
  private options: CameraOptions = {
    quality:  100,
    destinationType:  this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private camera: Camera, private localStorage: CoolLocalStorage) {
    this.bodyForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      status: [''],
      longitude: [''],
      latitude:  [''],
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
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('idNumber'));
  }

  prefill()
  {
    this.bodyForm.patchValue({
      ['id']: this.navParams.get('idNumber'),
      ['title']: 'John Doe',
      ['status']: 'field',
      ['longitude']: '33',
      ['latitude']:  '33',
      ['description']: {
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
      ['associatedEvidence']: {
        clothing: 'Wearing red shirt.',
        footWear: 'No shoes.',
        eyeWear: 'Glasses',
        personalItems: 'Cellphone',
        identityDocuments: 'Drivers license'
      },
      ['pictures']: {
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
      updateJson[controlName] = base64Image;

      this.bodyForm.patchValue({['pictures'] : updateJson});
    }, (err) => {
      console.log(err);
    });
  }

  submitForm(value){
    let storageObject = this.localStorage.getObject('storage');
    storageObject['records'].push(value);
    this.localStorage.setObject('storage', storageObject);
  }

}
