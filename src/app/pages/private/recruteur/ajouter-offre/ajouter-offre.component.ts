import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Offre } from 'src/app/models/offre';
import { OffreService } from 'src/app/services/recruteur/offre.service';

@Component({
  selector: 'app-ajouter-offre',
  templateUrl: './ajouter-offre.component.html',
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent implements OnInit{

  constructor(
    private formBuilder : FormBuilder,
    private offreService : OffreService,
    private router : Router
  ){}

  user !: any
  token !: any

  posteForm !: FormGroup
  profilForm !: FormGroup
  selectedTab : number = 1

  id!: number;
  offre: any;
  competencesArray: any[] = []

  async ngOnInit() {
    const user = localStorage.getItem("user")
    this.user = user ? JSON.parse(user) : null
    const token = localStorage.getItem("token")
    this.token = token ? JSON.parse(token) : null

    // modification mode
    this.id = history.state['id']
    if(this.id){
      // this.offreService.getOffre(this.token.accessToken, this.id)
      // .subscribe( async (result:any) => {
      //   this.offre = await result.data;
      //   this.competencesArray = await this.offre.competences
      //   console.log(result)
      //   console.log(this.offre)
      // })
      const result = await this.offreService.getOffre(this.token.accessToken, this.id).toPromise();
      this.offre = (result as any).data;
      this.competencesArray = this.offre.competences
    }
    // posteForm
    this.posteForm = this.formBuilder.group({
      titre : [this.offre? this.offre.titre : '',[
        Validators.required,
      ]],
      domaine : [this.offre? this.offre.domaine : '',[
        Validators.required,
      ]],
      type_contrat : [this.offre? this.offre.contrat : '',[
        Validators.required,
      ]],
      description : [this.offre? this.offre.description : '',[
        Validators.required,
      ]],
      salaire_min : [this.offre? this.offre.min_salaire : '',[
        Validators.required,
      ]],
      salaire_max : [this.offre? this.offre.max_salaire : '',[
        Validators.required,
      ]],
      hide_salaire : [this.offre? this.offre.hide_salaire : false],
      mode : [this.offre? this.offre.mode_travail : '',[
        // Validators.required,
      ]],
      pays : [this.offre? this.offre.pays : '',[
        Validators.required,
      ]],
      adresse : [this.offre? this.offre.adresse : '',[
        Validators.required,
      ]],
    })
    // profilForm
    this.profilForm = this.formBuilder.group({
      description : [this.offre? this.offre.profil : '',[
        Validators.required,
      ]],
      competences : [''],
      niveau_etude : [this.offre? this.offre.niveau_etude : '',[
        Validators.required,
      ]],
      niveau_experience : [this.offre? this.offre.niveau_experience : '',[
        Validators.required,
      ]],
    })
  }

  // getters -> posteForm
  get titre(){return this.posteForm.controls['titre'];}
  get domaine(){return this.posteForm.controls['domaine'];}
  get type_contrat(){return this.posteForm.controls['type_contrat'];}
  get description_poste(){return this.posteForm.controls['description'];}
  get pays(){return this.posteForm.controls['pays'];}
  get adresse(){return this.posteForm.controls['adresse'];}
  get salaire_min(){return this.posteForm.controls['salaire_min'];}
  get salaire_max(){return this.posteForm.controls['salaire_max'];}
  get hide_salaire(){return this.posteForm.controls['hide_salaire'];}
  get mode(){return this.posteForm.controls['mode'];}
  // getters -> profilForm
  get description_profil(){return this.profilForm.controls['description'];}
  get competences(){return this.profilForm.controls['competences'];}
  get niveau_etude(){return this.profilForm.controls['niveau_etude'];}
  get niveau_experience(){return this.profilForm.controls['niveau_experience'];}

  removeCompetence(i: number){
    this.competencesArray.splice(i, 1)
    if (this.competencesArray.length < 1) {
      this.profilForm.setErrors({competencesArrayEmpty: true});
    }
  }

  addCompetence(){
    if(this.competences.value.trim() != ''){
      this.competencesArray.push(this.competences.value)
      this.competences.reset();
      if (this.competencesArray.length < 1) {
        this.profilForm.setErrors({competencesArrayEmpty: true});
      }
    }
  }

  suivant(tab : number){
    this.selectedTab = tab
    let div = document.getElementById('add-offre-steps');
    div?.scrollIntoView({ behavior: 'smooth' });
  }
  retour(tab : number){
    this.selectedTab = tab
    let div = document.getElementById('add-offre-steps');
    div?.scrollIntoView({ behavior: 'smooth' });
  }

  ajouterOffre(){
    const offre : Offre = {
      titre: this.titre.value,
      contrat: this.type_contrat.value,
      domaine: this.domaine.value,
      status: "active",
      description: this.description_poste.value,
      pays: this.pays.value,
      adresse: this.adresse.value,
      profil: this.description_profil.value,
      competences: this.competencesArray,
      max_salaire: this.salaire_max.value,
      min_salaire: this.salaire_min.value,
      hide_salaire: this.hide_salaire.value,
      mode_travail: this.mode.value,
      niveau_etude: this.niveau_etude.value,
      niveau_experience: this.niveau_experience.value,
      user_id: this.user.id
    }
    this.offreService.ajouterOffre(this.token.accessToken, offre);
    this.router.navigateByUrl("/recruteur/offres")
  }

  modifierOffre(){
      const offre : Offre = {
        titre: this.titre.value,
        contrat: this.type_contrat.value,
        domaine: this.domaine.value,
        status: this.offre.status,
        description: this.description_poste.value,
        pays: this.pays.value,
        adresse: this.adresse.value,
        profil: this.description_profil.value,
        competences: this.competencesArray,
        max_salaire: this.salaire_max.value,
        min_salaire: this.salaire_min.value,
        hide_salaire: this.hide_salaire.value,
        mode_travail: this.mode.value,
        niveau_etude: this.niveau_etude.value,
        niveau_experience: this.niveau_experience.value,
        user_id: this.user.id
      }
      this.offreService.updateOffre(this.token.accessToken, this.id, offre);
      this.router.navigateByUrl("/recruteur/offres")
  }

  // invalid Touched Dirty FormControl
  invalidTouchedDirtyFormControl(formGroup : FormGroup,formControlName : string){
    return formGroup.controls[formControlName]?.invalid &&
      (formGroup.controls[formControlName]?.touched
        || formGroup.controls[formControlName]?.dirty);
  }
  paysList = [
    {"name": "Afghanistan", "code": "AF"},
    {"name": "land Islands", "code": "AX"},
    {"name": "Albania", "code": "AL"},
    {"name": "Algeria", "code": "DZ"},
    {"name": "American Samoa", "code": "AS"},
    {"name": "AndorrA", "code": "AD"},
    {"name": "Angola", "code": "AO"},
    {"name": "Anguilla", "code": "AI"},
    {"name": "Antarctica", "code": "AQ"},
    {"name": "Antigua and Barbuda", "code": "AG"},
    {"name": "Argentina", "code": "AR"},
    {"name": "Armenia", "code": "AM"},
    {"name": "Aruba", "code": "AW"},
    {"name": "Australia", "code": "AU"},
    {"name": "Austria", "code": "AT"},
    {"name": "Azerbaijan", "code": "AZ"},
    {"name": "Bahamas", "code": "BS"},
    {"name": "Bahrain", "code": "BH"},
    {"name": "Bangladesh", "code": "BD"},
    {"name": "Barbados", "code": "BB"},
    {"name": "Belarus", "code": "BY"},
    {"name": "Belgium", "code": "BE"},
    {"name": "Belize", "code": "BZ"},
    {"name": "Benin", "code": "BJ"},
    {"name": "Bermuda", "code": "BM"},
    {"name": "Bhutan", "code": "BT"},
    {"name": "Bolivia", "code": "BO"},
    {"name": "Bosnia and Herzegovina", "code": "BA"},
    {"name": "Botswana", "code": "BW"},
    {"name": "Bouvet Island", "code": "BV"},
    {"name": "Brazil", "code": "BR"},
    {"name": "British Indian Ocean Territory", "code": "IO"},
    {"name": "Brunei Darussalam", "code": "BN"},
    {"name": "Bulgaria", "code": "BG"},
    {"name": "Burkina Faso", "code": "BF"},
    {"name": "Burundi", "code": "BI"},
    {"name": "Cambodia", "code": "KH"},
    {"name": "Cameroon", "code": "CM"},
    {"name": "Canada", "code": "CA"},
    {"name": "Cape Verde", "code": "CV"},
    {"name": "Cayman Islands", "code": "KY"},
    {"name": "Central African Republic", "code": "CF"},
    {"name": "Chad", "code": "TD"},
    {"name": "Chile", "code": "CL"},
    {"name": "China", "code": "CN"},
    {"name": "Christmas Island", "code": "CX"},
    {"name": "Cocos (Keeling) Islands", "code": "CC"},
    {"name": "Colombia", "code": "CO"},
    {"name": "Comoros", "code": "KM"},
    {"name": "Congo", "code": "CG"},
    {"name": "Congo, The Democratic Republic of the", "code": "CD"},
    {"name": "Cook Islands", "code": "CK"},
    {"name": "Costa Rica", "code": "CR"},
    {"name": "Cote D'Ivoire", "code": "CI"},
    {"name": "Croatia", "code": "HR"},
    {"name": "Cuba", "code": "CU"},
    {"name": "Cyprus", "code": "CY"},
    {"name": "Czech Republic", "code": "CZ"},
    {"name": "Denmark", "code": "DK"},
    {"name": "Djibouti", "code": "DJ"},
    {"name": "Dominica", "code": "DM"},
    {"name": "Dominican Republic", "code": "DO"},
    {"name": "Ecuador", "code": "EC"},
    {"name": "Egypt", "code": "EG"},
    {"name": "El Salvador", "code": "SV"},
    {"name": "Equatorial Guinea", "code": "GQ"},
    {"name": "Eritrea", "code": "ER"},
    {"name": "Estonia", "code": "EE"},
    {"name": "Ethiopia", "code": "ET"},
    {"name": "Falkland Islands (Malvinas)", "code": "FK"},
    {"name": "Faroe Islands", "code": "FO"},
    {"name": "Fiji", "code": "FJ"},
    {"name": "Finland", "code": "FI"},
    {"name": "France", "code": "FR"},
    {"name": "French Guiana", "code": "GF"},
    {"name": "French Polynesia", "code": "PF"},
    {"name": "French Southern Territories", "code": "TF"},
    {"name": "Gabon", "code": "GA"},
    {"name": "Gambia", "code": "GM"},
    {"name": "Georgia", "code": "GE"},
    {"name": "Germany", "code": "DE"},
    {"name": "Ghana", "code": "GH"},
    {"name": "Gibraltar", "code": "GI"},
    {"name": "Greece", "code": "GR"},
    {"name": "Greenland", "code": "GL"},
    {"name": "Grenada", "code": "GD"},
    {"name": "Guadeloupe", "code": "GP"},
    {"name": "Guam", "code": "GU"},
    {"name": "Guatemala", "code": "GT"},
    {"name": "Guernsey", "code": "GG"},
    {"name": "Guinea", "code": "GN"},
    {"name": "Guinea-Bissau", "code": "GW"},
    {"name": "Guyana", "code": "GY"},
    {"name": "Haiti", "code": "HT"},
    {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
    {"name": "Holy See (Vatican City State)", "code": "VA"},
    {"name": "Honduras", "code": "HN"},
    {"name": "Hong Kong", "code": "HK"},
    {"name": "Hungary", "code": "HU"},
    {"name": "Iceland", "code": "IS"},
    {"name": "India", "code": "IN"},
    {"name": "Indonesia", "code": "ID"},
    {"name": "Iran, Islamic Republic Of", "code": "IR"},
    {"name": "Iraq", "code": "IQ"},
    {"name": "Ireland", "code": "IE"},
    {"name": "Isle of Man", "code": "IM"},
    {"name": "Israel", "code": "IL"},
    {"name": "Italy", "code": "IT"},
    {"name": "Jamaica", "code": "JM"},
    {"name": "Japan", "code": "JP"},
    {"name": "Jersey", "code": "JE"},
    {"name": "Jordan", "code": "JO"},
    {"name": "Kazakhstan", "code": "KZ"},
    {"name": "Kenya", "code": "KE"},
    {"name": "Kiribati", "code": "KI"},
    {"name": "Korea, Democratic People'S Republic of", "code": "KP"},
    {"name": "Korea, Republic of", "code": "KR"},
    {"name": "Kuwait", "code": "KW"},
    {"name": "Kyrgyzstan", "code": "KG"},
    {"name": "Lao People'S Democratic Republic", "code": "LA"},
    {"name": "Latvia", "code": "LV"},
    {"name": "Lebanon", "code": "LB"},
    {"name": "Lesotho", "code": "LS"},
    {"name": "Liberia", "code": "LR"},
    {"name": "Libyan Arab Jamahiriya", "code": "LY"},
    {"name": "Liechtenstein", "code": "LI"},
    {"name": "Lithuania", "code": "LT"},
    {"name": "Luxembourg", "code": "LU"},
    {"name": "Macao", "code": "MO"},
    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
    {"name": "Madagascar", "code": "MG"},
    {"name": "Malawi", "code": "MW"},
    {"name": "Malaysia", "code": "MY"},
    {"name": "Maldives", "code": "MV"},
    {"name": "Mali", "code": "ML"},
    {"name": "Malta", "code": "MT"},
    {"name": "Marshall Islands", "code": "MH"},
    {"name": "Martinique", "code": "MQ"},
    {"name": "Mauritania", "code": "MR"},
    {"name": "Mauritius", "code": "MU"},
    {"name": "Mayotte", "code": "YT"},
    {"name": "Mexico", "code": "MX"},
    {"name": "Micronesia, Federated States of", "code": "FM"},
    {"name": "Moldova, Republic of", "code": "MD"},
    {"name": "Monaco", "code": "MC"},
    {"name": "Mongolia", "code": "MN"},
    {"name": "Montenegro", "code": "ME"},
    {"name": "Montserrat", "code": "MS"},
    {"name": "Morocco", "code": "MA"},
    {"name": "Mozambique", "code": "MZ"},
    {"name": "Myanmar", "code": "MM"},
    {"name": "Namibia", "code": "NA"},
    {"name": "Nauru", "code": "NR"},
    {"name": "Nepal", "code": "NP"},
    {"name": "Netherlands", "code": "NL"},
    {"name": "Netherlands Antilles", "code": "AN"},
    {"name": "New Caledonia", "code": "NC"},
    {"name": "New Zealand", "code": "NZ"},
    {"name": "Nicaragua", "code": "NI"},
    {"name": "Niger", "code": "NE"},
    {"name": "Nigeria", "code": "NG"},
    {"name": "Niue", "code": "NU"},
    {"name": "Norfolk Island", "code": "NF"},
    {"name": "Northern Mariana Islands", "code": "MP"},
    {"name": "Norway", "code": "NO"},
    {"name": "Oman", "code": "OM"},
    {"name": "Pakistan", "code": "PK"},
    {"name": "Palau", "code": "PW"},
    {"name": "Palestinian Territory, Occupied", "code": "PS"},
    {"name": "Panama", "code": "PA"},
    {"name": "Papua New Guinea", "code": "PG"},
    {"name": "Paraguay", "code": "PY"},
    {"name": "Peru", "code": "PE"},
    {"name": "Philippines", "code": "PH"},
    {"name": "Pitcairn", "code": "PN"},
    {"name": "Poland", "code": "PL"},
    {"name": "Portugal", "code": "PT"},
    {"name": "Puerto Rico", "code": "PR"},
    {"name": "Qatar", "code": "QA"},
    {"name": "Reunion", "code": "RE"},
    {"name": "Romania", "code": "RO"},
    {"name": "Russian Federation", "code": "RU"},
    {"name": "RWANDA", "code": "RW"},
    {"name": "Saint Helena", "code": "SH"},
    {"name": "Saint Kitts and Nevis", "code": "KN"},
    {"name": "Saint Lucia", "code": "LC"},
    {"name": "Saint Pierre and Miquelon", "code": "PM"},
    {"name": "Saint Vincent and the Grenadines", "code": "VC"},
    {"name": "Samoa", "code": "WS"},
    {"name": "San Marino", "code": "SM"},
    {"name": "Sao Tome and Principe", "code": "ST"},
    {"name": "Saudi Arabia", "code": "SA"},
    {"name": "Senegal", "code": "SN"},
    {"name": "Serbia", "code": "RS"},
    {"name": "Seychelles", "code": "SC"},
    {"name": "Sierra Leone", "code": "SL"},
    {"name": "Singapore", "code": "SG"},
    {"name": "Slovakia", "code": "SK"},
    {"name": "Slovenia", "code": "SI"},
    {"name": "Solomon Islands", "code": "SB"},
    {"name": "Somalia", "code": "SO"},
    {"name": "South Africa", "code": "ZA"},
    {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
    {"name": "Spain", "code": "ES"},
    {"name": "Sri Lanka", "code": "LK"},
    {"name": "Sudan", "code": "SD"},
    {"name": "Suriname", "code": "SR"},
    {"name": "Svalbard and Jan Mayen", "code": "SJ"},
    {"name": "Swaziland", "code": "SZ"},
    {"name": "Sweden", "code": "SE"},
    {"name": "Switzerland", "code": "CH"},
    {"name": "Syrian Arab Republic", "code": "SY"},
    {"name": "Taiwan, Province of China", "code": "TW"},
    {"name": "Tajikistan", "code": "TJ"},
    {"name": "Tanzania, United Republic of", "code": "TZ"},
    {"name": "Thailand", "code": "TH"},
    {"name": "Timor-Leste", "code": "TL"},
    {"name": "Togo", "code": "TG"},
    {"name": "Tokelau", "code": "TK"},
    {"name": "Tonga", "code": "TO"},
    {"name": "Trinidad and Tobago", "code": "TT"},
    {"name": "Tunisia", "code": "TN"},
    {"name": "Turkey", "code": "TR"},
    {"name": "Turkmenistan", "code": "TM"},
    {"name": "Turks and Caicos Islands", "code": "TC"},
    {"name": "Tuvalu", "code": "TV"},
    {"name": "Uganda", "code": "UG"},
    {"name": "Ukraine", "code": "UA"},
    {"name": "United Arab Emirates", "code": "AE"},
    {"name": "United Kingdom", "code": "GB"},
    {"name": "United States", "code": "US"},
    {"name": "United States Minor Outlying Islands", "code": "UM"},
    {"name": "Uruguay", "code": "UY"},
    {"name": "Uzbekistan", "code": "UZ"},
    {"name": "Vanuatu", "code": "VU"},
    {"name": "Venezuela", "code": "VE"},
    {"name": "Viet Nam", "code": "VN"},
    {"name": "Virgin Islands, British", "code": "VG"},
    {"name": "Virgin Islands, U.S.", "code": "VI"},
    {"name": "Wallis and Futuna", "code": "WF"},
    {"name": "Western Sahara", "code": "EH"},
    {"name": "Yemen", "code": "YE"},
    {"name": "Zambia", "code": "ZM"},
    {"name": "Zimbabwe", "code": "ZW"}
  ]
  domaines = [
    {"name" : "Communication et rédaction", "value" : "communication_redaction"},
    {"name" : "Comptabilité et Finance", "value" : "Comptabilite_finance"},
    {"name" : "Data", "value" : "data"},
    {"name" : "Design", "value" : "design"},
    {"name" : "Droit", "value" : "droit"},
    {"name" : "Gestion de projet", "value" : "gestion_projet"},
    {"name" : "IT & Developpement", "value" : "IT_developpement"},
    {"name" : "Marketing", "value" : "marketing"},
    {"name" : "Marketing digital", "value" : "marketing_digital"},
    {"name" : "Ressources Humaines", "value" : "ressources_humaines"},
    {"name" : "Stratégie et Business", "value" : "strategie_business"},
    {"name" : "Support client", "value" : "support_client"}
  ]
}
