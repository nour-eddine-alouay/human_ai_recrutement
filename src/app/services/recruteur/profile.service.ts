import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http : HttpClient,
  ) { }

  APIUrl : string = "http://localhost:8000/api"

  // get recruteur entreprise information
  getEntrepriseInfo(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/recruteur/entreprise/${user_id}`,{},httpOptions);
  }

  // get recruteur representant information
  getAdminInfo(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/recruteur/admin/${user_id}`,{},httpOptions);
  }

  // save recruteur entreprise information
  saveEntrepriseInfo(token : string,EntrepriseInfo : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/recruteur/entreprise`,{
      "id" : EntrepriseInfo.id,
      "nom" : EntrepriseInfo.nom,
      "domaine" : EntrepriseInfo.domaine,
      "type" : EntrepriseInfo.type,
      "apercu" : EntrepriseInfo.apercu,
      "slogan" : EntrepriseInfo.slogan,
      "pays" : EntrepriseInfo.pays,
      "adresse" : EntrepriseInfo.adresse,
      "site" : EntrepriseInfo.site
    },httpOptions)
  }

  // save recruteur entreprise information
  saveAdminInfo(token : string,AdminInfo : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/recruteur/admin`,{
      "id" : AdminInfo.id,
      "nom" : AdminInfo.nom,
      "prenom" : AdminInfo.prenom,
      "telephone" : AdminInfo.telephone,
      "email_contact" : AdminInfo.email_contact,
      "poste" : AdminInfo.poste,
      "linkedin" : AdminInfo.linkedin
    },httpOptions)
  }

  // upload file
  uploadFile(token : string,data : FormData){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/file`,data, httpOptions);
  }

  // get user Photo
  getPhoto(token : string,user_id : string,user_type : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/photo`, {
      "user_id" : user_id,
      "user_type" : user_type,
    }, httpOptions);
  }

  // get user Video
  getVideo(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/video`, {
      "user_id" : user_id,
      "user_type" : "entreprise"
    }, httpOptions);
  }

  // change password
  changePassword(token : string,user_id : string,old_password : string,new_password : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/user/change-password`,{
      "id" : user_id,
      "old_password" : old_password,
      "new_password" : new_password
    },httpOptions)
  }

  // toggle valeur humaine
  getValeursHumaines(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/valeurs/${user_id}`, {}, httpOptions);
  }
  // toggle valeur humaine
  toggleValeurHumaine(token : string,user_id : string,valeur : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/valeurs`, {
      "valeur" : valeur,
      "user_id" : user_id,
    }, httpOptions);
  }
}
