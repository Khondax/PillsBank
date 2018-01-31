import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
    templateUrl: 'home.page.html',
    selector: 'home.page.scss'
})

export class HomePage {

    constructor(public nav: NavController,
                private platform: Platform,
                private localNotifications: LocalNotifications) {

    }

    ionViewDidLoad(){
        this.platform.ready().then(() => {
            this.localNotifications.hasPermission().then(function(granted){
                if(!granted){
                    this.localNotifications.registerPermission();
                }
            });
        });
    }

}
