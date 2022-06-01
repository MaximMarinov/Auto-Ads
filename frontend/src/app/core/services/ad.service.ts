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

  getAdById(id: string): Observable<IAd> {
    return this.http.get<IAd>(`${apiUrl}/ads/${id}`);
  }

  createAd$(
    body: {
      title: string,
      img: File,
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

      const postData = new FormData;
      postData.append('title', body.title);
      postData.append('img', body.img, body.title);
      postData.append('year', body.year.toString());
      postData.append('engine', body.engine);
      postData.append('transmission', body.transmission);
      postData.append('place', body.place);
      postData.append('cubature', body.cubature.toString());
      postData.append('mileage', body.mileage.toString());
      postData.append('category', body.category);
      postData.append('eurostandard', body.eurostandard.toString());
      postData.append('color', body.color);
      postData.append('description', body.description);
      postData.append('price', body.price.toString());

    return this.http.post<IAd>(`${apiUrl}/ads`, postData, {withCredentials: true})
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
