import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAd } from '../../shared/interfaces/ad';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private http: HttpClient) {}

  getAllAds(): Observable<IAd[]> {
    return this.http.get<IAd[]>(`${apiUrl}/ads`);
  }

  getAdById(id: string): Observable<IAd> {
    return this.http.get<IAd>(`${apiUrl}/ads/${id}`);
  }
}
