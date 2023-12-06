import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
    name: ''
  })

  get formButtonTitle(){
    // return this.authPath.match(/[A-Z]/g)
    // Create a sepereate word if string has uppercase letters
    return this.authPath.replace(/[A-Z][a-z]*/g, str => ' ' + str.toLowerCase())
  }

  authRoutes = ['register', 'login', 'sendOtp', 'verifyOtp']
  constructor( private fb: FormBuilder, private router: Router){

  }
  ngOnInit(): void {
    this.authPath = this.router.url.split('/')[1]; //Get route name
    console.log(this.authPath)
  }

  submitForm(url:string){
    console.log(`This is the ${url} page`, this.authForm.value)
  }
}
