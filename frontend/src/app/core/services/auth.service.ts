import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { tap} from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces/user';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

export interface CreateUserDto {
  fullName: string,
  email: string,
  phone: string,
  password: string 
}
@Injectable()
export class AuthService {

  currentUser: IUser;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private storage: StorageService, private http: HttpClient) {
  }

  login$(userData: {email: string, password: string }): Observable<IUser> {
    return this.http
      .post<IUser>(`${environment.apiURL}/users/login`, userData, {withCredentials: true})
      .pipe(tap(user => this.currentUser = user))
  }

  register$(userData: {fullName: string, email: string, phone: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiURL}/users/register`, userData, {withCredentials: true});
  }

  getProfile$(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiURL}/users/profile`, { withCredentials: true })
      .pipe(tap(user => this.currentUser = user))
  }
  

  logout$(): void {
    this.http.get(`${environment.apiURL}/users/logout`, {withCredentials: true})
  }
}