import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar, private zone: NgZone) { }

  openDialog(message:string, action:string){
    this.zone.run(() => {
    this._snackBar.open(message, action, {verticalPosition: 'top', panelClass: ['background-red']

    });
  })
  }
}
