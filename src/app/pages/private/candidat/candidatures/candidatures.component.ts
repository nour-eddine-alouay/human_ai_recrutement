import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PostuleService } from 'src/app/services/candidat/postule.service';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent {

  showCard = false;
  // pagination
  currentPage = 1
  totalPages = 1
  pageNumbers !: any[]

  user!: any;
  token!: any;
  postules !: any
  filteredPostules !: any

  constructor(
    private postuleService: PostuleService,
    private router: Router
  ){}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : null;
    this.filterPostules(1);
  }

  kaywords: string = '';
  filterPostules(page : number){
    this.postuleService.filterPostules(this.token.accessToken,this.user.id,page,this.kaywords).subscribe((result:any) => {
      console.log(result)
      if(result.success){
        this.postules = this.filteredPostules = result.postules.data
        this.currentPage = result.postules.current_page
        this.totalPages = result.postules.last_page
        this.pageNumbers = Array(this.totalPages).fill(0).map((_,i)=>i+1)
      }
    });
  }
  changePage(page : number){
    this.filterPostules(page)
  }

  deletePostule(id : number){
    console.log(id)
    this.postuleService.deletePostule(this.token.accessToken,id).subscribe((result:any)=>{
      console.log(result)
      if(result.success){
        this.showToast("success","Candidature supprimé",result.message)
        this.filteredPostules = this.filteredPostules.filter((postule:any)=>postule.id_postule!=id)
      }else{
        this.showToast("warning","Candidature non supprimé",result.message)
      }
    })
  }

  voirOffreDetails(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: { id: id},
    };
    this.router.navigate(['/candidat/offre-details'], navigationExtras);
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
  firstNWordOfString(s: string, n: number): string {
    const words = s.split(' ')
    if(words.length>n) return words.slice(0, n).join(' ')+'...'
    return words.slice(0, n).join(' ')
  }

}
