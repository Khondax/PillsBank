import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage, TabsPage, InventoryPage, NewPillPage, PillPage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from "@ionic/storage";
import { Camera } from "@ionic-native/camera";

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        HomePage,
        InventoryPage,
        NewPillPage,
        PillPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        HomePage,
        InventoryPage,
        NewPillPage,
        PillPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
