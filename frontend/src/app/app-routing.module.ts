import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdListComponent } from './feature/ads/ad-list/ad-list.component';
import { CreateAdComponent } from './feature/ads/create-ad/create-ad.component';
import { EditAdComponent } from './feature/ads/edit-ad/edit-ad.component';

const routes: Routes = [
  { path: '', component: AdListComponent },
  { path: 'create', component: CreateAdComponent },
  { path: 'edit/:id', component: EditAdComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
