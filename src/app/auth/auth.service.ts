import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.Base_URL;
  }

  // admin login
  adminLogin(admin: any) {
    return this.http.post(this.url + 'users/admin-login', admin);
  }

  // admin logout
  adminLogout() {
    return this.http.post(this.url + 'users/logout' , {});
  }

  // change password
  adminChangePassword(adminNewPassword: any) {
    return this.http.post(this.url + 'users/change-password', adminNewPassword);
  }

  // admin forgot password
  adminForgotPassword(email: any) {
    return this.http.post(this.url + 'users/forgot-password', email);
  }

  // reset password
  adminResetPassword(adminPassword: any) {
    return this.http.post(this.url + 'users/set-password', adminPassword);
  }

  // get token
  getToken() {
    return localStorage.getItem('isLoggedin');
  }

  // check token is null or not
  isAuthenticated() {
    const token = this.getToken();
    return token != null;
  }
}
