import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { ListingListComponent } from './components/listing-list/listing-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { SecureInnerPages } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-listing' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPages] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPages] },
  { path: 'add-listing', component: AddListingComponent },
  { path: 'edit-listing/:id', component: EditListingComponent },
  { path: 'listings-list', component: ListingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
