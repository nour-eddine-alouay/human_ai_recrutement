import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/candidat/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileCandidatComponent implements OnInit{

  constructor(
    private formBuilder : FormBuilder,
    private profileService : ProfileService,
  ) {}

  personalInfoForm !: FormGroup
  ProfessionalInfoForm !: FormGroup
  addFormationForm !: FormGroup
  addExperienceForm !: FormGroup
  addCertificationForm !: FormGroup
  settingsForm !: FormGroup
  selectedTab !: number
  user !: any
  token !: any

  ngOnInit(): void {
    // selected tab
    const profilSelectedTab = localStorage.getItem('profilSelectedTab')
    if(profilSelectedTab) this.selectedTab = parseInt(profilSelectedTab)
    // user & token from localStroage
    const user = localStorage.getItem("user")
    this.user = user ? JSON.parse(user) : null
    const token = localStorage.getItem("token")
    this.token = token ? JSON.parse(token) : null
    // personalInfoForm
    this.personalInfoForm = this.formBuilder.group({
      nom : [this.PersonalInfo?.nom?this.PersonalInfo.nom:'',[
        Validators.required,
      ]],
      prenom : [this.PersonalInfo?.prenom?this.PersonalInfo.prenom:'',[
        Validators.required,
      ]],
      civilite : [this.PersonalInfo?.civilite?this.PersonalInfo.civilite:'',[
        Validators.required,
      ]],
      etat_civilite : [this.PersonalInfo?.etat_civilite?this.PersonalInfo.etat_civilite:'',[
        Validators.required,
      ]],
      date_naissance : [this.PersonalInfo?.date_naissance?this.PersonalInfo.date_naissance:'',[
        Validators.required,
      ]],
      telephone : [this.PersonalInfo?.telephone?this.PersonalInfo.telephone:'',[
        Validators.required,
      ]],
      pays : [this.PersonalInfo?.pays?this.PersonalInfo.pays:'',[
        Validators.required,
      ]],
      ville : [this.PersonalInfo?.ville?this.PersonalInfo.ville:'',[
        Validators.required,
      ]],
      linkedin : [this.PersonalInfo?.linkedin?this.PersonalInfo.linkedin:'',[
        Validators.required,
      ]],
      skype : [this.PersonalInfo?.skype?this.PersonalInfo.skype:''],
    })
    // ProfessionalInfoForm
    this.ProfessionalInfoForm = this.formBuilder.group({
      domaine : [this.ProfessionalInfo?.domaine?this.ProfessionalInfo.domaine:'',[
        Validators.required,
      ]],
      profession : [this.ProfessionalInfo?.profession?this.ProfessionalInfo.profession:'',[
        Validators.required,
      ]],
      competences : [],
      apercu : [this.ProfessionalInfo?.apercu?this.ProfessionalInfo.apercu:'',[
        Validators.required,
      ]],
      niveau_etude : [this.ProfessionalInfo?.niveau_etude?this.ProfessionalInfo.niveau_etude:'',[
        Validators.required,
      ]],
      niveau_experience : [this.ProfessionalInfo?.niveau_experience?this.ProfessionalInfo.niveau_experience:'',[
        Validators.required,
      ]],
      cv : new FormControl(null),
      video : new FormControl(null)
    })
    // addFormationForm
    this.addFormationForm = this.formBuilder.group({
      date_debut : ['',[
        Validators.required,
      ]],
      date_fin : ['',[
        Validators.required,
      ]],
      nom : ['',[
        Validators.required,
      ]],
      diplome : ['',[
        Validators.required,
      ]],
      etat : ['en_cours',[
        Validators.required,
      ]],
      etablissement : ['',[
        Validators.required,
      ]],
      description : ['']
    })
    // addExperienceForm
    this.addExperienceForm = this.formBuilder.group({
      date_debut : ['',[
        Validators.required,
      ]],
      date_fin : ['',[
        Validators.required,
      ]],
      poste : ['',[
        Validators.required,
      ]],
      entreprise : ['',[
        Validators.required,
      ]],
      etat : ['',[
        Validators.required,
      ]],
      description : ['']
    })
    // addCertificationForm
    this.addCertificationForm = this.formBuilder.group({
      date_debut : ['',[
        Validators.required,
      ]],
      date_fin : ['',[
        Validators.required,
      ]],
      nom : ['',[
        Validators.required,
      ]],
      autorite : ['',[
        Validators.required,
      ]],
      licence : ['']
    })
    // settingsForm
    this.settingsForm = this.formBuilder.group({
      old_password : ['',[
        Validators.required,
      ]],
      new_password : ['',[
        Validators.required,
        // At least 8 characters in length Lowercase letters Uppercase letters Numbers Special characters.
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      repeat_new_password : ['',[
        Validators.required,
      ]]
    })
    this.minVal = 0
    this.maxVal = 15
    this.getPersonalInfo()
    this.getProfessionalInfo()
    this.getAllFormations()
    this.getAllExperiences()
    this.getAllCertifications()
    this.getValeursHumaines()
    this.getCV()
    this.getVideo()
    this.getPhoto()
  }

  selectTab(tabNumber : any){
    this.selectedTab = tabNumber
    localStorage.setItem('profilSelectedTab', tabNumber);
  }

  // getters -> personalInfoForm
  get nom(){return this.personalInfoForm.controls['nom'];}
  get prenom(){return this.personalInfoForm.controls['prenom'];}
  get civilite(){return this.personalInfoForm.controls['civilite'];}
  get etat_civilite(){return this.personalInfoForm.controls['etat_civilite'];}
  get date_naissance(){return this.personalInfoForm.controls['date_naissance'];}
  get telephone(){return this.personalInfoForm.controls['telephone'];}
  get pays(){return this.personalInfoForm.controls['pays'];}
  get ville(){return this.personalInfoForm.controls['ville'];}
  get linkedin(){return this.personalInfoForm.controls['linkedin'];}
  get skype(){return this.personalInfoForm.controls['skype'];}
  // getters -> ProfessionalInfoForm
  get domaine(){return this.ProfessionalInfoForm.controls['domaine'];}
  get profession(){return this.ProfessionalInfoForm.controls['profession'];}
  get competences(){return this.ProfessionalInfoForm.controls['competences'];}
  get apercu(){return this.ProfessionalInfoForm.controls['apercu'];}
  get niveau_etude(){return this.ProfessionalInfoForm.controls['niveau_etude'];}
  get niveau_experience(){return this.ProfessionalInfoForm.controls['niveau_experience'];}
  get cv(){return this.ProfessionalInfoForm.controls['cv'];}
  get video(){return this.ProfessionalInfoForm.controls['video'];}
  // getters -> addFormationForm
  get date_debut_formation(){return this.addFormationForm.controls['date_debut'];}
  get date_fin_formation(){return this.addFormationForm.controls['date_fin'];}
  get nom_formation(){return this.addFormationForm.controls['nom'];}
  get diplome(){return this.addFormationForm.controls['diplome'];}
  get etat_formation(){return this.addFormationForm.controls['etat'];}
  get etablissement(){return this.addFormationForm.controls['etablissement'];}
  get description_formation(){return this.addFormationForm.controls['description'];}
  // getters -> addExperienceForm
  get date_debut_experience(){return this.addExperienceForm.controls['date_debut'];}
  get date_fin_experience(){return this.addExperienceForm.controls['date_fin'];}
  get poste(){return this.addExperienceForm.controls['poste'];}
  get entreprise(){return this.addExperienceForm.controls['entreprise'];}
  get etat_experience(){return this.addExperienceForm.controls['etat'];}
  get description_experience(){return this.addExperienceForm.controls['description'];}
  // getters -> addCertificationForm
  get date_debut_certification(){return this.addCertificationForm.controls['date_debut'];}
  get date_fin_certification(){return this.addCertificationForm.controls['date_fin'];}
  get nom_certification(){return this.addCertificationForm.controls['nom'];}
  get autorite(){return this.addCertificationForm.controls['autorite'];}
  get licence(){return this.addCertificationForm.controls['licence'];}
  // getters -> settingsForm
  get old_password(){return this.settingsForm.controls['old_password'];}
  get repeat_new_password(){return this.settingsForm.controls['repeat_new_password'];}
  get new_password(){return this.settingsForm.controls['new_password'];}


  // photo
  uploadedPhoto !: File
  uploadPhoto(event : any) {
    this.uploadedPhoto = event.target.files[0]
    console.log(this.uploadedPhoto)
    // upload CV
    if(this.uploadedPhoto){
      const formData = new FormData()
      formData.append('file',this.uploadedPhoto,this.uploadedPhoto.name)
      formData.append('file_type','photo')
      formData.append('user_type','candidat')
      formData.append('user_id',this.user.id)
      this.profileService.uploadFile(this.token.accessToken,formData)
      .subscribe((result  :any) => {
        this.Photo = result.photo
        this.photo_src = result.url
      })
    }
  }
  Photo !: any
  photo_src !: string
  getPhoto(){
    this.profileService.getPhoto(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        this.Photo = result.photo
        this.photo_src = result.url
      }
    })
  }
  // getPersonalInfo
  PersonalInfo !: any
  pays_name !: any
  getPersonalInfo(){
    this.profileService.getPersonalInfo(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        this.PersonalInfo = result.personal_information
        this.pays_name = this.paysList.find(p => p.code == result.personal_information.pays)?.name
        this.personalInfoForm.patchValue({
          nom: result.personal_information.nom,
          prenom: result.personal_information.prenom,
          civilite: result.personal_information.civilite,
          etat_civilite: result.personal_information.etat_civilite,
          date_naissance: result.personal_information.date_naissance,
          telephone: result.personal_information.telephone,
          pays: result.personal_information.pays,
          ville: result.personal_information.ville,
          linkedin: result.personal_information.linkedin,
          skype: result.personal_information.skype
        });
      }
    })
  }
  // getProfessionalInfo
  ProfessionalInfo !: any
  getProfessionalInfo(){
    this.profileService.getProfessionalInfo(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      console.log("ProfessionalInfo",result)
      if(result.success){
        this.ProfessionalInfo = result.professional_information
        this.ProfessionalInfoForm.patchValue({
          domaine: result.professional_information.domaine,
          profession: result.professional_information.profession,
          apercu: result.professional_information.apercu,
          niveau_etude: result.professional_information.niveau_etude,
          niveau_experience: result.professional_information.niveau_experience
        });
        this.competencesArray = result.professional_information.competences?result.professional_information.competences:[]
      }
    })
  }
  // savePersonalInfo
  savePersonalInfo(){
    this.PersonalInfo.nom = this.nom.value
    this.PersonalInfo.prenom = this.prenom.value
    this.PersonalInfo.civilite = this.civilite.value
    this.PersonalInfo.etat_civilite = this.etat_civilite.value
    this.PersonalInfo.date_naissance = this.date_naissance.value
    this.PersonalInfo.telephone = this.telephone.value
    this.PersonalInfo.pays = this.pays.value
    this.PersonalInfo.ville = this.ville.value
    this.PersonalInfo.linkedin = this.linkedin.value
    this.PersonalInfo.skype = this.skype.value
    this.profileService.savePersonalInfo(this.token.accessToken,this.PersonalInfo)
    .subscribe((result : any) => {
      if(result.success){
        this.PersonalInfo = result.personal_information
        this.showToast("success","Mis à jour avec succès","Donées personnelles mis à jour avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de mis à jour des donées personnelles.")
      }
    })
  }
  // saveProfessionalInfo
  uploadedCV !: File
  uploadCV(event : any) {
    this.uploadedCV = event.target.files[0]
  }
  uploadedVideo !: File
  uploadVideo(event : any) {
    this.uploadedVideo = event.target.files[0];
  }
  saveProfessionalInfo(){
    console.log(this.competencesArray)
    this.ProfessionalInfo.domaine = this.domaine.value
    this.ProfessionalInfo.profession = this.profession.value
    this.ProfessionalInfo.competences = this.competencesArray
    this.ProfessionalInfo.apercu = this.apercu.value
    this.ProfessionalInfo.niveau_etude = this.niveau_etude.value
    this.ProfessionalInfo.niveau_experience = this.niveau_experience.value
    this.profileService.saveProfessionalInfo(this.token.accessToken,this.ProfessionalInfo)
    .subscribe((result : any) => {
      if(result.success){
        this.ProfessionalInfo = result.professional_information
        this.showToast("success","Mis à jour avec succès","Donées professionnelles mis à jour avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de mis à jour des donées professionnelles.")
      }
    })
    // upload CV
    if(this.uploadedCV){
      const formData = new FormData()
      formData.append('file',this.uploadedCV,this.uploadedCV.name)
      formData.append('file_type','cv')
      formData.append('user_id',this.user.id)
      this.profileService.uploadFile(this.token.accessToken,formData)
      .subscribe((result  :any) => {
        this.CV = result.cv
        console.log(result)
      })
    }
    // upload Video
    if(this.uploadedVideo){
      const formData = new FormData()
      formData.append('file',this.uploadedVideo,this.uploadedVideo.name)
      formData.append('file_type','video')
      formData.append('user_type','candidat')
      formData.append('user_id',this.user.id)
      this.profileService.uploadFile(this.token.accessToken,formData)
      .subscribe((result  :any) => {
        this.Video = result.video
        console.log(result)
      })
    }
  }
  // get cv
  CV !: any
  getCV(){
    this.profileService.getCV(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        this.CV = result.cv
      }
    })
  }
  // get video
  Video !: any
  getVideo(){
    this.profileService.getVideo(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        this.Video = result.video
      }
    })
  }
  // Formation
  Formations !: any
  addFormation(){
    this.profileService.addFormation(this.token.accessToken,this.user.id,this.addFormationForm.value)
    .subscribe( (result : any) => {
      if(result.success){
        this.Formations.push(result.formation)
        this.Formations = this.Formations.sort(this.compareByDateFin)
        this.showToast("success","Ajout avec succès","Formation ajouté avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors d'ajout de formation.")
      }
    })
  }
  getAllFormations(){
    this.profileService.getAllFormations(this.token.accessToken,this.user.id)
    .subscribe( (result : any) => {
      this.Formations = result.sort(this.compareByDateFin)
    })
  }
  onEditFormation : boolean = false
  deleteFormation(id : string){
    this.profileService.deleteFormation(this.token.accessToken,id)
    .subscribe( (result : any) => {
      if(result.success){
        this.Formations = this.Formations.filter( (formation : any) => formation.id != id)
        this.Formations = this.Formations.sort(this.compareByDateFin)
        this.addFormationForm.reset()
        this.showToast("success","Suppression avec succès","Formation supprimé avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de suppression de formation.")
      }
    })
  }
  formation !: any
  getFormation(id : string){
    this.profileService.getFormation(this.token.accessToken,id)
    .subscribe((result : any) => {
      if(result.success ){
        this.formation = result.formation
      }
    })
  }
  editedFormationID !: string
  launchEditFormation(id : string){
    this.onEditFormation = true
    this.addFormationForm.reset()
    this.profileService.getFormation(this.token.accessToken,id)
    .subscribe((result : any) => {
      if(result.success){
        this.editedFormationID = id
        this.date_debut_formation.setValue(result.formation.date_debut)
        this.date_fin_formation.setValue(result.formation.date_fin)
        this.nom_formation.setValue(result.formation.nom)
        this.diplome.setValue(result.formation.diplome)
        this.etat_formation.setValue(result.formation.etat)
        this.etablissement.setValue(result.formation.etablissement)
        this.description_formation.setValue(result.formation.description)
      }
    })
  }
  editFormation(){
    this.profileService.editFormation(this.token.accessToken,this.editedFormationID,this.addFormationForm.value)
    .subscribe( (result : any) => {
      if(result.success){
        let editedFormation = this.Formations.filter( (formation : any) => formation.id == result.formation.id)
        editedFormation = result.formation
        const index = this.Formations.findIndex((formation: any) => formation.id == editedFormation.id)
        this.Formations.splice(index, 1, editedFormation)
        this.Formations = this.Formations.sort(this.compareByDateFin)
        this.showToast("success","Modification avec succès","Formation modifié avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de modification de formation.")
      }
    })
  }
  // Experience
  Experiences !: any
  addExperience(){
    this.profileService.addExperience(this.token.accessToken,this.user.id,this.addExperienceForm.value)
    .subscribe( (result : any) => {
      if(result.success){
        this.Experiences.push(result.experience)
        this.Experiences = this.Experiences.sort(this.compareByDateFin)
        this.showToast("success","Ajout avec succès","Experience ajouté avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors d'ajout d'experience.")
      }
    })
  }
  getAllExperiences(){
    this.profileService.getAllExperiences(this.token.accessToken,this.user.id)
    .subscribe( (result : any) => {
      this.Experiences = result.sort(this.compareByDateFin)
    })
  }
  onEditExperience : boolean = false
  deleteExperience(id : string){
    this.profileService.deleteExperience(this.token.accessToken,id)
    .subscribe((result : any) => {
      if(result.success){
        this.Experiences = this.Experiences.filter((experience : any) => experience.id != id)
        this.Experiences = this.Experiences.sort(this.compareByDateFin)
        this.addExperienceForm.reset()
        this.showToast("success","Suppression avec succès","Experience supprimé avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de suppression d'experience.")
      }
    })
  }
  experience !: any
  getExperience(id : string){
    this.profileService.getExperience(this.token.accessToken,id)
    .subscribe((result : any) => {
      if(result.success ){
        this.experience = result.experience
      }
    })
  }
  editedExperienceID !: string
  launchEditExperience(id : string){
    this.onEditExperience = true
    this.addExperienceForm.reset()
    this.profileService.getExperience(this.token.accessToken,id)
    .subscribe((result : any) => {
      if(result.success){
        this.editedExperienceID = id
        this.date_debut_experience.setValue(result.experience.date_debut)
        this.date_fin_experience.setValue(result.experience.date_fin)
        this.poste.setValue(result.experience.poste)
        this.entreprise.setValue(result.experience.entreprise)
        this.etat_experience.setValue(result.experience.etat)
        this.description_experience.setValue(result.experience.description)
      }
    })
  }
  editExperience(){
    this.profileService.editExperience(this.token.accessToken,this.editedExperienceID,this.addExperienceForm.value)
    .subscribe( (result : any) => {
      if(result.success){
        let editedExperience = this.Experiences.filter( (experience : any) => experience.id == result.experience.id)
        editedExperience = result.experience
        const index = this.Experiences.findIndex((experience: any) => experience.id == editedExperience.id)
        this.Experiences.splice(index, 1, editedExperience)
        this.Experiences = this.Experiences.sort(this.compareByDateFin)
        this.showToast("success","Modification avec succès","Experience modifié avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de modification d'experience.")
      }
    })
  }
  // Certification
  Certifications !: any
  addCertification(){
    this.profileService.addCertification(this.token.accessToken,this.user.id,this.addCertificationForm.value)
    .subscribe( (result : any) => {
      if(result.success){
        this.Certifications.push(result.certification)
        this.Certifications = this.Certifications.sort(this.compareByDateFin)
        this.showToast("success","Ajout avec succès","Certification ajouté avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors d'ajout de certification.")
      }
    })
  }
  getAllCertifications(){
    this.profileService.getAllCertifications(this.token.accessToken,this.user.id)
    .subscribe( (result : any) => {
      this.Certifications = result.sort(this.compareByDateFin)
    })
  }
  onEditCertification : boolean = false
  deleteCertification(id : string){
    this.profileService.deleteCertification(this.token.accessToken,id)
    .subscribe( (result : any) => {
      if(result.success){
        this.Certifications = this.Certifications.filter( (certification : any) => certification.id != id)
        this.Certifications = this.Certifications.sort(this.compareByDateFin)
        this.addCertificationForm.reset()
        this.showToast("success","Suppression avec succès","Certification supprimé avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de suppression de certification.")
      }
    })
  }
  certification !: any
  getCertification(id : string){
    this.profileService.getCertification(this.token.accessToken,id)
    .subscribe((result : any) => {
      if(result.success ){
        this.certification = result.certification
      }
    })
  }
  editedCertificationID !: string
  launchEditCertification(id : string){
    this.onEditCertification = true
    this.addCertificationForm.reset()
    this.profileService.getCertification(this.token.accessToken,id)
    .subscribe((result : any) => {
      if(result.success){
        this.editedCertificationID = id
        this.date_debut_certification.setValue(result.certification.date_debut)
        this.date_fin_certification.setValue(result.certification.date_fin)
        this.nom_certification.setValue(result.certification.nom)
        this.autorite.setValue(result.certification.autorite)
        this.licence.setValue(result.certification.licence)
      }
    })
  }
  editCertification(){
    this.profileService.editCertification(this.token.accessToken,this.editedCertificationID,this.addCertificationForm.value)
    .subscribe( (result : any) => {
      if(result.success){
        let editedCertification = this.Certifications.filter( (certification : any) => certification.id == result.certification.id)
        editedCertification = result.certification
        const index = this.Certifications.findIndex((certification: any) => certification.id == editedCertification.id)
        this.Certifications.splice(index, 1, editedCertification)
        this.Certifications = this.Certifications.sort(this.compareByDateFin)
        this.showToast("success","Modification avec succès","Certification modifié avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Une erreur s'est produite lors de modification de certification.")
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
  toggleValeurHumaine(index : number){
    this.valeurs_descriptions[index].star = !this.valeurs_descriptions[index].star
    this.profileService.toggleValeurHumaine(this.token.accessToken,this.user.id,this.valeurs_descriptions[index].code)
    .subscribe( (result : any) => {
      console.log(result)
      // first value check => valeurs completé
      if(result.status && !this.isValeursHumainesCompleted) this.isValeursHumainesCompleted = true;
      // last value incheck => valeurs non completé
      if(!result.status && this.isValeursHumainesCompleted){
        let isAllFalse = true
        this.valeurs_descriptions.forEach(val_des => {
          if(val_des.star) isAllFalse = false
        });
        if(isAllFalse)this.isValeursHumainesCompleted=false
      }
    })
  }
  // competences
  competencesArray: any[] = []
  removeCompetence(i: number){
    this.competencesArray.splice(i, 1)
    if (this.competencesArray.length < 1) {
      this.ProfessionalInfoForm.setErrors({competencesArrayEmpty: true});
    }
  }
  addCompetence(){
    if(this.competences.value.trim() != ''){
      this.competencesArray.push(this.competences.value)
      this.competences.reset();
      if (this.competencesArray.length < 1) {
        this.ProfessionalInfoForm.setErrors({competencesArrayEmpty: true});
      }
    }
  }

  toast_status !: string
  toast_header !: string
  toast_message !: string
  showToast(status : string,header  :string,message : string){
    this.toast_status = status
    this.toast_header = header
    this.toast_message = message
    const toast = document.querySelector('.toast')
    toast?.classList.add("show")
    setTimeout(() => {
      toast?.classList.remove("show")
    }, 4000)
  }
  // changePassword
  changePassword(){
    this.profileService.changePassword(this.token.accessToken,this.user?.id,this.old_password.value,this.new_password.value)
    .subscribe((result : any) => {
      if(result.success){
        this.showToast("success","Mis à jour avec succès","Mot de passe mis à jour avec succès.")
      }else{
        this.showToast("warning","Une erreur s'est produite","Le mot de passe actuel que vous avez saisi est incorrect !")
      }
    })
  }
  // forms methodes
  // show password
  new_passwordFieldType = 'password'
  new_passwordIcon = 'fa fa-eye'
  toggleShowNewPassword(){
    this.new_passwordFieldType = this.new_passwordFieldType === 'password' ? 'text' : 'password';
    this.new_passwordIcon = this.new_passwordIcon === 'fa fa-eye' ? 'fa fa-eye-slash' : 'fa fa-eye';
  }
  old_passwordFieldType = 'password'
  old_passwordIcon = 'fa fa-eye'
  toggleShowOldPassword(){
    this.old_passwordFieldType = this.old_passwordFieldType === 'password' ? 'text' : 'password';
    this.old_passwordIcon = this.old_passwordIcon === 'fa fa-eye' ? 'fa fa-eye-slash' : 'fa fa-eye';
  }
  // invalid Touched Dirty FormControl
  invalidTouchedDirtyFormControl(formGroup : FormGroup,formControlName : string){
    return formGroup.controls[formControlName]?.invalid &&
      (formGroup.controls[formControlName]?.touched
        || formGroup.controls[formControlName]?.dirty);
  }
  getDate(date : string): Date {
    return new Date(date)
  }
  compareByDateFin(a: any, b: any): number {
    const dateA = new Date(a.date_fin)
    const dateB = new Date(b.date_fin)
    return dateA.getTime() - dateB.getTime()
  }
  // pagination valeurs
  minVal !: number
  maxVal !: number
  firstNWordOfString(s: string, n: number): string {
    const words = s.split(' ')
    return words.slice(0, n).join(' ')
  }
  // ------------------------------------------------------------------------------------------------
  // data
  // ------------------------------------------------------------------------------------------------
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
  experiences = [
    {"name" : "Jeune diplômé, débutant (&lt; 1 an)", "value" : "diplome"},
    {"name" : "De 1 à 2 ans", "value" : "entre_1_2"},
    {"name" : "De 2 à 4 ans", "value" : "entre_2_4"},
    {"name" : "De 4 à 6 ans", "value" : "entre_4_6"},
    {"name" : "De 7 à 10 ans", "value" : "entre_7_10"},
    {"name" : "Supérieur à 10 ans", "value" : "sup_10"}
  ]
}
