import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/recruteur/profile.service';
@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilRecruteurComponent {

  constructor(
    private profileService : ProfileService,
  ) {}

  user !: any
  token !: any

  ngOnInit(): void {
    // user & token from localStroage
    const user = localStorage.getItem("user")
    this.user = user ? JSON.parse(user) : null
    const token = localStorage.getItem("token")
    this.token = token ? JSON.parse(token) : null

    this.getEntrepriseInfo()
    this.getAdminInfo()
    this.getPhoto('entreprise')
    this.getPhoto('representant')
    this.getVideo()
    this.getValeursHumaines()
  }

  entreprisePhoto !: any
  entreprise_photo_src !: string
  representantPhoto !: any
  representant_photo_src !: string
  getPhoto(user_type : string){
    this.profileService.getPhoto(this.token.accessToken,this.user.id,user_type)
    .subscribe((result : any) => {
      if(result.success){
        if(user_type == 'entreprise'){
          this.entreprisePhoto = result.photo
          this.entreprise_photo_src = result.url
        }else if(user_type == 'representant'){
          this.representantPhoto = result.photo
          this.representant_photo_src = result.url
        }
      }
    })
  }
  Video !: any
  getVideo(){
    this.profileService.getVideo(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        this.Video = result
      }
    })
  }
  // get Entreprise Information
  EntrepriseInfo : any
  pays_name : any
  domaine_name : any
  getEntrepriseInfo(){
    this.profileService.getEntrepriseInfo(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        this.EntrepriseInfo = result.entreprise_information
        this.pays_name = this.paysList.find(p => p.code == result.entreprise_information.pays)?.name
        this.domaine_name = this.domaines.find(d => d.value == result.entreprise_information.domaine)?.name
      }
    })
  }
  // get Entreprise Information
  AdminInfo : any
  getAdminInfo(){
    this.profileService.getAdminInfo(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        this.AdminInfo = result.admin_information
        console.log("get admin_information",this.AdminInfo)
      }
    })
  }
  // Valeurs Humaines
  isValeursHumainesCompleted : boolean = false
  getValeursHumaines(){
    this.profileService.getValeursHumaines(this.token.accessToken,this.user.id)
    .subscribe( (result : any) => {
      if(result.success){
        for(let i=0;i<Object.keys(result.valeurs_humaines).length;i++){
          let valeur_code = Object.keys(result.valeurs_humaines)[i]
          let valeur_status = Object.values(result.valeurs_humaines)[i]
          if(!(valeur_status=='id'||valeur_status=='created_at'||valeur_status=='updated_at')){
            let valeur_description = this.valeurs_descriptions.find(val_des => val_des.code == valeur_code)
            if(valeur_description){
              valeur_description.star = valeur_status==1?true : false
            }
          }
        }
        this.valeurs_descriptions.forEach(val_des => {
          if(val_des.star) this.isValeursHumainesCompleted=true
        });
      }
    })
  }



  Valeurs : string[] = [
    "L'agilité",
    "L'apprentissage continu",
    "L'authenticité",
    "L'efficacité",
    "L'empathie",
    "L'engagement envers le client",
    "L'excellence",
    "L'humilité",
    "L'innovation",
    "L'intégrité",
    "L'orientation client",
    "L'orientation résultats",
    "L'ouverture d'esprit",
    "La collaboration, Le travail d'équipe",
    "La communication",
    "La confiance",
    "La confiance en soi",
    "La confidentialité",
    "La créativité",
    "La croissance",
    "La croissance personnelle",
    "La culture de l'apprentissage",
    "La diversité et l'inclusion",
    "La durabilité",
    "La flexibilité",
    "La flexibilité de l'horaire",
    "La gestion du temps",
    "La loyauté",
    "La passion",
    "La qualité",
    "La qualité de vie au travail",
    "La réactivité",
    "La reconnaissance",
    "La résilience",
    "La résolution de problèmes",
    "La responsabilité environnementale",
    "La responsabilité personnelle",
    "La responsabilité sociale",
    "La sécurité",
    "La sécurité financière",
    "La transparence",
    "La volonté de prendre des risques",
    "Le respect"
  ]
  Descriptions : string[] = [
    "La capacité à s'adapter rapidement aux changements du marché et de l'environnement commercial.",
    "La volonté d'apprendre et d'améliorer les compétences, les connaissances et les pratiques professionnelles.",
    "La promotion d'une culture d'entreprise authentique qui reflète les valeurs et la mission de l'entreprise.",
    "La recherche de l'efficacité dans toutes les activités de l'entreprise pour optimiser les résultats.",
    "La capacité à comprendre les perspectives et les besoins des autres.",
    "La satisfaction du client comme priorité et la création d'une relation de confiance avec les clients.",
    "La poursuite de la qualité et de la perfection dans toutes les activités de l'entreprise.",
    "La capacité à reconnaître ses erreurs et à travailler pour les corriger.",
    "La recherche de nouvelles idées et la créativité pour améliorer la qualité des produits ou des services de l'entreprise.",
    "Le respect de l'éthique professionnelle et la prise de décisions éthiques.",
    "La priorité donnée aux besoins et aux attentes des clients.",
    "La priorité donnée aux résultats et à l'atteinte des objectifs de l'entreprise.",
    "La capacité à considérer différentes perspectives et à embrasser la diversité.",
    "La fidélité envers l'entreprise, les membres de l'équipe et les clients.",
    "L'engagement envers la mission de l'entreprise et la passion pour ce qu'elle fait.",
    "La recherche de la qualité dans toutes les activités de l'entreprise, du produit ou du service jusqu'à l'expérience client.",
    "La création d'un environnement de travail sain et équilibré pour les employés.",
    "La capacité à répondre rapidement aux besoins des clients et à résoudre les problèmes.",
    "La reconnaissance des réalisations et des contributions des membres de l'équipe.",
    "La capacité à surmonter les obstacles et les défis.",
    "La capacité à résoudre rapidement les problèmes et les défis rencontrés par l'entreprise.",
    "La prise en compte de l'impact de l'entreprise sur l'environnement et la promotion de pratiques durables.",
    "La prise de responsabilité individuelle pour les actions et les résultats.",
    "La prise en compte de l'impact de l'entreprise sur la société et l'environnement et la promotion d'une responsabilité sociale.",
    "La priorité donnée à la sécurité des employés, des clients et de tous ceux qui interagissent avec l'entreprise.",
    "La gestion financière responsable et la sécurité financière pour les employés, les clients et les actionnaires.",
    "La communication ouverte et honnête avec les parties prenantes de l'entreprise, y compris les employés, les clients et les actionnaires.",
    "La capacité à prendre des risques calculés pour atteindre les objectifs de l'entreprise.",
    "Être respectueux des autres, de leur temps, de leur travail et de leur opinion."
  ]
  valeurs_descriptions = [
    {
    "valeur" : "L'agilité",
    "code" : "agilite",
    "description" : "La capacité à s'adapter rapidement aux changements du marché et de l'environnement commercial.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'apprentissage continu",
    "code" : "apprentissage_continu",
    "description" : "La volonté d'apprendre et d'améliorer les compétences, les connaissances et les pratiques professionnelles.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'authenticité",
    "code" : "authenticite",
    "description" : "La promotion d'une culture d'entreprise authentique qui reflète les valeurs et la mission de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'efficacité",
    "code" : "efficacite",
    "description" : "La recherche de l'efficacité dans toutes les activités de l'entreprise pour optimiser les résultats.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'empathie",
    "code" : "empathie",
    "description" : "La capacité à comprendre les perspectives et les besoins des autres.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'engagement envers le client",
    "code" : "engagement_envers_client",
    "description" : "La satisfaction du client comme priorité et la création d'une relation de confiance avec les clients.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'excellence",
    "code" : "excellence",
    "description" : "La poursuite de la qualité et de la perfection dans toutes les activités de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'humilité",
    "code" : "humilite",
    "description" : "La capacité à reconnaître ses erreurs et à travailler pour les corriger.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'innovation",
    "code" : "innovation",
    "description" : "La recherche de nouvelles idées et la créativité pour améliorer la qualité des produits ou des services de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'intégrité",
    "code" : "integrite",
    "description" : "Le respect de l'éthique professionnelle et la prise de décisions éthiques.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'orientation client",
    "code" : "orientationeclient",
    "description" : "La priorité donnée aux besoins et aux attentes des clients.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'orientation résultats",
    "code" : "orientation_resultats",
    "description" : "La priorité donnée aux résultats et à l'atteinte des objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'ouverture d'esprit",
    "code" : "ouverture_esprit",
    "description" : "La capacité à considérer différentes perspectives et à embrasser la diversité.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La collaboration, Le travail d'équipe",
    "code" : "collaboration_travail_equipe",
    "description" : "La collaboration et la communication efficace entre les membres de l'équipe pour atteindre les objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La communication",
    "code" : "communication",
    "description" : "La promotion d'une communication claire et ouverte entre les membres de l'équipe et avec les clients.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La confiance",
    "code" : "confiance",
    "description" : "La confiance envers les membres de l'équipe, les clients et les partenaires commerciaux.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La confiance en soi",
    "code" : "confiance_en_soi",
    "description" : "La confiance en ses propres compétences et en la capacité de l'entreprise à réussir.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La confidentialité",
    "code" : "confidentialite",
    "description" : "La protection des données confidentielles des clients et des employés.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La créativité",
    "code" : "creativite",
    "description" : "La recherche de nouvelles idées et la capacité à innover dans les activités de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La croissance",
    "code" : "croissance",
    "description" : "La recherche d'une croissance durable de l'entreprise qui bénéficie à toutes les parties prenantes et assure une pérennité à long terme.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La croissance personnelle",
    "code" : "croissance_personnelle",
    "description" : "La promotion de la croissance personnelle et professionnelle des employés.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La culture de l'apprentissage",
    "code" : "culture_apprentissage",
    "description" : "La promotion de la formation continue et du développement des compétences des employés.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La diversité et l'inclusion",
    "code" : "diversite_inclusion",
    "description" : "La promotion d'un environnement de travail inclusif et diversifié où toutes les personnes sont traitées avec respect.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La durabilité",
    "code" : "durabilite",
    "description" : "La mise en place de pratiques durables pour minimiser l'impact environnemental de l'entreprise et promouvoir la durabilité à long terme.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La flexibilité",
    "code" : "flexibilite",
    "description" : "L'adaptabilité aux changements et aux défis, et la capacité à trouver des solutions créatives.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La flexibilité de l'horaire",
    "code" : "flexibilite_horaire",
    "description" : "La capacité à offrir des horaires de travail flexibles pour les employés afin de répondre à leurs besoins personnels et professionnels.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La gestion du temps",
    "code" : "gestion_temps",
    "description" : "La capacité à gérer efficacement son temps pour atteindre les objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La loyauté",
    "code" : "loyaute",
    "description" : "La fidélité envers l'entreprise, les membres de l'équipe et les clients.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La passion",
    "code" : "passion",
    "description" : "L'engagement envers la mission de l'entreprise et la passion pour ce qu'elle fait.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La qualité",
    "code" : "qualite",
    "description" : "La recherche de la qualité dans toutes les activités de l'entreprise, du produit ou du service jusqu'à l'expérience client.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La qualité de vie au travail",
    "code" : "qualite_vie_travail",
    "description" : "La création d'un environnement de travail sain et équilibré pour les employés.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La réactivité",
    "code" : "reactivite",
    "description" : "La capacité à répondre rapidement aux besoins des clients et à résoudre les problèmes.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La reconnaissance",
    "code" : "reconnaissance",
    "description" : "La reconnaissance des réalisations et des contributions des membres de l'équipe.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La résilience",
    "code" : "resilience",
    "description" : "La capacité à surmonter les obstacles et les défis.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La résolution de problèmes",
    "code" : "resolution_problemes",
    "description" : "La capacité à résoudre rapidement les problèmes et les défis rencontrés par l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La responsabilité environnementale",
    "code" : "responsabilite_environnementale",
    "description" : "La prise en compte de l'impact de l'entreprise sur l'environnement et la promotion de pratiques durables.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La responsabilité personnelle",
    "code" : "responsabilite_personnelle",
    "description" : "La prise de responsabilité individuelle pour les actions et les résultats.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La responsabilité sociale",
    "code" : "responsabilite_sociale",
    "description" : "La prise en compte de l'impact de l'entreprise sur la société et l'environnement et la promotion d'une responsabilité sociale.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La sécurité",
    "code" : "securite",
    "description" : "La priorité donnée à la sécurité des employés, des clients et de tous ceux qui interagissent avec l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La sécurité financière",
    "code" : "securite_financiere",
    "description" : "La gestion financière responsable et la sécurité financière pour les employés, les clients et les actionnaires.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La transparence",
    "code" : "transparence",
    "description" : "La communication ouverte et honnête avec les parties prenantes de l'entreprise, y compris les employés, les clients et les actionnaires.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La volonté de prendre des risques",
    "code" : "volonte_prendre_risques",
    "description" : "La capacité à prendre des risques calculés pour atteindre les objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "Le respect",
    "code" : "respect",
    "description" : "Être respectueux des autres, de leur temps, de leur travail et de leur opinion.",
    "isExpanded" : false,
    "star" : false
    }
  ]
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
