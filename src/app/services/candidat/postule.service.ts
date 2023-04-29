import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostuleService {
  constructor(private http: HttpClient) {}

  APIUrl: string = 'http://localhost:8000/api';

  // add postule
  addPostule(token : string,postule : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/postules`,postule,httpOptions)
  }

  // filterPostules
  filterPostules(token : string,candidat_id : number,page : number,keywords : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(
      `${this.APIUrl}/candidat/postules/search/?page=${page}`,
      {
        "candidat_id" : candidat_id,
        "keywords" : keywords
      },httpOptions);
  }

  // deletePostule
  deletePostule(token : string,id : number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete(`${this.APIUrl}/candidat/postules/${id}`,httpOptions)
  }
}
