import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  get currentUser(): IUser {
    return this.authService.currentUser;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.authService.logout$()
  }

}
