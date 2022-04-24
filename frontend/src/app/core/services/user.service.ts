import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap} from 'rxjs';
import { AuthService } from 'src/app/auth.service';
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
export class UserService {
  constructor(private storage: StorageService, private http: HttpClient, private authService: AuthService) {
  }

  getProfile$(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiURL}/users/profile`, { withCredentials: true })
  }  

  editProfile$(body: { fullName: string, email: string, phone: string }): Observable<IUser> {
      return this.http.put<IUser>(`${environment.apiURL}/users/profile`, body, {withCredentials: true})
    }
  }
