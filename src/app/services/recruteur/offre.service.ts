import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from 'src/app/models/offre';

@Injectable({
  providedIn: 'root',
})
export class OffreService {
  constructor(private http: HttpClient) {}

  APIUrl: string = 'http://localhost:8000/api';

  ajouterOffre(token : string, offre: Offre) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/recruteur/offres`, offre, httpOptions).subscribe(result => result);
  }

  getOffres(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/recruteur/offres/${user_id}`,httpOptions);
  }

  getOffre(token : string, id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/recruteur/offres/offre/${id}`, httpOptions);
  }
  updateOffre(token : string, id: any, offre: Offre){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.patch(`${this.APIUrl}/recruteur/offres/${id}`, offre, httpOptions).subscribe(
      response => response
    )
  }
  updateStatus(token : string, id: any,  status: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.patch(`${this.APIUrl}/recruteur/offres/status/${id}`, {
      'status': status
    }, httpOptions).subscribe(
      response => response
    )
  }
  deleteOffre(token: string, id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete(`${this.APIUrl}/recruteur/offres/${id}`, httpOptions).subscribe(result => result)
  }
}
