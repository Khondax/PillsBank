import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewPillPage, PillPage } from "../pages";

import { Storage } from "@ionic/storage";

@Component({
    templateUrl: 'inventory.page.html',
    selector: 'inventory.page.scss'
})

export class InventoryPage {

    allData = [];

    constructor(public nav: NavController,
                private storage: Storage) {

    }

    ionViewDidLoad(){
        this.storage.forEach((value, key, index) => {
            this.allData[key.valueOf()] = value;
        });
    }

    newPill(){
        this.nav.push(NewPillPage);
    }

    goToPill($event, pill){
        this.nav.push(PillPage, pill);
    }

    //DEBUG
    delete(){
        this.storage.clear();
    }

}
