import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { ModalController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'
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

    constructor(private http: Http, private modal: ModalController, public navCtrl: NavController, private alertCtrl: AlertController, public loadingController: LoadingController, public activeRoute: ActivatedRoute) {}

    // Triggers a GET Data on the selected database
    // when the 'Config' Page loads.
    ngOnInit(){
        let databaseSelector = this.activeRoute.snapshot.paramMap.get('databaseSelector');
        let id = this.activeRoute.snapshot.paramMap.get('id');
        
        // Prepares the 'Config' Page based on the
        // database user has chosen on 'Listagem' Page.
        if(databaseSelector == "restaurants"){
            this.restaurantCreate(); 
            this.restaurantEdit();
        }
        else if(databaseSelector == "menus"){
            this.menuCreate(); 
            this.menuEdit();
        }
        else if(databaseSelector == "reviews"){
            this.reviewCreate(); 
            this.reviewEdit();
        }
        else{
            this.orderCreate();
            this.orderEdit();
        }

        // If user activated the 'Edit' method on the 'Listagem' page
        // then when he gets to 'Config' Page, the selected element to edit
        // will be displayed for him.
        if(id != "" && id != undefined && id != "undefined"){
            this.id = id;
            this.search(null);
        }
    }

    // All of these '...Create()' functions are used to
    // update the 'Create' method for every schema
    // the user wants to create a new element.
    restaurantCreate() {
        this.databaseSelectorCreate = "restaurants";
        this.modelCreateIndex = restaurantIndex;
        this.modelCreateSchema = JSON.parse(restaurantSchema);
    }
    menuCreate() {
        this.databaseSelectorCreate = "menus";
        this.modelCreateIndex = menuIndex;
        this.modelCreateSchema = JSON.parse(menuSchema);
    }
    reviewCreate() {
        this.databaseSelectorCreate = "reviews";
        this.modelCreateIndex = reviewIndex;
        this.modelCreateSchema = JSON.parse(reviewSchema);
    }
    orderCreate() {
        this.databaseSelectorCreate = "orders";
        this.modelCreateIndex = orderIndex;
        this.modelCreateSchema = JSON.parse(orderSchema);
    }

    // All of these '...Edit()' functions are used to
    // update the 'Edit' method for every schema
    // the user wants to edit an element. 
    restaurantEdit() {
        this.modelEditIndex = restaurantIndex;
        this.modelEditSchema = JSON.parse(restaurantSchema);
        this.id = "";
        this.databaseSelectorEdit = "restaurants";
    }
    menuEdit() {
        this.modelEditIndex = menuIndex;
        this.modelEditSchema = JSON.parse(menuSchema);
        this.id = "";
        this.databaseSelectorEdit = "menus";
    }
    reviewEdit() {
        this.modelEditIndex = reviewIndex;
        this.modelEditSchema = JSON.parse(reviewSchema);
        this.id = "";
        this.databaseSelectorEdit = "reviews";
    }
    orderEdit() {
        this.modelEditIndex = orderIndex;
        this.modelEditSchema = JSON.parse(orderSchema);
        this.id = "";
        this.databaseSelectorEdit = "orders";
    }

    // It is used to reset the textfield of 'Create' method.
    resetCreateTextfield() {
        if (this.databaseSelectorCreate == "restaurants") this.restaurantCreate();
        else if (this.databaseSelectorCreate == "menus") this.menuCreate();
        else if (this.databaseSelectorCreate == "reviews") this.reviewCreate();
        else this.orderCreate();
    }

    // It is used to reset the textfield of 'Edit' method.
    resetEditTextfield() {
        if (this.databaseSelectorEdit == "restaurants") this.restaurantEdit();
        else if (this.databaseSelectorEdit == "menus") this.menuEdit();
        else if (this.databaseSelectorEdit == "reviews") this.reviewEdit();
        else this.orderEdit();
    }

    // This function is used to create a new element
    // on the selected database.
    create() {
        this.loadingResponse("start");

        let data = {
            userInput: this.modelCreateSchema,
        }

        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelectorCreate}/create`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            this.loadingResponse("end");
            this.alertResponse(response);
            this.resetCreateTextfield();
        });
    }

    // This function is used to edit some element
    // on the selected database, by ID.
    edit() {
        this.loadingResponse("start");

        let data = {
            userInput: this.modelEditSchema,
            id: this.id
        }

        this.http.post(`https://suub-challenge.herokuapp.com/${this.databaseSelectorEdit}/update`, data).pipe(
            map(res => res.json())
        ).subscribe(response => {
            if(response !== 'Updated'){
                this.loadingResponse("end");
                return this.alertResponse("Invalid ID");
            }
            this.loadingResponse("end");
            this.alertResponse(response);
            this.resetEditTextfield();
        });
    }

    // This function is used to search for existing data
    // on database, in order to help user when he is
    // edditing some element.
    search(loadingState) {
        this.loadingResponse(loadingState);

        this.http.get(`https://suub-challenge.herokuapp.com/${this.databaseSelectorEdit}/` + this.id).pipe(
            map(res => res.json())
        ).subscribe(response => {
            if(response == null){
                this.loadingResponse("end");
                return this.alertResponse("Invalid ID");
            }
            this.loadingResponse("end");
            this.modelEditSchema = response;        
        }, error => {
            this.loadingResponse("end");
            return this.alertResponse("Invalid ID");
        });
    }

    // It is used to trigger the search() function by
    // pressing the 'Enter' key.
    searchKeyPress(keyCode){
        if(keyCode == 13){
            this.search("start");
        }
    }

    // It is a loading controller, used in order to
    // show the CRUD operation is happening.
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

    // It is an alert used to give a response
    // for every CRUD action the user makes.
    async alertResponse(response){
        let alert = await this.alertCtrl.create({
            message: response,
            buttons: ['OK']
        });
        alert.present();
    }
}