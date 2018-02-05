import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';

import { PillPage } from "../pages";

import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from "@ionic/storage";

@Component({
    templateUrl: 'home.page.html',
    selector: 'home.page.scss'
})

export class HomePage {

    pills: any[];

    constructor(public nav: NavController,
                private platform: Platform,
                private localNotifications: LocalNotifications,
                private storage: Storage,
                private toastController: ToastController) {

    }

    ionViewDidEnter(){
        this.platform.ready().then(() => {
            this.localNotifications.hasPermission().then(function(granted){
                if(!granted){
                    this.localNotifications.registerPermission();
                }
            });
        });

        this.localNotifications.getAllScheduled().then((notifications) => {
            this.pills = notifications;
        });
        
    }

    goToPill($event, alarm){
        var pill = [];
        this.storage.get(alarm.id).then(
            data => {
                pill = data
                this.nav.push(PillPage, pill);
            } 
        );

    }

    cancelAlarm(alarm){
        this.localNotifications.cancel(alarm.id);
        
        this.storage.get(alarm.id).then(
            data => {
                this.storage.set(alarm.id, {
                    "key": data.key,
                    "name": data.name,
                    "price": data.price,
                    "numb": data.numb,
                    "dose": data.dose,
                    "duration":  data.duration,
                    "alarmSet": false,
                    "alarmDate" : "Null"
                });

                let toast = this.toastController.create({
                    message: "Se ha eliminado la alarma",
                    duration: 4000,
                    position: 'bottom'
                });
        
                toast.present();
                
                this.ionViewDidEnter();
            }
        );

    }

}
