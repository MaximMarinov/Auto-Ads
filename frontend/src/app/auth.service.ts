import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './shared/interfaces/user';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private _currentUser = new BehaviorSubject<IUser>(undefined);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  currentUser: IUser;

  login$(userData: {email: string, password: string }): Observable<IUser> {
    return this.http
      .post<IUser>(`/users/login`, userData, {withCredentials: true})
      .pipe(
        tap(user => this.currentUser = user))
  }

  register$(userData: {fullName: string, email: string, phone: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(`/users/register`, userData, {withCredentials: true})
    .pipe(
      tap(user => this.currentUser = user));
  }

  logout$(): Observable<any> {
    return this.http.get<any>(`/users/logout`, { withCredentials: true});
  }

  authenticate(): Observable<IUser> {
    return this.http
    .get<IUser>(`/users/profile`, {withCredentials: true})
    .pipe(
      tap(currentProfile => this.handleLogin(currentProfile)), catchError((err) => {
        return EMPTY;
      }));
  }

  handleLogin(newUser: IUser) {
    this._currentUser.next(newUser);
  }

  handleLogout() {
    this._currentUser.next(undefined);
  }

  
}
