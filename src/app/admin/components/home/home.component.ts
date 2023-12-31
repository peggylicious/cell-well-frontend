import { NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { tap } from 'rxjs';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
authService = inject(AuthenticationService)
coreService = inject(CoreService)

  constructor(){}
  // authService = inject(AuthenticationService)
  ngOnInit(): void {
    this.coreService.getAllUsers()
  }

  submitForm(path:any){

  }

  findUser(){
    this.coreService.findUser()
  }

  updateUserRole(id:string, role:string = 'Admin'){
    const payload = {id, role: 'Admin'}
    console.log(payload)
    this.authService.updateUserRole(payload.id, payload.role)
  }
}
