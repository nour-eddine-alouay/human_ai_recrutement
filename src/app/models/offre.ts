export interface Offre {
    titre : string,
    contrat : string,
    domaine : string,
    status : string,
    description : string,
    max_salaire : string,
    min_salaire : string,
    hide_salaire : boolean,
    mode_travail : string,
    adresse : string,
    pays : string,
    profil : string,
    competences : any[],
    niveau_etude : string,
    niveau_experience : string,
    user_id : number
}
