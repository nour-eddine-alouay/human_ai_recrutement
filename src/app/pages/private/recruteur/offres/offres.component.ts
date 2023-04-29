import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OffreService } from 'src/app/services/recruteur/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css'],
})
export class OffresComponent implements OnInit {
  user!: any;
  token!: any;
  offres: any[] = [];
  total!: number;
  active!: number;
  enSelection!: number;
  archivee!: number;
  filteredItems: any[] = []
  showCard = false;

  constructor(
    private offreService: OffreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : null;
    this.getOffres();
  }

  voirDetails(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: { id: id},
    };
    this.router.navigate(['/recruteur/offre-details'], navigationExtras);
  }

  getOffres(){
    this.offreService
      .getOffres(this.token.accessToken,this.user.id)
      .subscribe((result:any) => {
        this.offres = result.offres
        this.filteredItems = this.offres;
        this.getStatistics()
        console.log(result.offres)
      });
  }

  getStatistics(){
    this.total = this.offres.length;
    this.active = this.offres.filter(offre => offre.status === "active").length;
    this.enSelection = this.offres.filter(offre => offre.status === "en sélection").length;
    this.archivee = this.offres.filter(offre => offre.status === "archivée").length;
  }

  toActive(id: any){
    this.offreService.updateStatus(this.token.accessToken, id, "active")
    this.offres.find((offre) => offre.id == id).status = "active"
    this.getStatistics()
  }

  toSelection(id: any){
    this.offreService.updateStatus(this.token.accessToken, id, "en sélection")
    this.offres.find((offre) => offre.id == id).status = "en sélection"
    this.getStatistics()
  }

  toArchive(id: any){
    this.offreService.updateStatus(this.token.accessToken, id, "archivée")
    this.offres.find((offre) => offre.id == id).status = "archivée"
    this.getStatistics()
  }

  toggleCard() {
    this.showCard = !this.showCard;
  }

  searchTerm: string = '';
  onSearch() {
    this.filteredItems = this.searchTerm
      ? this.offres.filter((offre) =>
          offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.offres;
  }

  firstNWordOfString(s: string, n: number): string {
    const words = s.split(' ')
    if(words.length>n) return words.slice(0, n).join(' ')+'...'
    return words.slice(0, n).join(' ')
  }
}
