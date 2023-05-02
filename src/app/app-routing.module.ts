import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// public : ---------------------------------------------------------
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { ContactComponent } from './pages/public/contact/contact.component';
import { ForgotPasswordComponent } from './pages/public/forgot-password/forgot-password/forgot-password.component';;
import { ResetPasswordComponent } from './pages/public/reset-password/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/public/verify-email/verify-email.component';
// candidat
import { AccueilCandidatComponent } from './pages/public/accueil-candidat/accueil-candidat.component';
// recruteur
import { AccueilRecruteurComponent } from './pages/public/accueil-recruteur/accueil-recruteur.component';
// private : --------------------------------------------------------
// candidat
import { HomeCandidatComponent } from './pages/private/candidat/home/home.component';
import { ProfileCandidatComponent } from './pages/private/candidat/profile/profile.component';
import { ProfileRecruteurComponent } from './pages/private/recruteur/profile/profile.component';
import { ActualitesCandidatComponent } from './pages/private/candidat/actualites/actualites.component';
import { OffreDetailsComponent } from './pages/private/candidat/offre-details/offre-details.component';
import { EnregistrementComponent } from './pages/private/candidat/enregistrement/enregistrement.component';
import { EntreprisesComponent } from './pages/private/candidat/entreprises/entreprises.component';
import { EntrepriseDetailsComponent } from './pages/private/candidat/entreprise-details/entreprise-details.component';
import { CandidaturesComponent } from './pages/private/candidat/candidatures/candidatures.component';
import { MonProfilCandidatComponent } from './pages/private/candidat/mon-profil/mon-profil.component';
// recruteur
import { CandidatDetailsComponent } from './pages/private/recruteur/candidat-details/candidat-details.component';
import { OffresComponent } from './pages/private/recruteur/offres/offres.component';
import { ProfilsComponent } from './pages/private/recruteur/profils/profils.component';
import { MonProfilRecruteurComponent } from './pages/private/recruteur/mon-profil/mon-profil.component';
import { ActualitesRecruteurComponent } from './pages/private/recruteur/actualites/actualites.component';
import { AjouterOffreComponent } from './pages/private/recruteur/ajouter-offre/ajouter-offre.component';
import { OffreDetailsComponent as OffreDetailsComponentRecruteur } from './pages/private/recruteur/offre-details/offre-details.component';

const routes: Routes = [
  // public routes ---------------------
  {
    path:'',
    component: AccueilCandidatComponent
  },
  {
    path:'espace-recruteur',
    component: AccueilRecruteurComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }, {
    path:'verify',
    component: VerifyEmailComponent
  },
  {
    path:'login',
    component: LoginComponent
  },{
    path:'forgot',
    component: ForgotPasswordComponent
  },{
    path:'reset',
    component: ResetPasswordComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  // candidat private routes ----------
  {
    path:'candidat/home',
    component: HomeCandidatComponent
  },
  {
    path:'candidat/profil',
    component: ProfileCandidatComponent
  },
  {
    path:'candidat/offre-details',
    component: OffreDetailsComponent
  },
  {
    path:'candidat/enregistrements',
    component: EnregistrementComponent
  },
  {
    path:'candidat/actualites',
    component: ActualitesCandidatComponent
  },
  {
    path:'candidat/entreprises',
    component: EntreprisesComponent
  },
  {
    path:'candidat/entreprise-details',
    component: EntrepriseDetailsComponent
  },
  {
    path:'candidat/candidatures',
    component: CandidaturesComponent
  },
  {
    path:'candidat/mon-profil',
    component: MonProfilCandidatComponent
  },
  // recruteur private routes -----------
  {
    path:'recruteur/profil',
    component: ProfileRecruteurComponent
  },
  {
    path:'recruteur/candidat-details',
    component: CandidatDetailsComponent
  },
  {
    path:'recruteur/offres',
    component: OffresComponent
  },
  {
    path:'recruteur/profils',
    component: ProfilsComponent
  },
  {
    path:'recruteur/actualites',
    component: ActualitesRecruteurComponent
  },
  {
    path:'recruteur/mon-profil',
    component: MonProfilRecruteurComponent
  },
  {
    path:'recruteur/offre',
    component: AjouterOffreComponent
  },
  {
    path:'recruteur/offre-details',
    component: OffreDetailsComponentRecruteur
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
