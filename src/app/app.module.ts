import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ClipboardModule } from "@angular/cdk/clipboard";

// public : ---------------------------------------------------------
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { ContactComponent } from './pages/public/contact/contact.component';
// candidat
import { AccueilCandidatComponent } from './pages/public/accueil-candidat/accueil-candidat.component';
// recruteur
import { AccueilRecruteurComponent } from './pages/public/accueil-recruteur/accueil-recruteur.component';
// private : --------------------------------------------------------
// candidat
import { HomeCandidatComponent } from './pages/private/candidat/home/home.component';
import { ProfileCandidatComponent } from './pages/private/candidat/profile/profile.component';
import { ActualitesCandidatComponent } from './pages/private/candidat/actualites/actualites.component';
import { OffreDetailsComponent } from './pages/private/candidat/offre-details/offre-details.component';
import { EnregistrementComponent } from './pages/private/candidat/enregistrement/enregistrement.component';
import { EntreprisesComponent } from './pages/private/candidat/entreprises/entreprises.component';
import { EntrepriseDetailsComponent } from './pages/private/candidat/entreprise-details/entreprise-details.component';
import { CandidaturesComponent } from './pages/private/candidat/candidatures/candidatures.component';
import { MonProfilCandidatComponent } from './pages/private/candidat/mon-profil/mon-profil.component';
// recruteur
import { ProfileRecruteurComponent } from './pages/private/recruteur/profile/profile.component';
import { CandidatDetailsComponent } from './pages/private/recruteur/candidat-details/candidat-details.component';
import { OffresComponent } from './pages/private/recruteur/offres/offres.component';
import { ProfilsComponent } from './pages/private/recruteur/profils/profils.component';
import { MonProfilRecruteurComponent } from './pages/private/recruteur/mon-profil/mon-profil.component';
import { ActualitesRecruteurComponent } from './pages/private/recruteur/actualites/actualites.component';
import { AjouterOffreComponent } from './pages/private/recruteur/ajouter-offre/ajouter-offre.component';
import { OffreDetailsComponent as RecruteurOffreDetailsComponent } from './pages/private/recruteur/offre-details/offre-details.component';
// components : ------------------------------------------------------
import { FooterComponent } from './components/footer/footer.component';
import { NavCandidatComponent } from './components/candidat/navbar/navbar.component';
import { NavbarRecruteurComponent } from './components/recruteur/navbar/navbar.component';
import { ShareButtonsComponent } from './components/candidat/share-buttons/share-buttons.component';
import { ForgotPasswordComponent } from './pages/public/forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/public/reset-password/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/public/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AccueilCandidatComponent,
    AccueilRecruteurComponent,
    RegisterComponent,
    LoginComponent,
    ContactComponent,
    HomeCandidatComponent,
    ProfileCandidatComponent,
    ProfileRecruteurComponent,
    ActualitesCandidatComponent,
    EnregistrementComponent,
    OffreDetailsComponent,
    EntreprisesComponent,
    NavCandidatComponent,
    NavbarRecruteurComponent,
    CandidaturesComponent,
    EntrepriseDetailsComponent,
    CandidatDetailsComponent,
    OffresComponent,
    ProfilsComponent,
    MonProfilCandidatComponent,
    MonProfilRecruteurComponent,
    ActualitesRecruteurComponent,
    AjouterOffreComponent,
    RecruteurOffreDetailsComponent,
    ShareButtonsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    ClipboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
