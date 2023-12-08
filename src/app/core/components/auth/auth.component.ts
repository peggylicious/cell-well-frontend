import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { tap } from 'rxjs';
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
  authForm: FormGroup = this.fb.group({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    userId: '',
  })

  get formButtonTitle(){
    // return this.authPath.match(/[A-Z]/g)
    // Create a sepereate word if string has uppercase letters
    return this.authPath.replace(/[A-Z][a-z]*/g, str => ' ' + str.toLowerCase())
  }

  authRoutes = ['register', 'login', 'sendOtp', 'verifyOtp']
  constructor( private fb: FormBuilder, private router: Router, private authService: AuthenticationService){

  }
  ngOnInit(): void {
    this.authPath = this.router.url.split('/')[1]; //Get route name
    console.log(this.authPath)
  }

  submitForm(url:string){
    const {username, email, password, otp} = this.authForm.value;
    console.log(`This is the ${url} page`, this.authForm.value)
    if(url === 'register'){
      this.authService.registerUser({username, email, password}).subscribe(x=> {
        this.router.navigateByUrl('/verifyOtp')
      })
    }
    if(url === 'login'){
      this.authService.loginUser({username, email, password}).subscribe(result=> {
        this.router.navigateByUrl('admin/home')
      })
    }
    if(url === 'verifyOtp'){
      const userId = localStorage.getItem('cwUserId')
      this.authService.verifyOtp({userId, otp, verified: false}).subscribe(x=> {
        this.router.navigateByUrl('admin/home')
      })
    }
  }
}
