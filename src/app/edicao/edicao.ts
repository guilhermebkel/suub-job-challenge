import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { ModalController, NavController } from '@ionic/angular';

@Component({
    templateUrl: 'edicao.html',
    styleUrls: ['./edicao.scss'],
})
export class Edicao {

    id: any;
    name: string;

    databaseSelector: string;
    schemaExample: any;
    textfield: any;

    statusOfRestaurants: string;
    statusOfMenus: string;
    statusOfReviews: string;
    statusOfOrders: string;

    constructor(private http: Http, private modal: ModalController, public navCtrl: NavController) {
        this.restaurantSchema();
    }

    restaurantSchema() {

        this.schemaExample = '{' + '\n' +
            '"name"' + ': ' + '"Green Food"' + ',' + '\n' +
            '"category"' + ': ' + '"Saudável"' + ',' + '\n' +
            '"deliveryEstimate"' + ': ' + '"75m"' + ',' + '\n' +
            '"rating"' + ': ' + '4.1' + ',' + '\n' +
            '"imagePath"' + ': ' + '"assets/img/restaurants/greenfood.png"' + ',' + '\n' +
            '"about"' + ': ' + '"Com_ida saudável é no Green Food. Compramos barato, vendemos caro. ;)"' + ',' + '\n' +
            '"hours"' + ': ' + '"Somente em horário de almoço, das 11h às 15h"' + '\n' + '}';

        this.textfield = '{' + '\n' +
            '"name"' + ': ' + '" "' + ',' + '\n' +
            '"category"' + ': ' + '" "' + ',' + '\n' +
            '"deliveryEstimate"' + ': ' + '" "' + ',' + '\n' +
            '"rating"' + ': ' + '0' + ',' + '\n' +
            '"imagePath"' + ': ' + '" "' + ',' + '\n' +
            '"about"' + ': ' + '" "' + ',' + '\n' +
            '"hours"' + ': ' + '" "' + '\n' + '}';

        this.statusOfRestaurants = "status";
        this.statusOfMenus = null;
        this.statusOfReviews = null;
        this.statusOfOrders = null;

        this.databaseSelector = "restaurants";

    }

    menuSchema() {

        this.schemaExample = '{' + '\n' +
            '"imagePath"' + ': ' + '"assets/img/foods/coke.png"' + ',' + '\n' +
            '"name"' + ': ' + '"Refrigerante"' + ',' + '\n' +
            '"description"' + ': ' + '"O refri mais gelado da c_idade."' + ',' + '\n' +
            '"price"' + ': ' + '4.5' + ',' + '\n' +
            '"restaurant_id"' + ': ' + '"burger-house"' + '\n' + '}';

        this.textfield = '{' + '\n' +
            '"imagePath"' + ': ' + '" "' + ',' + '\n' +
            '"name"' + ': ' + '" "' + ',' + '\n' +
            '"description"' + ': ' + '" "' + ',' + '\n' +
            '"price"' + ': ' + '0' + ',' + '\n' +
            '"restaurant_id"' + ': ' + '" "' + '\n' + '}';

        this.statusOfRestaurants = null;
        this.statusOfMenus = "status";
        this.statusOfReviews = null;
        this.statusOfOrders = null;

        this.databaseSelector = "menus";
    }

    reviewSchema() {

        this.schemaExample = '{' + '\n' +
            '"name"' + ': ' + '"Rodrigo"' + ',' + '\n' +
            '"date"' + ': ' + '"2016-12-12T18:25:43"' + ',' + '\n' +
            '"rating"' + ': ' + '4' + ',' + '\n' +
            '"comments"' + ': ' + '"Muito ráp_ida a entrega, mas é caro."' + ',' + '\n' +
            '"restaurant_id"' + ': ' + '"coffee-corner"' + '\n' + '}';

        this.textfield = '{' + '\n' +
            '"name"' + ': ' + '" "' + ',' + '\n' +
            '"date"' + ': ' + '" "' + ',' + '\n' +
            '"rating"' + ': ' + '0' + ',' + '\n' +
            '"comments"' + ': ' + '" "' + ',' + '\n' +
            '"restaurant_id"' + ': ' + '" "' + '\n' + '}';

        this.statusOfRestaurants = null;
        this.statusOfMenus = null;
        this.statusOfReviews = "status";
        this.statusOfOrders = null;

        this.databaseSelector = "reviews";
    }

    orderSchema() {

        this.schemaExample = '{' + '\n' +
            '"customer_name"' + ': ' + '"Guilherme"' + ',' + '\n' +
            '"order_name"' + ': ' + '"Batata Frita"' + ',' + '\n' +
            '"order_price"' + ': ' + '"10.0"' + ',' + '\n' +
            '"menu_id"' + ': ' + '"lanches-fritos"' + ',' + '\n' +
            '"restaurant_id"' + ': ' + '"coffee-corner"' + ',' + '\n' +
            '"reviews_id"' + ': ' + '"guilherme-review"' + '\n' + '}';

        this.textfield = '{' + '\n' +
            '"customer_name"' + ': ' + '" "' + ',' + '\n' +
            '"order_name"' + ': ' + '" "' + ',' + '\n' +
            '"order_price"' + ': ' + '" "' + ',' + '\n' +
            '"menu_id"' + ': ' + '" "' + ',' + '\n' +
            '"restaurant_id"' + ': ' + '" "' + ',' + '\n' +
            '"reviews_id"' + ': ' + '" "' + '\n' + '}';

        this.statusOfRestaurants = null;
        this.statusOfMenus = null;
        this.statusOfReviews = null;
        this.statusOfOrders = "status";

        this.databaseSelector = "orders";

    }

    resetTextfield() {
        if (this.databaseSelector == "restaurants") this.restaurantSchema();
        else if (this.databaseSelector == "menus") this.menuSchema();
        else if (this.databaseSelector == "reviews") this.reviewSchema();
        else this.orderSchema();
    }

    create(){
        let data = {
            userInput: JSON.parse(this.textfield),
        }

        console.log(data);
        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/create`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            console.log('POST Response:', response);
        });
    }

    edit(){
        
    }
}
