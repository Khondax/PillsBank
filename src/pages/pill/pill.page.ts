import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Storage } from "@ionic/storage";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DatePicker } from "@ionic-native/date-picker";

@Component({
    templateUrl: 'pill.page.html',
    selector: 'pill.page.scss'
})
export class PillPage {

    pill: any = [];

    constructor(public nav: NavController,
                private view: ViewController,
                private navParams: NavParams,
                private storage: Storage,
                private alertController: AlertController,
                private toastController: ToastController,
                private localNotifications: LocalNotifications,
                private datePicker: DatePicker) {

    }

    ionViewDidEnter(){
        this.pill = this.navParams.data;
    }

    newAlarm(){     
         this.datePicker.show({
            date: new Date(),
            mode: 'datetime',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => {

                let prompt = this.alertController.create({
                    title: 'Frecuencia del medicamento',
                    message: 'Selecciona la frecuencia de la dosis (única, diaria, semanal o mensual)',
                    inputs: [
                        {
                            type: 'radio',
                            label: 'Única',
                            value: '0',
                            checked: true
                        },
                        {
                            type: 'radio',
                            label: 'Diaria',
                            value: 'day',
                        },
                        {
                            type: 'radio',
                            label: 'Semanal',
                            value: 'week'
                        },
                        {
                            type: 'radio',
                            label: 'Mensual',
                            value: 'month'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Cancelar'
                        },
                        {
                            text: 'Añadir',
                            handler: frequency => {
                                this.localNotifications.schedule({
                                    id: parseInt(this.pill.key),
                                    text: 'Recuerda tomar ' + this.pill.dose + ' pastillas de ' + this.pill.name,
                                    at: date,
                                    every: frequency
                                });
                
                                if (this.localNotifications.isScheduled(parseInt(this.pill.key))){
                                    this.storage.set(this.pill.key, {
                                        "key": this.pill.key,
                                        "name": this.pill.name,
                                        "price": this.pill.price,
                                        "numb": this.pill.numb,
                                        "dose": this.pill.dose,
                                        "duration":  this.pill.duration,
                                        "alarmSet": true,
                                        "alarmDate" : date
                                    });

                                    let toast = this.toastController.create({
                                        message: "Alarma creada",
                                        duration: 4000,
                                        position: 'bottom'
                                    });
                            
                                    toast.present();
                                }
                            }
                        }
                    ]
                });
        
                prompt.present();
            },
            
            err => console.log('Error detectado: ', err)
        );
    }


    removeAlarm(){

        this.localNotifications.clear(parseInt(this.pill.key));

        this.storage.set(this.pill.key, {
            "key": this.pill.key,
            "name": this.pill.name,
            "price": this.pill.price,
            "numb": this.pill.numb,
            "dose": this.pill.dose,
            "duration":  this.pill.duration,
            "alarmSet": false,
            "alarmDate" : "Null"
        });

        let toast = this.toastController.create({
            message: "Se ha eliminado la alarma",
            duration: 4000,
            position: 'bottom'
        });

        toast.present();
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
                            "price": this.pill.price,
                            "numb": nPills,
                            "dose": this.pill.dose,
                            "duration":  (nPills/this.pill.dose),
                            "alarmSet": this.pill.alarmSet,
                            "alarmDate" : this.pill.alarmDate
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

    addDose(){
        let prompt = this.alertController.create({
            title: 'Añadir dosis',
            inputs: [{
                type: 'number',
                name: 'dosis',
            }],
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Añadir',
                    handler: data => {

                        this.storage.set(this.pill.key, {
                            "key": this.pill.key,
                            "name": this.pill.name,
                            "price": this.pill.price,
                            "numb": this.pill.numb,
                            "dose": data.dosis,
                            "duration":  (this.pill.numb/data.dosis),
                            "alarmSet": this.pill.alarmSet,
                            "alarmDate" : this.pill.alarmDate
                        });


                        let toast = this.toastController.create({
                            message: "Cambio registrado",
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
