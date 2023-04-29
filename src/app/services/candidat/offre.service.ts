import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from 'src/app/models/offre';

@Injectable({
  providedIn: 'root',
})
export class OffreService {
  constructor(private http: HttpClient) {}

  APIUrl: string = 'http://localhost:8000/api';

  filterOffers(token : string,page : number,searchRequest : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(
      `${this.APIUrl}/candidat/offres/search/?page=${page}`,
      searchRequest,
      httpOptions);
  }

  getOffre(token : string, id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/offres/${id}`, httpOptions);
  }

  getEntrepriseDetails(token : string, id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/entreprise/${id}`, httpOptions);
  }

  getOffresSimilaires(token : string,id : number,domaine : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/offres/domaine`,{
      "domaine" : domaine,
      "id" : id
    },httpOptions);
  }

  getOffresRecentes(token : string,id_user : number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/offres/recentes/${id_user}`,httpOptions);
  }


  getCountActiveOffres(token : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/offres/active/count`,httpOptions);
  }

  getCountPostulesOfActiveOffres(token : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/offres/active/postules/count`,httpOptions);
  }
  getCountEnSelectionOffres(token : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/offres/en-selection/count`,httpOptions);
  }

  getCountPostulesOfEnSelectionOffres(token : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/offres/en-selection/postules/count`,httpOptions);
  }

  getCountEntreprises(token : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/entreprise/count`,httpOptions);
  }

  getCountCandidats(token : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/candidat/count`,httpOptions);
  }

  getCountCandidatCountryEntreprises(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/pays/entreprise/count/${user_id}`,httpOptions);
  }
  getCountCandidatAtSameCountry(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/statistics/pays/candidats/count/${user_id}`,httpOptions);
  }
}
