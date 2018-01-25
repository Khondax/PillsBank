import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Storage } from "@ionic/storage";

@Component({
    templateUrl: 'pill.page.html',
    selector: 'pill.page.scss'
})
export class PillPage {

    pill: any;

    constructor(public nav: NavController,
                private view: ViewController,
                private navParams: NavParams,
                private storage: Storage,
                private alertController: AlertController,
                private toastController: ToastController) {

        this.pill = this.navParams.data;

    }

     addPills(){
        let prompt = this.alertController.create({
            title: 'Añadir pastillas',
            inputs: [{
                type: 'number',
                name: 'pastillas',
            }],
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Añadir',
                    handler: data => {
                        
                        var nPills = parseInt(this.pill.numb) + parseInt(data.pastillas);

                        this.storage.set(this.pill.key, {
                            "key": this.pill.key,
                            "name": this.pill.name,
                            "numb": nPills,
                            "price": this.pill.price,
                            "dose": this.pill.dose,
                            "duration": this.pill.duration
                        });


                        let toast = this.toastController.create({
                            message: "Se ha registrado el cambio, quedan " + nPills/this.pill.dose + " dias hasta que termine el suministro",
                            duration: 4000,
                            position: 'bottom'
                        });

                        toast.present();
                    }
                }
            ]
        });
        prompt.present();
    }

    goBack(){
        this.view.dismiss();
    }

}
