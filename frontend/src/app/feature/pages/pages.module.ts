import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from 'src/app/material.module';
import { AdsRoutingModule } from '../ads/ads-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    AdsRoutingModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent,
    NotFoundComponent
  ],
  bootstrap:[HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
