import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../shared/service/service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../shared/module/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loginForm!: FormGroup;
  data: IUser[] = [];
  constructor(
    private http : HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private loginservice: Service) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
      rememberMe: new FormControl(false)

    });
  const url = this.loginservice.getConfig();
  this.http.get(url).subscribe(
    (user:any)=>{
      this.data = user;
    }
  )
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  login() {
    this.loginservice.loadConfig()
      .then (() => {
        let user = this.data.find((a:any)=>{
          return  a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
        if (user) {
          this.loginForm.reset();
          this.router.navigate(["home"])
        } else {
          alert("email or password is invalid!");
          window.location.href="login";
        }
      })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
    }
  }
}
