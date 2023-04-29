import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnregistrementService {
  constructor(private http: HttpClient) {}

  APIUrl: string = 'http://localhost:8000/api';

  // enregistrerOffre
  toggleOffreEnregistrement(token: string , user_id: number,offre_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(`${this.APIUrl}/candidat/enregistrements`,
    {
      "user_id": user_id,
      "offre_id": offre_id
    },
    httpOptions);
  }
  // filterOffers
  filterOffers(token : string,page : number,searchRequest : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(
      `${this.APIUrl}/candidat/enregistrements/search/?page=${page}`,
      searchRequest,
      httpOptions);
  }
  // getEnregistrements
  getEnregistrements(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(`${this.APIUrl}/candidat/enregistrements/search`, httpOptions);
  }
  // getEnregistrements
  isEnregistrer(token: string, id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/enregistrements/offre/${id}`, httpOptions)
  }
}
