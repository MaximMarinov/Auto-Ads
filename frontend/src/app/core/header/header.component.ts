import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/shared/interfaces/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  private isLoggingOut: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    // this.isLoggedIn$
  }

  ngOnDestroy(): void {
  }

  handleLogout() {

    if(this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args)
      },  
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/'])
      },
      error: () => {
        this.isLoggingOut = true;
      }
    });
  }

}
