import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { restaurantSchemaExample, restaurantSchema } from '../../schemas/restaurantSchema'
import { menuSchemaExample, menuSchema } from '../../schemas/menuSchema'
import { reviewSchemaExample, reviewSchema } from '../../schemas/reviewSchema'
import { orderSchemaExample, orderSchema } from '../../schemas/orderSchema'

@Component({
    templateUrl: 'edicao.html',
    styleUrls: ['./edicao.scss'],
})
export class Edicao {

    databaseSelectorCreate: string;
    databaseSelectorEdit: string;

    schemaExample: any;
    schemaCreate: any;
    schemaEdit: any;

    statusOfRestaurantsEdit: string;
    statusOfMenusEdit: string;
    statusOfReviewsEdit: string;
    statusOfOrdersEdit: string;

    statusOfRestaurantsCreate: string;
    statusOfMenusCreate: string;
    statusOfReviewsCreate: string;
    statusOfOrdersCreate: string;

    id: string;

    constructor(private http: Http, private modal: ModalController, public navCtrl: NavController, private alertCtrl: AlertController) {
        this.restaurantCreate();
        this.restaurantEdit();
    }

    restaurantCreate() {
        this.schemaExample = restaurantSchemaExample;
        this.schemaCreate = restaurantSchema;

        this.statusOfRestaurantsCreate = "status";
        this.statusOfMenusCreate = null;
        this.statusOfReviewsCreate = null;
        this.statusOfOrdersCreate = null;

        this.databaseSelectorCreate = "restaurants";
    }
    menuCreate() {
        this.schemaExample = menuSchemaExample;
        this.schemaCreate = menuSchema;

        this.statusOfRestaurantsCreate = null;
        this.statusOfMenusCreate = "status";
        this.statusOfReviewsCreate = null;
        this.statusOfOrdersCreate = null;

        this.databaseSelectorCreate = "menus";
    }
    reviewCreate() {
        this.schemaExample = reviewSchemaExample;
        this.schemaCreate = reviewSchema;

        this.statusOfRestaurantsCreate = null;
        this.statusOfMenusCreate = null;
        this.statusOfReviewsCreate = "status";
        this.statusOfOrdersCreate = null;

        this.databaseSelectorCreate = "reviews";
    }
    orderCreate() {
        this.schemaExample = orderSchemaExample;
        this.schemaCreate = orderSchema;

        this.statusOfRestaurantsCreate = null;
        this.statusOfMenusCreate = null;
        this.statusOfReviewsCreate = null;
        this.statusOfOrdersCreate = "status";

        this.databaseSelectorCreate = "orders";
    }

    restaurantEdit() {
        this.schemaEdit = restaurantSchema;
        this.id = "";

        this.statusOfRestaurantsEdit = "status";
        this.statusOfMenusEdit = null;
        this.statusOfReviewsEdit = null;
        this.statusOfOrdersEdit = null;

        this.databaseSelectorEdit = "restaurants";
    }
    menuEdit() {
        this.schemaEdit = menuSchema;
        this.id = "";

        this.statusOfRestaurantsEdit = null;
        this.statusOfMenusEdit = "status";
        this.statusOfReviewsEdit = null;
        this.statusOfOrdersEdit = null;

        this.databaseSelectorEdit = "menus";
    }
    reviewEdit() {
        this.schemaEdit = reviewSchema;
        this.id = "";

        this.statusOfRestaurantsEdit = null;
        this.statusOfMenusEdit = null;
        this.statusOfReviewsEdit = "status";
        this.statusOfOrdersEdit = null;

        this.databaseSelectorEdit = "reviews";
    }
    orderEdit() {
        this.schemaEdit = orderSchema;
        this.id = "";

        this.statusOfRestaurantsEdit = null;
        this.statusOfMenusEdit = null;
        this.statusOfReviewsEdit = null;
        this.statusOfOrdersEdit = "status";

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
            userInput: JSON.parse(this.schemaCreate),
        }
        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelectorCreate}/create`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.alertResponse(response);
        });
    }

    edit() {
        let data = {
            userInput: JSON.parse(this.schemaEdit),
            id: this.id
        }
        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelectorEdit}/update`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
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
