import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewPillPage, PillPage } from "../pages";

import _ from 'lodash';
import { Storage } from "@ionic/storage";

@Component({
    templateUrl: 'inventory.page.html',
    selector: 'inventory.page.scss'
})

export class InventoryPage {

    allData = [];
    allPills = [];
    queryText: string = "";

    constructor(public nav: NavController,
                private storage: Storage) {

    }

    ionViewDidEnter(){
        this.storage.forEach((value, key, index) => {
            this.allData[key.valueOf()] = value;
        });

        this.allPills = this.allData;
    }

    newPill(){
        this.nav.push(NewPillPage);
    }

    goToPill($event, pill){
        this.nav.push(PillPage, pill);
    }

    search(){
        let queryTextLower = this.queryText.toLowerCase();

        let pills = _.filter(this.allData, or => (<any>or).name.toLowerCase().includes(queryTextLower));

        this.allPills = pills;
    }

    //DEBUG
    delete(){
        this.storage.clear();
    }

}
