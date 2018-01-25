import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FormBuilder } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Console } from '@angular/core/src/console';

@Component({
    templateUrl: 'newpill.page.html',
    selector: 'newpill.page.scss'
})

export class NewPillPage {

    pillForm: any;
    base64Image: any;

    data = [];

    constructor(public nav: NavController,
                private formBuilder: FormBuilder,
                private cam: Camera,
                private alertCtrl: AlertController,
                private storage: Storage) {

        this.pillForm = formBuilder.group({
            name: [''],
            pillBox: [''],
            price: ['']
        });

        this.storage.forEach((value, key, index) => {
            this.data[key.valueOf()] = value;
            console.log(this.data[key.valueOf()]);
        });

    }

    useCamera(){

        const options: CameraOptions = {
            quality: 40,
            destinationType: this.cam.DestinationType.DATA_URL,
            encodingType: this.cam.EncodingType.JPEG,
            mediaType: this.cam.MediaType.PICTURE
        }

        this.cam.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {

        });

    }

    pillCreated(){
        var bool = false;


        return bool;
    }

     addPill(){
        var bool;

         for (let index = 0; index < this.data.length; index++) {
            if (this.data[index].name === this.pillForm.value.name){
                bool = true;
                break;
            } else {
                bool = false;
            }
        }

        if (this.pillForm.value.name.length < 1){
            let alert = this.alertCtrl.create({
                message: "No has añadido el nombre",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
            
        } else if (bool === true){
            let alert = this.alertCtrl.create({
                message: "La pastilla ya está creada",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        
        } else if (this.pillForm.value.pillBox < 1){
            let alert = this.alertCtrl.create({
                message: "No has añadido el número de pastillas",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();

/*         } else if (this.base64Image.length < 10){
            let alert = this.alertCtrl.create({
                message: "No has añadido una imagen",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present(); */

        } else {
            var index;
            this.storage.length().then((val) => {
                index = val.valueOf();
                console.log(index);
                this.storage.set(index.toString(), {
                    "name": this.pillForm.value.name,
                    "numb": this.pillForm.value.pillBox,
                    "price": this.pillForm.value.price
                });
            });
            this.nav.pop();
        }

    }

}
