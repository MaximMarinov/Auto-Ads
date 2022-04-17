import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdListComponent } from './ad-list/ad-list.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { AdService } from 'src/app/core/services/ad.service';
import { AngularMaterialModule } from 'src/app/material.module';
import { CoreModule } from '@angular/flex-layout';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdsRoutingModule } from './ads-routing.module';



@NgModule({
  declarations: [
    AdListComponent,
    EditAdComponent,
    CreateAdComponent,
    AdDetailsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AdsRoutingModule
  ],
  exports: [
    AdListComponent,
    EditAdComponent,
    CreateAdComponent
  ],
  providers: [AdService]
})
export class AdsModule { }
