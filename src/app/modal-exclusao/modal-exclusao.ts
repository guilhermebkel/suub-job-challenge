import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-exclusao',
  templateUrl: './modal-exclusao.html',
  styleUrls: ['./modal-exclusao.scss'],
})
export class ModalExclusaoPage implements OnInit {

  modalTitle:string;
  modelId:string;
 
  constructor(private modalController: ModalController, private navParams: NavParams){ 

  }
 
  ngOnInit() {
    this.modelId = this.navParams.data.paramTitle;
    this.modalTitle = this.navParams.data.paramID;
  }
 
  closeModal(response) {
    this.modalController.dismiss(response);
  }

}
