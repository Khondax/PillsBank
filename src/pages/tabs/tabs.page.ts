import { Component } from '@angular/core';

import { HomePage, InventoryPage } from "../pages";


@Component({
    templateUrl: 'tabs.page.html',
    selector: 'tabs.page.scss'
})

export class TabsPage {

    tab1Root = HomePage;
    tab2Root = InventoryPage;
    //tab3Root = ContactPage;

    constructor() {

    }
}
