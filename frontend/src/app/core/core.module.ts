import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../material.module';
import { AdService } from './services/ad.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { storageServiceProvider } from './services/storage.service';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule>  {
    return {
      ngModule: CoreModule,
      providers: [
        AdService,
        storageServiceProvider,
      ]
    }
  }
}
