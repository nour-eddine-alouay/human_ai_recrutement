import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ProfileService } from 'src/app/services/candidat/profile.service';

@Component({
  selector: 'app-navbar-candidat',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavCandidatComponent implements OnInit{
  msgDialog = false;
  showMsgDialog(){
    this.msgDialog = true;
  }

  constructor(
    private router : Router,
    private auth : AuthenticationService,
    private profileService : ProfileService,
  ) {}

  token : any
  user : any
  ngOnInit(): void {
    // token
    const token = localStorage.getItem("token")
    this.token = token ? JSON.parse(token) : null
    // user
    const user = localStorage.getItem("user")
    this.user = user ? JSON.parse(user) : null
    // personalInfo
    const nomEtPrenom = localStorage.getItem("nomEtPrenom")
    try {
      this.nomEtPrenom = nomEtPrenom ? JSON.parse(nomEtPrenom) : null;
    } catch (error) {
      this.nomEtPrenom = null;
    }
    if(!this.nomEtPrenom) this.getNomEtPrenom()
  }

  // getPersonalInfo
  nomEtPrenom !: any
  getNomEtPrenom(){
    this.profileService.getNomEtPrenom(this.token.accessToken,this.user.id)
    .subscribe((result : any) => {
      if(result.success){
        console.log("nomEtPrenom",result)
        this.nomEtPrenom = result.nomEtPrenom
        localStorage.setItem('nomEtPrenom', JSON.stringify(result.nomEtPrenom))
      }
    })
  }

  logout(){
    this.auth.logout(this.token.accessToken).subscribe( (result : any) => {
      if(result.success){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigateByUrl("/")
      }
    })
  }

}
