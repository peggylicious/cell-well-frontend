import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = 'http://localhost:5000/api/auth/'
  constructor(private http: HttpClient) { }

  registerUser(user: any){
    return this.http.post(`${this.baseUrl}register`, user).pipe(
      tap(x=> {
        // localStorage.setItem('userId', x!.data)
        const userData = x as {status: string, message: string, data: {userId: string}}
        console.log(userData.data.userId)
        localStorage.setItem('cwUserId', userData.data.userId)
      })
    )
  }
  verifyOtp(user: any){
    return this.http.post(`${this.baseUrl}verifyOtp`, user).pipe(
      tap(x=> {
        console.log(x)
      })
    )
  }
  verifyNewuser(user: any){
    return this.http.post(`${this.baseUrl}verifyNewuser`, user).pipe(
      tap(x=> {
        console.log(x)
      })
    )
  }
}
