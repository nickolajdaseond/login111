import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators, FormGroup , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../service';
import { IUser } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit{

  @ViewChild('inputUsername', { static: true })
  inputUsername!: ElementRef<HTMLInputElement>;
  hide = true;
  data: IUser[] = [];
  user=
  {
    username:'',
    password:'',
  }
  username = new FormControl('', [Validators.required]);
  loginForm!:FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginservice :Service) {}

  ngOnInit(): void {
    this.loginForm=this.fb.group ({
      username:['',Validators.required],
      password:['',Validators.required],
      rememberMe: new FormControl(false)
    })
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }

  login(){
    this.loginservice.getData()
    .subscribe((user)=>{
      this.data = user;

       this.data.find((a:any)=>{
        return  a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
      });
      if(user){
        this.loginForm.reset();
        this.router.navigate(["home"])
      } else{
        alert("email or password is invalid!");
      }
    })
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
  }
}
}
