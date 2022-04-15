import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdListComponent } from './ad-list/ad-list.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { AdService } from 'src/app/core/services/ad.service';
import { AngularMaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    AdListComponent,
    EditAdComponent,
    CreateAdComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AdListComponent,
    EditAdComponent,
    CreateAdComponent
  ],
  providers: [
    AdService
  ]
})
export class AdsModule { }