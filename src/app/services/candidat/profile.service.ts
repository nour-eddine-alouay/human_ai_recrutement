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

  // get candidat personal information
  getPersonalInfo(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/personal/${user_id}`,{},httpOptions);
  }

  // get candidat professional information
  getProfessionalInfo(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/professional/${user_id}`,{},httpOptions);
  }

  // save candidat personal information
  savePersonalInfo(token : string,personalInfo : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/candidat/personal/save`,{
      "id" : personalInfo.id,
      "nom" : personalInfo.nom,
      "prenom" : personalInfo.prenom,
      "civilite" : personalInfo.civilite,
      "etat_civilite" : personalInfo.etat_civilite,
      "date_naissance" : personalInfo.date_naissance,
      "telephone" : personalInfo.telephone,
      "pays" : personalInfo.pays,
      "ville" : personalInfo.ville,
      "linkedin" : personalInfo.linkedin,
      "skype" : personalInfo.skype
    },httpOptions)
  }

  // save candidat professional information
  saveProfessionalInfo(token : string,personalInfo : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/candidat/professional/save`,{
      "id" : personalInfo.id,
      "domaine" : personalInfo.domaine,
      "profession" : personalInfo.profession,
      "competences" : personalInfo.competences,
      "apercu" : personalInfo.apercu,
      "niveau_etude" : personalInfo.niveau_etude,
      "niveau_experience" : personalInfo.niveau_experience
    },httpOptions)
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

  // Formation --------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------
  // add formation
  addFormation(token : string,user_id : string,formation : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/formation`,{
      "date_debut" : formation.date_debut,
      "date_fin" : formation.date_fin,
      "nom" : formation.nom,
      "diplome" : formation.diplome,
      "etat" : formation.etat,
      "etablissement" : formation.etablissement,
      "description" : formation.description,
      "user_id" : user_id
    },httpOptions)
  }

  // get all user Formations
  getAllFormations(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/formation/${user_id}`,{},httpOptions);
  }

  // delete formation
  deleteFormation(token : string,id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/formation/delete/${id}`,{},httpOptions);
  }

  // get formation by id
  getFormation(token : string,id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/formation/get/${id}`, {}, httpOptions);
  }

  // edit formation
  editFormation(token : string,id : string,formation : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/candidat/formation`, {
      "id" : id,
      "date_debut" : formation.date_debut,
      "date_fin" : formation.date_fin,
      "nom" : formation.nom,
      "diplome" : formation.diplome,
      "etat" : formation.etat,
      "etablissement" : formation.etablissement,
      "description" : formation.description
    }, httpOptions);
  }

  // Experience ---------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------
  // add experience
  addExperience(token : string,user_id : string,experience : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/experience`,{
      "date_debut" : experience.date_debut,
      "date_fin" : experience.date_fin,
      "poste" : experience.poste,
      "entreprise" : experience.entreprise,
      "etat" : experience.etat,
      "description" : experience.description,
      "user_id" : user_id
    },httpOptions)
  }

  // get all user Experiences
  getAllExperiences(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/experience/${user_id}`,{},httpOptions);
  }

  // delete experience
  deleteExperience(token : string,id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/experience/delete/${id}`,{},httpOptions);
  }

  // get experience by id
  getExperience(token : string,id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/experience/get/${id}`, {}, httpOptions);
  }

  // edit experience
  editExperience(token : string,id : string,experience : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/candidat/experience`, {
      "id" : id,
      "date_debut" : experience.date_debut,
      "date_fin" : experience.date_fin,
      "poste" : experience.poste,
      "entreprise" : experience.entreprise,
      "etat" : experience.etat,
      "description" : experience.description
    }, httpOptions);
  }

  // Certification ---------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------
  // add certification
  addCertification(token : string,user_id : string,certification : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/certification`,{
      "date_debut" : certification.date_debut,
      "date_fin" : certification.date_fin,
      "nom" : certification.nom,
      "autorite" : certification.autorite,
      "licence" : certification.licence,
      "user_id" : user_id
    },httpOptions)
  }

  // get all user Certifications
  getAllCertifications(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/certification/${user_id}`,{},httpOptions);
  }

  // delete certification
  deleteCertification(token : string,id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/certification/delete/${id}`,{},httpOptions);
  }

  // get certification by id
  getCertification(token : string,id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/certification/get/${id}`, {}, httpOptions);
  }

  // edit certification
  editCertification(token : string,id : string,certification : any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.put(`${this.APIUrl}/candidat/certification`, {
      "id" : id,
      "date_debut" : certification.date_debut,
      "date_fin" : certification.date_fin,
      "nom" : certification.nom,
      "autorite" : certification.autorite,
      "licence" : certification.licence,
    }, httpOptions);
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

  // upload file
  uploadFile(token : string,data : FormData){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/file`,data, httpOptions);
  }

  // get user CV
  getCV(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/candidat/file/cv/${user_id}`, {}, httpOptions);
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
      "user_type" : "candidat"
    }, httpOptions);
  }

  // get user Photo
  getPhoto(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.APIUrl}/photo`, {
      "user_id" : user_id,
      "user_type" : "candidat",
    }, httpOptions);
  }

  // get candidat personal information
  getNomEtPrenom(token : string,user_id : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.APIUrl}/candidat/fullname/${user_id}`,httpOptions);
  }
}
