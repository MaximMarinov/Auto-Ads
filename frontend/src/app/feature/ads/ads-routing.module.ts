import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';

const routes: Routes = [
  { path: 'create', component: CreateAdComponent },
  { path: 'edit/:id', component: EditAdComponent },
  { path: 'ads/:adId', component: AdDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
