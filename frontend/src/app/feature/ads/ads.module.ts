import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdListComponent } from './ad-list/ad-list.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { AdService } from 'src/app/core/services/ad.service';
import { AngularMaterialModule } from 'src/app/material.module';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdsRoutingModule } from './ads-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdListComponent,
    CreateAdComponent,
    AdDetailsComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AdsRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AdListComponent,
    CreateAdComponent,
  ],
  providers: [AdService]
})
export class AdsModule { }
