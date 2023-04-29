import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.css']
})
export class ProfilsComponent {
  sCompetence = false;
  sContrat = false;
  sVille = false;
  competence = "Secteur"
  contrat = "Compétence"
  ville = "Valeur"

  selectCompetence(value: string) {
    this.sCompetence = false;
    this.competence = value;
  }
  selectContrat(value: string) {
    this.sContrat = false;
    this.contrat = value;
  }
  selectVille(value: string) {
    this.sVille = false;
    this.ville = value;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!(event.target as HTMLElement)?.closest('.selectbox')) {
      this.sCompetence = false;
      this.sContrat = false;
      this.sVille = false;
    }
  }
}
