import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/pages/home/home.component';
import { NotFoundComponent } from './feature/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  // }
  // { path: '**', component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
