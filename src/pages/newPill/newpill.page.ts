import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FormBuilder } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { Console } from '@angular/core/src/console';

@Component({
    templateUrl: 'newpill.page.html',
    selector: 'newpill.page.scss'
})

export class NewPillPage {

    pillForm: any;

    data = [];

    constructor(public nav: NavController,
                private formBuilder: FormBuilder,
                private alertCtrl: AlertController,
                private storage: Storage) {

        this.pillForm = formBuilder.group({
            name: [''],
            pillBox: [''],
            price: ['']
        });

        this.storage.forEach((value, key, index) => {
            this.data[key.valueOf()] = value;
            console.log(this.data[key.valueOf()]);
        });

    }

    pillCreated(){
        var bool = false;


        return bool;
    }

     addPill(){
        var bool;

         for (let index = 0; index < this.data.length; index++) {
            if (this.data[index].name === this.pillForm.value.name){
                bool = true;
                break;
            } else {
                bool = false;
            }
        }

        if (this.pillForm.value.name.length < 1){
            let alert = this.alertCtrl.create({
                message: "No has añadido el nombre",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
            
        } else if (bool === true){
            let alert = this.alertCtrl.create({
                message: "La pastilla ya está creada",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        
        } else if (this.pillForm.value.pillBox < 1){
            let alert = this.alertCtrl.create({
                message: "No has añadido el número de pastillas",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();

        } else {
            var index;
            this.storage.length().then((val) => {
                index = val.valueOf();
                console.log(index);
                this.storage.set(index.toString(), {
                    "key": index.toString(),                    //Clave del medicamento
                    "name": this.pillForm.value.name,           //Nombre
                    "price": this.pillForm.value.price,         //Precio
                    "numb": this.pillForm.value.pillBox,        //Número de pastillas
                    "dose": "Null",                             //Dosis ¿diaria/semanal/mensual?
                    "duration": "Null",                         //Duración estimada de las pastillas almacenadas
                    "alarmSet": false,                          //Alarma creada?
                    "alarmID" : "Null"                          //ID de la alarma
                });
            });
            this.nav.pop();
        }

    }

}
