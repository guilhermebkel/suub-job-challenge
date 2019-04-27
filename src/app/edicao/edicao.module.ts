import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Edicao } from './edicao';

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
        component: Edicao
      }
    ])
  ],
  declarations: [Edicao]
})
export class EdicaoModule {}
