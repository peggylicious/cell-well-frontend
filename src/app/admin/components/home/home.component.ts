import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
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

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {

  }

  submitForm(path:any){

  }
}
