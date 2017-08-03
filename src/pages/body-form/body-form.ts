import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from "@angular/forms";

import { Camera, CameraOptions } from "@ionic-native/camera";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private camera: Camera) {
    this.bodyForm = this.formBuilder.group({
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

  takePicture(controlName: string)
  {
    let updateJson = {};
    updateJson[controlName] = "http://lorempixel.com/200/200/";
    this.bodyForm.patchValue({['pictures'] : updateJson});
    // this.camera.getPicture(this.options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   console.log(base64Image);
    // }, (err) => {
    //   // Handle error
    //   console.log(err);
    // });
  }

  submitForm(value){
    console.log(value);
  }

}
