import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { restaurantModelExample, restaurantModel } from '../../models/restaurantModel'
import { menuModelExample, menuModel } from '../../models/menuModel'
import { reviewModelExample, reviewModel } from '../../models/reviewModel'
import { orderModelExample, orderModel } from '../../models/orderModel'

@Component({
    templateUrl: 'configuracao.html',
    styleUrls: ['./configuracao.scss', './configuracao-responsive.scss'],
})
export class Configuracao {

    databaseSelectorCreate: string;
    databaseSelectorEdit: string;

    modelExample: any;
    modelCreate: any;
    modelEdit: any;

    id: string;

    constructor(private http: Http, private modal: ModalController, public navCtrl: NavController, private alertCtrl: AlertController) {
        this.restaurantCreate();
        this.restaurantEdit();
    }

    restaurantCreate() {
        this.modelExample = restaurantModelExample;
        this.modelCreate = restaurantModel;
        this.databaseSelectorCreate = "restaurants";
    }
    menuCreate() {
        this.modelExample = menuModelExample;
        this.modelCreate = menuModel;
        this.databaseSelectorCreate = "menus";
    }
    reviewCreate() {
        this.modelExample = reviewModelExample;
        this.modelCreate = reviewModel;
        this.databaseSelectorCreate = "reviews";
    }
    orderCreate() {
        this.modelExample = orderModelExample;
        this.modelCreate = orderModel;
        this.databaseSelectorCreate = "orders";
    }

    restaurantEdit() {
        this.modelEdit = restaurantModel;
        this.id = "";
        this.databaseSelectorEdit = "restaurants";
    }
    menuEdit() {
        this.modelEdit = menuModel;
        this.id = "";
        this.databaseSelectorEdit = "menus";
    }
    reviewEdit() {
        this.modelEdit = reviewModel;
        this.id = "";
        this.databaseSelectorEdit = "reviews";
    }
    orderEdit() {
        this.modelEdit = orderModel;
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
        try{
            JSON.parse(this.modelCreate);
        } catch(error) {
            return this.alertResponse(error);
        }

        let data = {
            userInput: JSON.parse(this.modelCreate),
        }

        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelectorCreate}/create`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.alertResponse(response);
        });
    }

    edit() {
        try{
            JSON.parse(this.modelEdit);
        } catch(error) {
            return this.alertResponse(error);
        }

        let data = {
            userInput: JSON.parse(this.modelEdit),
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