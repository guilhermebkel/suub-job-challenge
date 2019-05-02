import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Configuracao } from './configuracao';

import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: Configuracao
      }
    ])
  ],
  declarations: [Configuracao]
})
export class ConfiguracaoModule {}
