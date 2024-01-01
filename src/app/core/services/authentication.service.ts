import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { loggedInUser } from '../interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
type AuthUser = loggedInUser | undefined | null;
type AuthStatus = 'pending' | 'success' | 'error';
interface LoginState {
  user: AuthUser,
  status: AuthStatus
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = 'http://localhost:5000/api/auth/'

  state = signal<LoginState>({
    user: undefined,
    status: 'pending'
  })
  destroyRef = inject(DestroyRef)
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: any){
    return this.http.post(`${this.baseUrl}register`, user).pipe(
      tap(x=> {
        const userData = x as {status: string, message: string, data: {userId: string}}
        localStorage.setItem('cwUserId', userData.data.userId)
      })
    )
  }

  loginUser(payload: any){
    console.log('login...')
    return this.http.post<AuthUser>(`${this.baseUrl}login`, payload)
    // .pipe(
    //   tap(user=> {
    //     // this.state.update((state) => {
    //     //   return {...state, user, status: 'success' }
    //     // })
    //     console.log(user)
    //     return user
    //     // const userData = x as {status: string, message: string, loggedInUser: {}}
    //     // localStorage.setItem('cwNewUser', JSON.stringify(userData.loggedInUser))
    //   })
    // )
  }
  onLogin(payload: any){
    return this.loginUser(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user) => {
        console.log('payload success')
        this.state.update((state) => {
          return {...state, user, status: 'success' }
        })
        localStorage.setItem('cwNewUser', JSON.stringify(user?.loggedInUser))
        localStorage.setItem('cwUserToken', user?.access_token as string)
        this.router.navigateByUrl('admin/home')
      },
      error: () => {
        console.log('payload error')
        this.state.update((state) => {
          return {...state, status: 'error' }
        })
      }
    })
    console.log('payload')
  }

  verifyOtp(user: any){
    return this.http.post(`${this.baseUrl}verifyOtp`, user).pipe(
      tap(x=> {
        console.log(x)
      })
    )
  }
  sendOtp(user: any){
    return this.http.post<{data:any}>(`${this.baseUrl}sendOtp`, user).pipe(
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
  resetPassword(user: any){
    return this.http.post(`${this.baseUrl}updatePassword`, user).pipe(
      tap(x=> {
        console.log(x)
      })
    )
  }
}
