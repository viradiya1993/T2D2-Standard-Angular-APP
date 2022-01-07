import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getToken();

    if (state.url.includes('login')) {
      if (!token) {
        return true;
      } else {
        this.router.navigate(['/projectlist']);
        return false;
      }
    } else {
      if (token) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  }
}
