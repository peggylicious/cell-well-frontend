import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { tap } from 'rxjs';
import { StrongPasswordRegx, checkPasswordEqual, checkPasswordType } from '../../validators/password';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  @Input() username!: string;
  // @Input() authPath!: string;
  authPath!: string;
  authRoutes = ['register', 'login', 'sendOtp', 'verifyOtp']
  authForm: FormGroup = this.fb.group({
    username: '',
    email: '',
    // password: ['', Validators.pattern(StrongPasswordRegx)],
    password: [''],
    confirmPassword: [''],
    otp: '',
    userId: '',
  }, {validators: checkPasswordType('password')})

  get formButtonTitle(){
    // Create a sepereate word if string has uppercase letters
    return this.authPath.replace(/[A-Z][a-z]*/g, str => ' ' + str.toLowerCase())
  }

  get strongPassword(){
    this.authForm.get('password')?.errors
    // if(){

    // }
    return
  }
  get valuesMatch(){
    console.log(this.authForm.errors?.['isString'])
    return this.authForm.errors?.['isString']
  }
  constructor( private fb: FormBuilder, private router: Router, private authService: AuthenticationService){

  }
  ngOnInit(): void {
    this.authPath = this.router.url.split('/')[1]; //Get route name
    console.log(this.authPath)
    console.log(this.authForm)
  }

  submitForm(url:string){
  //   const {username, email, password, otp} = this.authForm.value;
  //   console.log(`This is the ${url} page`, this.authForm.value)
  //   if(url === 'register'){
  //     this.authService.registerUser({username, email, password}).subscribe(x=> {
  //       this.router.navigateByUrl('/verifyOtp')
  //     })
  //   }
  //   if(url === 'login'){
  //     this.authService.loginUser({username, email, password}).subscribe(result=> {
  //       this.router.navigateByUrl('admin/home')
  //     })
  //   }
  //   if(url === 'verifyOtp'){
  //     const userId = localStorage.getItem('cwUserId')
  //     this.authService.verifyOtp({userId, otp, verified: false}).subscribe(x=> {
  //       this.router.navigateByUrl('admin/home')
  //     })
  //   }
  console.log(this.authForm, this.strongPassword)
  }
}
