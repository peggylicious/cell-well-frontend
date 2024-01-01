import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  baseUrl: string = 'http://localhost:5000/api/users'

  constructor(private _snackBar: MatSnackBar, private zone: NgZone, private http: HttpClient) { }

  openDialog(message:string, action:string){
    this.zone.run(() => {
      this._snackBar.open(message, action, {verticalPosition: 'top', panelClass: ['background-red']

      });
    })
  }

  findUser(){
    return this.http.get(`${this.baseUrl}/getAllUsers`).subscribe({next: (res)=> {
      console.log('User there', res)
    },
    error(err) {
      console.log('User there', err)
    },

    })
  }
}
