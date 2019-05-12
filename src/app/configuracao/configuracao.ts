import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { restaurantIndex, restaurantSchema } from '../../models/restaurantModel'
import { menuIndex, menuSchema } from '../../models/menuModel'
import { reviewIndex, reviewSchema } from '../../models/reviewModel'
import { orderIndex, orderSchema } from '../../models/orderModel'

@Component({
    templateUrl: 'configuracao.html',
    styleUrls: ['./configuracao.scss', './configuracao-responsive.scss'],
})
export class Configuracao {
    data: any;

    databaseSelectorCreate: string;
    databaseSelectorEdit: string;

    modelCreateSchema: any;
    modelCreateIndex: any;

    modelEditSchema: any;
    modelEditIndex: any;

    id: string;

    constructor(private http: Http, private modal: ModalController, public navCtrl: NavController, private alertCtrl: AlertController) {
        this.restaurantCreate();
        this.restaurantEdit();
    }

    restaurantCreate() {
        this.databaseSelectorCreate = "restaurants";
        this.modelCreateIndex = restaurantIndex;
        this.modelCreateSchema = restaurantSchema;
    }
    menuCreate() {
        this.databaseSelectorCreate = "menus";
        this.modelCreateIndex = menuIndex;
        this.modelCreateSchema = menuSchema;
    }
    reviewCreate() {
        this.databaseSelectorCreate = "reviews";
        this.modelCreateIndex = reviewIndex;
        this.modelCreateSchema = reviewSchema;
    }
    orderCreate() {
        this.databaseSelectorCreate = "orders";
        this.modelCreateIndex = orderIndex;
        this.modelCreateSchema = orderSchema;
    }

    restaurantEdit() {
        this.modelEditIndex = restaurantIndex;
        this.modelEditSchema = restaurantSchema;
        this.id = "";
        this.databaseSelectorEdit = "restaurants";
    }
    menuEdit() {
        this.modelEditIndex = menuIndex;
        this.modelEditSchema = menuSchema;
        this.id = "";
        this.databaseSelectorEdit = "menus";
    }
    reviewEdit() {
        this.modelEditIndex = reviewIndex;
        this.modelEditSchema = reviewSchema;
        this.id = "";
        this.databaseSelectorEdit = "reviews";
    }
    orderEdit() {
        this.modelEditIndex = orderIndex;
        this.modelEditSchema = orderSchema;
        this.id = "";
        this.databaseSelectorEdit = "orders";
    }

    resetCreateTextfield() {
        if (this.databaseSelectorCreate == "restaurants") this.restaurantCreate();
        else if (this.databaseSelectorCreate == "menus") this.menuCreate();
        else if (this.databaseSelectorCreate == "reviews") this.reviewCreate();
        else this.orderCreate();
    }

    resetEditTextfield() {
        if (this.databaseSelectorEdit == "restaurants") this.restaurantEdit();
        else if (this.databaseSelectorEdit == "menus") this.menuEdit();
        else if (this.databaseSelectorEdit == "reviews") this.reviewEdit();
        else this.orderEdit();
    }

    create() {
        let data = {
            userInput: this.modelCreateSchema,
        }

        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelectorCreate}/create`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.alertResponse(response);
        });
    }

    edit() {
        let data = {
            userInput: this.modelEditSchema,
            id: this.id
        }

        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelectorEdit}/update`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            if(response !== 'Updated'){
                return this.alertResponse("Invalid ID");
            }
            this.alertResponse(response);
        });
    }

    async alertResponse(response){
        let alert = await this.alertCtrl.create({
            message: response,
            buttons: ['OK']
        });
        alert.present();
    }
}