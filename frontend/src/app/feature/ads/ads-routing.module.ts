import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';

const routes: Routes = [
  { path: 'ads', component: AdListComponent },
  { path: 'ads/create', canActivate:[AuthGuard], component: CreateAdComponent },
  { path: 'ads/edit/:adId', canActivate:[AuthGuard], component: EditAdComponent },
  { path: 'ads/:adId', component: AdDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
