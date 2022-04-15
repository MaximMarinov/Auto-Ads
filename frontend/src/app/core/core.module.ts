import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../material.module';
import { AdService } from './services/ad.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AdService
  ]
})
export class CoreModule { }
