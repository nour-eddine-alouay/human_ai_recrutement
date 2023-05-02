import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http : HttpClient,
  ) { }

  APIUrl : string = "http://localhost:8000/api"
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // Register pour un candidat
  registerCandidat(user : User) {
    return this.http.post(`${this.APIUrl}/register/candidat`, {
      nom : user.nom,
      prenom : user.prenom,
      email : user.email,
      type : user.type,
      password : user.password,
      pays : user.pays,
      profession : user.profession

      
    });


  }

  // Register pour un candidat
  registerRecruteur(user : User) {
    return this.http.post(`${this.APIUrl}/register/recruteur`, {
      nom : user.nom,
      prenom : user.prenom,
      email : user.email,
      type : user.type,
      password : user.password,
      pays : user.pays,
      site : user.site,
      domaine : user.domaine
    });
  }
  googleRegister(){
    return this.http.get(`${this.APIUrl}/register/google`)
  }

  // Login
  login(email: string, password: string) {
    return this.http.post(`${this.APIUrl}/login`, {
      email : email,
      password : password,
    });
  }

  // logout
  logout(token : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/logout`,{},httpOptions);
  }

  // isEmailUnique
  isEmailUnique(email : string){
    return this.http.post(`${this.APIUrl}/isEmailUnique`, {
      email : email
    });
  }


  //forgot password
  forgot(email: string): Observable<any> {
    return this.http.post(`${this.APIUrl}/forgot`, { email: email });
  }

  //reset password
  reset(token: string, password: string, password_confirmation: string): Observable<any> {

    const data = {
      token: token,
      password: password,
      password_confirmation: password_confirmation
    }
    return this.http.post(`${this.APIUrl}/reset`, data);
  }
}
