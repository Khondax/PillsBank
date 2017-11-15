import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

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
                private storage: Storage) {

        this.storage.get(this.navParams.data).then((data) => {
            this.pill = data;
        });

    }


    goBack(){
        this.view.dismiss();
    }

}
