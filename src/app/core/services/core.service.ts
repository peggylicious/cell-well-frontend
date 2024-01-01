import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, signal } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { existingUser, loggedInUser, UserAuth } from '../interfaces/user';
type User = existingUser[] | undefined | null;
type UserListStatus = 'pending' | 'success' | 'error';

interface AllUsers{
  user: User,
  status: UserListStatus
}
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  baseUrl: string = 'http://localhost:5000/api/users';
  allUsers = signal<AllUsers>({
    user: [],
    status: 'pending'
  })

  constructor(private _snackBar: MatSnackBar, private zone: NgZone, private http: HttpClient) { }

  openDialog(message:string, action:string){
    this.zone.run(() => {
      this._snackBar.open(message, action, {verticalPosition: 'top', panelClass: ['background-red']

      });
    })
  }

  findUser(){
    return this.http.get(`${this.baseUrl}/find`).subscribe({next: (res)=> {
      console.log('User there', res)
    },
    error(err) {
      console.log('User there', err)
    },

    })
  }

  getAllUsers(){
    return this.http.get<AllUsers>(`${this.baseUrl}/getAllUsers`).subscribe({next: (res)=> {
      console.log(res.user)
      this.allUsers.set({user: res.user, status: 'success'})
      console.log('User there', this.allUsers().user)
    },
    error(err) {
      console.log('User there', err)
    },

    })
  }


}
