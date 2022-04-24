import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(event => {

      if (event instanceof HttpResponse) {

        if (event.url.endsWith('login') || event.url.endsWith('register')) {

          const newlyLoggedUser: IUser = event.body;
          this.authService.handleLogin(newlyLoggedUser);

        } else if (event.url.endsWith('logout')) {
          this.authService.handleLogout();

        } 
      }
    }));
  }
}
