import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  constructor(private http: HttpClient) {}

  APIUrl: string = 'http://localhost:8000/api';

  filterEntreprises(token : string,page : number,searchRequest : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(
      `${this.APIUrl}/candidat/entreprise/search/?page=${page}`,
      searchRequest,
      httpOptions);
  }
}
