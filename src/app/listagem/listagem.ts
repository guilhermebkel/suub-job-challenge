import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { ModalController, NavController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'listagem.html',
    styleUrls: ['./listagem.scss'],
})
export class Listagem {

    data: any;
    databaseSelector: string;

    statusOfRestaurants: string;
    statusOfMenus: string;
    statusOfReviews: string;
    statusOfOrders: string;
    
    column1: string;
    column2: string;
    column3: string;

    constructor(private http: Http, private modalCtrl: ModalController, public navCtrl: NavController) {
        this.restaurantData();
    }

    id = "_id"

    restaurantData() {
        this.http.get('https://suub-challenge.herokuapp.com/restaurants').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;

            this.statusOfRestaurants = "status";
            this.statusOfMenus = null;
            this.statusOfReviews = null;
            this.statusOfOrders = null;

            this.column1 = "name";
            this.column2 = "category";
            this.column3 = "rating";
            this.databaseSelector = "restaurants";
        });
    }

    menuData() {
        this.http.get('https://suub-challenge.herokuapp.com/menus').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;

            this.statusOfRestaurants = null;
            this.statusOfMenus = "status";
            this.statusOfReviews = null;
            this.statusOfOrders = null;

            this.column1 = "name";
            this.column2 = "description";
            this.column3 = "price";
            this.databaseSelector = "menus";
        });
    }

    reviewData() {
        this.http.get('https://suub-challenge.herokuapp.com/reviews').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;

            this.statusOfRestaurants = null;
            this.statusOfMenus = null;
            this.statusOfReviews = "status";
            this.statusOfOrders = null;

            this.column1 = "name";
            this.column2 = "rating";
            this.column3 = "comments";
            this.databaseSelector = "reviews";
        });
    }

    orderData() {
        this.http.get('https://suub-challenge.herokuapp.com/orders').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;

            this.statusOfRestaurants = null;
            this.statusOfMenus = null;
            this.statusOfReviews = null;
            this.statusOfOrders = "status";

            this.column1 = "customer";
            this.column2 = "order";
            this.column3 = "price";
            this.databaseSelector = "orders";
        });
    }

    delete(value){

        this.http.get(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/delete/` + value).pipe(
            map(res => res.json())
        ).subscribe(response => {
            if(this.databaseSelector == "restaurants") this.restaurantData();
            else if(this.databaseSelector == "menus") this.menuData();
            else if(this.databaseSelector == "reviews") this.reviewData();
            else this.orderData();
        });
    }

}
