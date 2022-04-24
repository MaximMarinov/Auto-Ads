import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoggedGuard } from '../core/guards/logged.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', canActivate:[LoggedGuard], component: LoginComponent },
  { path: 'register', canActivate:[LoggedGuard], component: RegisterComponent },
  { path: 'profile', canActivate:[AuthGuard], component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
