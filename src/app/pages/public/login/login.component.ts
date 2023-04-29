import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private auth : AuthenticationService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['',[
        Validators.required,
        Validators.email
      ]],
      password : ['',[
        Validators.required,
      ]]
    })
  }

  get email(){
    return this.loginForm.controls['email'];
  }
  get password(){
    return this.loginForm.controls['password'];
  }

  isAlertMessage : boolean = false
  typeAlertMessage !: string
  alertMessage !: string
  login(){
    this.auth.login(this.email.value, this.password.value)
    .subscribe( (result : any) => {
      if(result.success === true){
        this.isAlertMessage = true
        this.typeAlertMessage = "success"
        this.alertMessage = result.message
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', JSON.stringify(result.token))
        if(result.user.type == "candidat"){
          this.router.navigateByUrl('/candidat/profil');
        }else{
          this.router.navigateByUrl('/recruteur/profil');
        }
      }else{
        this.isAlertMessage = true
        this.typeAlertMessage = "danger"
        this.alertMessage = result.message
      }
    });
  }

  invalidTouchedDirtyFormControl(formControlName : string){
    return this.loginForm.controls[formControlName]?.invalid &&
      (this.loginForm.controls[formControlName]?.touched
        || this.loginForm.controls[formControlName]?.dirty);
  }

  passwordFieldType = 'password'
  passwordIcon = 'fa fa-eye'
  toggleShowPassword(){
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'fa fa-eye' ? 'fa fa-eye-slash' : 'fa fa-eye';
  }
}
