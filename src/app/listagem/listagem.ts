import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ModalController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'
import { ModalExclusaoPage } from '../modal-exclusao/modal-exclusao'
import { restaurantIndex } from '../../models/restaurantModel'
import { menuIndex } from '../../models/menuModel'
import { reviewIndex } from '../../models/reviewModel'
import { orderIndex } from '../../models/orderModel'

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
    columnIndex: any;

    editMode: boolean;
    editModeStyle: string;

    newItem1: string;
    newItem2: string;
    newItem3: string;

    checkbox: any;

    constructor(private http: Http, private modalCtrl: ModalController, public navCtrl: NavController, public modalController: ModalController, private alertCtrl: AlertController, public loadingController: LoadingController, public router: Router) {}

    // Triggers a GET Data on Database
    // when the 'Listagem' Page loads.
    ngOnInit(){
        this.restaurantData();
    }

    // It is used to go to 'Config' Page
    // passing information about the
    // selected database.
    goToConfigPage(){
        this.router.navigate(["configuracao", `${this.databaseSelector}`, `${this.id}`]);
    }

    // All the function '..Data()' below are used 
    // to get data from a specific schema on Database.
    restaurantData() {
        this.http.get('https://suub-challenge.herokuapp.com/restaurants').pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.data = response;
            this.databaseSelector = "restaurants";

            this.editMode = false;
            this.editModeStyle = "editModeDisabled";
            this.id = "";

            this.columnIndex = restaurantIndex;
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

            this.columnIndex = menuIndex;
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

            this.columnIndex = reviewIndex;
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

            this.columnIndex = orderIndex;
            this.column1 = "_id";
            this.column2 = "customer";
            this.column3 = "order";
            this.column4 = "price";
        });
    }

    // That's a modal which asks the user if 
    // he really wants to delete some data.
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

    // This function is used to delete 
    // data from database by ID.
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

    // This function is used to edit 
    // data on database by ID.
    edit(id, initialItem1, initialItem2, initialItem3) {
        this.editMode = !this.editMode;
        this.id = id;

        if (this.editMode == false) {
            this.editModeStyle = "editModeDisabled";
            this.id = "";

            if (initialItem1 === this.newItem1 && initialItem2 === this.newItem2 && initialItem3 === this.newItem3) {
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
                this.reloadPage();
            });
        }
    }

    // This function gets all information about on 
    // database about the element the user chooses.
    info(id) {
        this.loadingResponse("start");

        this.http.get(`https://suub-challenge.herokuapp.com/${this.databaseSelector}/` + id).pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.loadingResponse("end");
            this.alertInformation(response);
        });
    }

    // That's a loading controller that triggers everytime 
    // the user makes some CRUD action, in order to tell 
    // him the command is running.
    async loadingResponse(state) {
        if (state == "start") {
            const loading = await this.loadingController.create({
                cssClass: 'custom-loading-class'
            });
            await loading.present();
        }
        if (state == "end") {
            this.loadingController.dismiss();
        }
    }

    // That's an alert that triggers a response to user,
    // telling him if the action was sucessfully done or not.
    async alertResponse(response) {
        let alert = await this.alertCtrl.create({
            message: response,
            buttons: ['OK']
        });
        alert.present();
    }

    // This alert retrieves all the data information for user
    // when he triggers the info(id) function.
    async alertInformation(response) {
        let alert = await this.alertCtrl.create({
            message: JSON.stringify(response),
            buttons: ['OK'],
            cssClass: "alertInformation"
        });
        alert.present();
    }

    // It is used to reload the page with new data
    // from database.
    reloadPage() {
        if (this.databaseSelector == "restaurants") this.restaurantData();
        else if (this.databaseSelector == "menus") this.menuData();
        else if (this.databaseSelector == "reviews") this.reviewData();
        else this.orderData();
    }

    // All of theses 'getValue' functions are used to get
    // the new values user types when triggering
    // the edit() function.
    getValueOne(value) {
        this.newItem1 = value;
    }
    getValueTwo(value) {
        this.newItem2 = value;
    }
    getValueThree(value) {
        this.newItem3 = value;
    }

    // That function is used to automatically add
    // the column names on the 'Column Edit' method,
    // in order to display all the possible columns
    // the user can add on datatable.
    checkboxValue(){
        const theNewInputs = [];
        for (let i = 0; i < this.columnIndex.length; i++) {
            theNewInputs.push({
                type: 'checkbox',
                label: this.columnIndex[i],
                value: this.columnIndex[i],
                checked: (this.column2 == this.columnIndex[i] || this.column3 == this.columnIndex[i] || this.column4 == this.columnIndex[i])? true : false
            });
        }
        return theNewInputs;
    }

    // This function is used to display the columns options
    // of 'Column Edit' method to user.
    async alertColumns() {
        this.checkbox = this.checkboxValue();
        let alert = await this.alertCtrl.create({
            header: 'Columns (3 max.)',
            inputs: this.checkbox,
            buttons: 
                [{
                    text: 'OK',
                    handler: checkbox => {
                        this.column2 = checkbox[0];
                        this.column3 = checkbox[1];
                        this.column4 = checkbox[2];
                    },
                }],
        });
        alert.present();
    }
}
