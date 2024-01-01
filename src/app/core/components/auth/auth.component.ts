import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { tap } from 'rxjs';
import { checkPasswordEqual, patternvalidator } from '../../validators/password';
import { loginControl, registerControl, resetPasswordControl, sendOtpControl, verifyOtpControl } from '../../utils/auth-form';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgFor, KeyValuePipe, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  @Input() username!: string;

  authPath!: string;
  authRoutes = ['register', 'login', 'sendOtp', 'verifyOtp']
  validButton: boolean = false;
  authForm!: FormGroup;

  get formButtonTitle(){
    // Create a sepereate word if string has uppercase letters
    return this.authPath.replace(/[A-Z][a-z]*/g, str => ' ' + str.toLowerCase())
  }

  get strongPassword(){
    this.authForm.get('password')?.errors
    return
  }

  get customPasswordErrors(){
    return this.authForm.errors
  }

  get emailErrors(){
    return this.authForm.controls?.['email'].errors
  }

  get passwordMismatch(){
    if(Object.keys(this.authForm.errors || {}).includes('valuesDoNotMatch')){
      return true
    }else{
      return false
    }
  }

  constructor( private fb: FormBuilder, private router: Router, private authService: AuthenticationService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.authPath = this.router.url.split('/')[1]; //Get route name

    if(this.authPath === 'register'){
      this.authForm = this.fb.group(registerControl, {validators: [patternvalidator('password')]})
    }
    if(this.authPath === 'login'){
      this.authForm = this.fb.group(loginControl)
    }
    if(this.authPath === 'verifyOtp'){
      this.authForm = this.fb.group(verifyOtpControl)
    }
    if(this.authPath === 'sendOtp'){
      this.authForm = this.fb.group(sendOtpControl)
    }
    if(this.authPath === 'resetPassword'){
      this.authForm = this.fb.group(resetPasswordControl, {validators: [patternvalidator('password'), checkPasswordEqual('password', 'confirmPassword')]})
    }
    console.log(this.authForm)

  }

  submitForm(url:string){
    const {username, email, password, otp, confirmPassword} = this.authForm.value;

    console.log(`This is the ${url} page`, this.authForm.value)
    if(url === 'register'){
      this.authService.registerUser({username, email, password}).subscribe(x=> {
        this.router.navigateByUrl('/verifyOtp')
      })
    }
    if(url === 'login'){
      this.authService.onLogin({username, email, password})
    }
    if(url === 'verifyOtp'){
      const userId = localStorage.getItem('cwUserId')
      this.authService.verifyOtp({userId, otp, verified: false}).subscribe(x=> {
        this.router.navigateByUrl('admin/home')
      })
    }
    if(url === 'sendOtp'){
      this.authService.sendOtp({email}).subscribe(x=> {
        console.log(x)
        this.router.navigate(['../resetPassword'], {relativeTo: this.route, state: {id: x?.data.userId}})
      })
    }
    if(url === 'resetPassword'){
      const userId = localStorage.getItem('cwUserId')
      this.authService.resetPassword({userId: history.state.id, otp, password, confirmPassword}).subscribe(x=> {
        this.router.navigateByUrl('admin/home')
      })
    }
    console.log(this.authForm)

  }
}
