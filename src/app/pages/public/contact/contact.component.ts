import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  loginForm !: FormGroup

  constructor(
    private formBuilder : FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      fullname : ['',[
        Validators.required,
      ]],
      email : ['',[
        Validators.required,
        Validators.email
      ]],
      message : ['',[
        Validators.required,
      ]]
    })
  }

  get email(){
    return this.loginForm.controls['email'];
  }
  get fullname(){
    return this.loginForm.controls['fullname'];
  }
  get message(){
    return this.loginForm.controls['message'];
  }

  invalidTouchedDirtyFormControl(formControlName : string){
    return this.loginForm.controls[formControlName]?.invalid &&
      (this.loginForm.controls[formControlName]?.touched
        || this.loginForm.controls[formControlName]?.dirty);
  }
}
