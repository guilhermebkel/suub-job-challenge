import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'listagem', loadChildren: './listagem/listagem.module#ListagemModule' },
  { path: 'configuracao/:databaseSelector', loadChildren: './configuracao/configuracao.module#ConfiguracaoModule' },
  { path: 'modal-exclusao', loadChildren: './modal-exclusao/modal-exclusao.module#ModalExclusaoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
