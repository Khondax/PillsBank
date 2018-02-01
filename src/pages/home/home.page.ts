import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

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
                private storage: Storage) {

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

    }

}
