import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ModalController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { ModalExclusaoPage } from '../modal-exclusao/modal-exclusao'

@Component({
    selector: 'app-home',
    templateUrl: 'listagem.html',
    styleUrls: ['./listagem.scss', './listagem-responsive.scss'],
})
export class Listagem {

    data: any;
    databaseSelector: string;
    id: string;

    column1: string;
    column2: string;
    column3: string;
    column4: string;

    editMode: boolean;
    editModeStyle: string;
    
    newItem1: string;
    newItem2: string;
    newItem3: string;

    constructor(private http: Http, private modalCtrl: ModalController, public navCtrl: NavController, public modalController: ModalController, private alertCtrl: AlertController, public loadingController: LoadingController) {
        this.restaurantData();
    }

    restaurantData() {
        this.http.get('https://suub-challenge.herokuapp.com/restaurants').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;
            this.databaseSelector = "restaurants";

            this.editMode = false;
            this.editModeStyle = "editModeDisabled";
            this.id = "";

            this.column1 = "_id";
            this.column2 = "name";
            this.column3 = "category";
            this.column4 = "rating";      
        });
    }

    menuData() {
        this.http.get('https://suub-challenge.herokuapp.com/menus').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;
            this.databaseSelector = "menus";

            this.editMode = false;
            this.editModeStyle = "editModeDisabled";
            this.id = "";

            this.column1 = "_id";
            this.column2 = "name";
            this.column3 = "description";
            this.column4 = "price";         
        });
    }

    reviewData() {
        this.http.get('https://suub-challenge.herokuapp.com/reviews').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;
            this.databaseSelector = "reviews";

            this.editMode = false;
            this.editModeStyle = "editModeDisabled";
            this.id = "";

            this.column1 = "_id";
            this.column2 = "name";
            this.column3 = "rating";
            this.column4 = "comments"; 
        });
    }

    orderData() {
        this.http.get('https://suub-challenge.herokuapp.com/orders').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;
            this.databaseSelector = "orders";

            this.editMode = false;
            this.editModeStyle = "editModeDisabled";
            this.id = "";

            this.column1 = "_id";
            this.column2 = "customer";
            this.column3 = "order";
            this.column4 = "price";  
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
            if (modalExclusaoResponse.data == true) {
                this.delete(id);
            }
        });
        return await modal.present();
    }

    delete(id) {
        this.loadingResponse("start");

        this.http.get(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/delete/` + id).pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.reloadPage();
            this.loadingResponse("end");
            this.alertResponse(response);
        });
    }

    edit(id, initialItem1, initialItem2, initialItem3) {
        this.editMode = !this.editMode;
        this.id = id;

        if(this.editMode == false) {
            this.editModeStyle = "editModeDisabled";
            this.id = "";

            if(initialItem1 === this.newItem1 && initialItem2 === this.newItem2 && initialItem3 === this.newItem3){
                return;
            }

            this.loadingResponse("start");

            let data = {
                userInput: JSON.parse(`{"${this.column2}": "${this.newItem1}", "${this.column3}": "${this.newItem2}", "${this.column4}": "${this.newItem3}"}`),
                id: id
            }

            this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/update`, data).pipe(
                map(res => res.json())
            ).subscribe(response => {
                this.reloadPage();
                this.loadingResponse("end");
                this.alertResponse(response);
            }, error => {
                this.loadingResponse("end");
                this.alertResponse(((JSON.parse(error._body)).message));
            });
        }
    }

    info(id) {
        this.loadingResponse("start");

        this.http.get(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/` + id).pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.loadingResponse("end");
            this.alertInformation(response);
        });
    }

    async loadingResponse(state) {
        if(state == "start"){
            const loading = await this.loadingController.create({
                cssClass: 'custom-loading-class'
            });
            await loading.present();
        }
        if(state == "end"){
            this.loadingController.dismiss();
        }
    }

    async alertResponse(response) {
        let alert = await this.alertCtrl.create({
            message: response,
            buttons: ['OK']
        });
        alert.present();
    }

    async alertInformation(response) {
        let alert = await this.alertCtrl.create({
            message: JSON.stringify(response),
            buttons: ['OK'],
            cssClass: "alertInformation"
        });
        alert.present();
    }

    reloadPage(){
        if (this.databaseSelector == "restaurants") this.restaurantData();
        else if (this.databaseSelector == "menus") this.menuData();
        else if (this.databaseSelector == "reviews") this.reviewData();
        else this.orderData();
    }

    getValueOne(value) {
        this.newItem1 = value;
    }
    getValueTwo(value) {
        this.newItem2 = value;
    }
    getValueThree(value) {
        this.newItem3 = value;
    }
}
