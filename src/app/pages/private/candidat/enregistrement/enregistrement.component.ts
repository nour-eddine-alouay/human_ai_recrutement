import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { ShareButtonsComponent } from 'src/app/components/candidat/share-buttons/share-buttons.component';
import { EnregistrementService } from 'src/app/services/candidat/enregistrement.service';
import { OffreService } from 'src/app/services/candidat/offre.service';
import { PostuleService } from 'src/app/services/candidat/postule.service';

@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.css'],
})
export class EnregistrementComponent {
  showFilter = false;
  isPays = false;
  isModeTravail = false;
  isContrat = false;
  isDomaine = false;
  min_salaire!: number;
  max_salaire!: number;
  pays = 'Pays';
  modeTravail = 'Mode de travail';
  contrat = 'Contrat';
  domaine = 'Domaine';

  // pagination
  currentPage = 1;
  totalPages = 1;
  pageNumbers!: any[];

  user!: any;
  token!: any;
  enregistrements: any[] = [];
  filtredOffres: any[] = [];

  postuleForm!: FormGroup;

  constructor(
    private offreService: OffreService,
    private postuleService: PostuleService,
    private formBuilder: FormBuilder,
    private enregistrementService: EnregistrementService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ShareButtonsComponent, {
      data: {
        link: 'https://material.angular.io/components/dialog/overview',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : null;
    this.filterOffers(1);

    // settingsForm
    this.postuleForm = this.formBuilder.group({
      lettre: ['', [Validators.required]],
    });
  }
  get lettre() {
    return this.postuleForm.controls['lettre'];
  }

  toggleFilters() {
    this.showFilter = !this.showFilter;
    this.filterOffers(1)
  }

  kaywords: string = '';
  filterOffers(page: number) {
    const searchRequest: any = {
      keywords: this.kaywords,
      pays:
        this.pays == 'Tout' || this.pays == 'Pays' || !this.showFilter
          ? 'Tout'
          : this.paysList.find((p) => p.name == this.pays)?.code,
      contrat:
        this.contrat == 'Tout' || this.contrat == 'Contrat' || !this.showFilter
          ? 'Tout'
          : this.contrat,
      modeTravail:
        this.modeTravail == 'Tout' ||
        this.modeTravail == 'Mode de travail' ||
        !this.showFilter
          ? 'Tout'
          : this.modeTravail,
      domaine:
        this.domaine == 'Tout' || this.domaine == 'Domaine' || !this.showFilter
          ? 'Tout'
          : this.domaines.find((d) => d.name == this.domaine)?.value,
      min_salaire: this.min_salaire && this.showFilter ? this.min_salaire : 0,
      max_salaire: this.max_salaire && this.showFilter ? this.max_salaire : 0,
    };
    this.enregistrementService.filterOffers(this.token.accessToken, page, searchRequest).subscribe((result: any) => {
        if (result.success) {
          console.log(result)
          this.enregistrements = this.filtredOffres = result.enregistrements.data;
          this.currentPage = result.enregistrements.current_page;
          this.totalPages = result.enregistrements.last_page;
          this.pageNumbers = Array(this.totalPages).fill(0).map((_, i) => i + 1);
          this.getUniqueOffresEntreprises()
        }
      });
  }
  changePage(page: number) {
    this.filterOffers(page);
  }

  voirDetails(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: { id: id},
    };
    this.router.navigate(['/candidat/offre-details'], navigationExtras);
  }

  toggleOffreEnregistrement(offre_id: number) {
    this.enregistrementService.toggleOffreEnregistrement(this.token.accessToken, this.user.id,offre_id).subscribe((result:any) => {
      if(result.success){
        this.filtredOffres = this.filtredOffres.filter((offre:any)=>offre.id!=offre_id)
        this.showToast("success","Offre retiré",result.message)
      }else{
        this.showToast("warning","Offre non retiré",result.message)
      }
      console.log(result)
    });
  }

  uniqueOffresEntreprises!:any[]
  getUniqueOffresEntreprises(){
    this.uniqueOffresEntreprises = [...new Set(this.filtredOffres.map((offre: any) => offre.image_url))];
  }

  titreOffrePostule!:string
  idOffrePostule!:number
  initPostule(id : number,titre : string){
    this.titreOffrePostule = titre
    this.idOffrePostule = id
  }
  addPostule(){
    const postule : any = {
      "lettre" : this.lettre.value,
      "candidat_id" : this.user.id,
      "offre_id" : this.idOffrePostule
    }
    this.postuleService.addPostule(this.token.accessToken,postule).subscribe((result:any)=>{
      if(result.success){
        this.showToast("success","Postule envoyée",result.message)
      }else{
        this.showToast("warning","Postule non envoyée",result.message)
      }
    })
  }

  toast_status!: string;
  toast_header!: string;
  toast_message!: string;
  showToast(status: string, header: string, message: string) {
    this.toast_status = status;
    this.toast_header = header;
    this.toast_message = message;
    const toast = document.querySelector('.toast');
    toast?.classList.add('show');
    setTimeout(() => {
      toast?.classList.remove('show');
    }, 4000);
  }
  firstNWordOfString(s: string, n: number): string {
    const words = s.split(' ');
    if (words.length > n) return words.slice(0, n).join(' ') + '...';
    return words.slice(0, n).join(' ');
  }
  selectPays(value: string) {
    this.isPays = false;
    this.pays = value;
    this.filterOffers(1);
  }
  selectContrat(value: string) {
    this.isContrat = false;
    this.contrat = value;
    this.filterOffers(1);
  }
  selectModeTravail(value: string) {
    this.isModeTravail = false;
    this.modeTravail = value;
    this.filterOffers(1);
  }
  selectDomaine(value: string) {
    this.isDomaine = false;
    this.domaine = value;
    this.filterOffers(1);
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!(event.target as HTMLElement)?.closest('.selectbox')) {
      this.isModeTravail = false;
      this.isContrat = false;
      this.isPays = false;
    }
  }
  // invalid Touched Dirty FormControl
  invalidTouchedDirtyFormControl(
    formGroup: FormGroup,
    formControlName: string
  ) {
    return (
      formGroup.controls[formControlName]?.invalid &&
      (formGroup.controls[formControlName]?.touched ||
        formGroup.controls[formControlName]?.dirty)
    );
  }

  paysList = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'land Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: "Cote D'Ivoire", code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: "Korea, Democratic People'S Republic of", code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: "Lao People'S Democratic Republic", code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montenegro', code: 'ME' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ];
  domaines = [
    { name: 'Communication et rédaction', value: 'communication_redaction' },
    { name: 'Comptabilité et Finance', value: 'Comptabilite_finance' },
    { name: 'Data', value: 'data' },
    { name: 'Design', value: 'design' },
    { name: 'Droit', value: 'droit' },
    { name: 'Gestion de projet', value: 'gestion_projet' },
    { name: 'IT & Developpement', value: 'IT_developpement' },
    { name: 'Marketing', value: 'marketing' },
    { name: 'Marketing digital', value: 'marketing_digital' },
    { name: 'Ressources Humaines', value: 'ressources_humaines' },
    { name: 'Stratégie et Business', value: 'strategie_business' },
    { name: 'Support client', value: 'support_client' },
  ];
}
