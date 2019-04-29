import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { ModalExclusaoPage } from '../modal-exclusao/modal-exclusao'

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
    column4: string;

    editMode: boolean;
    editModeStyle: string;
    editButtonName: string;

    item1: string;
    item2: string;
    item3: string;

    constructor(private http: Http, private modalCtrl: ModalController, public navCtrl: NavController, public modalController: ModalController, private alertCtrl: AlertController) {
        this.restaurantData();
        this.editMode = false;
        this.editModeStyle = "editModeDisabled";
        this.editButtonName = "EDIT";
    }

    restaurantData() {
        this.http.get('https://suub-challenge.herokuapp.com/restaurants').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;

            this.statusOfRestaurants = "status";
            this.statusOfMenus = null;
            this.statusOfReviews = null;
            this.statusOfOrders = null;

            this.column1 = "_id";
            this.column2 = "name";
            this.column3 = "category";
            this.column4 = "rating";
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

            this.column1 = "_id";
            this.column2 = "name";
            this.column3 = "description";
            this.column4 = "price";
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

            this.column1 = "_id";
            this.column2 = "name";
            this.column3 = "rating";
            this.column4 = "comments";
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

            this.column1 = "_id";
            this.column2 = "customer";
            this.column3 = "order";
            this.column4 = "price";
            this.databaseSelector = "orders";
        });
    }

    async openModalExclusao(id) {
        const modal = await this.modalController.create({
            component: ModalExclusaoPage,
            componentProps: {
                "paramID": "Confirmação de Exclusão",
                "paramTitle": "Deseja realmente efetuar a operação?"
            }
        });
        modal.onDidDismiss().then((modalExclusaoResponse) => {
            if(modalExclusaoResponse.data == true){
                this.delete(id);
            }
        });
        return await modal.present();
    }

    delete(id) {
        this.http.get(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/delete/` + id).pipe(
            map(res => res.json())
        ).subscribe(response => {
            if (this.databaseSelector == "restaurants") this.restaurantData();
            else if (this.databaseSelector == "menus") this.menuData();
            else if (this.databaseSelector == "reviews") this.reviewData();
            else this.orderData();
            
            this.alertResponse(response);
        });
    }

    edit(id){
        this.editMode = !this.editMode;
        if(this.editMode == true){
            this.editModeStyle = "editModeEnabled";
            this.editButtonName = "SAVE";
        }
        else{
            this.editModeStyle = "editModeDisabled";
            this.editButtonName = "EDIT";

            console.log(id);
            console.log(this.item1);
        }
    }

    info(id){
        this.http.get(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/` + id).pipe(
            map(res => res.json())
        ).subscribe(response => {
           this.alertInformation(response);
        });
    }

    async alertResponse(response){
        let alert = await this.alertCtrl.create({
            message: response,
            buttons: ['OK']
        });
        alert.present();
    }

    async alertInformation(response){
        let alert = await this.alertCtrl.create({
            message: JSON.stringify(response),
            buttons: ['OK'],
            cssClass: "alertInformation"
        });
        alert.present();
    }

}
