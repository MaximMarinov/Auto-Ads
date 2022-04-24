import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';
import { IAd } from '../../shared/interfaces/ad';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllAds$(): Observable<IAd[]> {
    return this.http.get<IAd[]>(`${apiUrl}/ads`);
  }

  // getUserAds$(): Observable<IAd[]> {
  //   return this.http.get<IAd[]>(`${apiUrl}/ads/my-ads`, {withCredentials: true});
  // }

  getAdById(id: string): Observable<IAd> {
    return this.http.get<IAd>(`${apiUrl}/ads/${id}`);
  }

  createAd$(
    body: {
      title: string,
      img: string,
      year: number,
      engine: string,
      transmission: string,
      place: string,
      cubature: number,
      mileage: number,
      category: string,
      eurostandard: number,
      color: string,
      description: string,
      price: number
    }): Observable<IAd> {

    return this.http.post<IAd>(`${apiUrl}/ads`, body, {withCredentials: true})
  }

  editAd$(
    id: string,
    body: {
      title: string,
      img: string,
      year: number,
      engine: string,
      transmission: string,
      place: string,
      cubature: number,
      mileage: number,
      category: string,
      eurostandard: number,
      color: string,
      description: string,
      price: number
    }): Observable<IAd> {

    return this.http.put<IAd>(`${apiUrl}/ads/${id}`, body, {withCredentials: true})
  }

  deleteAd$(id: string): Observable<IAd> {
    return this.http.delete<IAd>(`${apiUrl}/ads/${id}`, {withCredentials: true});
  }

}
