import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router)

  // function to navigate to login
  navigateToLogin() {
    this.router.navigate(['/login'])
  }

  // function to remove the token in localStorage
  removeToken() {
    localStorage.removeItem('token');
  }


  // function to call api to SingUp
  singUp(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "users/signup", data);
  }

  // function to call api to SingIn
  singIn(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "users/signin", data);
  }

  // function to LogOut 
  logOut() {
    // 1. navigeta to login 
    this.navigateToLogin();

    // 2. remove the token
    this.removeToken();
  }


}
