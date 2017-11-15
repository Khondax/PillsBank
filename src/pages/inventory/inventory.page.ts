import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewPillPage, PillPage } from "../pages";

import { Storage } from "@ionic/storage";

@Component({
    templateUrl: 'inventory.page.html',
    selector: 'inventory.page.scss'
})

export class InventoryPage {

    data = [];

    constructor(public nav: NavController,
                private storage: Storage) {

    }

    ionViewDidLoad(){
        this.storage.forEach((value, key, index) =>{
            this.data[index.valueOf()] = value;
        });
    }

    newPill(){
        this.nav.push(NewPillPage);
    }

    goToPill($event, key){
        this.nav.push(PillPage, key);
    }

    //DEBUG
    addPill(){
        this.storage.set('test', ["Para", "60", "5"]);
    }
    //DEBUG
    getPill(){
        this.storage.get('test').then((data) => {
            console.log(data);
        });
    }
    //DEBUG
    delete(){
        this.storage.clear();
    }

}
