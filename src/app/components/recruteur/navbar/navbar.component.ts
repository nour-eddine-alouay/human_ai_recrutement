import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-navbar-recruteur',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarRecruteurComponent {

  constructor(
    private router : Router,
    private auth : AuthenticationService
  ) {}

  token : any
  ngOnInit(): void {
    const token = localStorage.getItem("token")
    this.token = token ? JSON.parse(token) : null;
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
