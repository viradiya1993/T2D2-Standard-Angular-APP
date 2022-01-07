import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.model';
import { AuthService } from '../auth.service';
import { SharedService } from '../../shared/shared.service';
import { AppConst } from 'app/app.constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  admin = new Admin();
  emailPattern = AppConst.emailValidationPattern;

  constructor(private router: Router,
    private authService: AuthService,
    private sharedService: SharedService) { }

  ngOnInit() {
  }

  /**
   * forgot password
  * // TODO: submitForgotPassword
  * @param formDetail
  * @returns message
  */
  submitForgotPassword(form: NgForm) {
      const data = {
        email : form.value.email.toLowerCase(),
        user_type: '1'
      }
    this.authService.adminForgotPassword(data).subscribe((res: any) => {
      form.reset();
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/login']);
    });
  };

  /**
   * to close forgot password
  * // TODO: comment onCancel
  * Cancel form
  */
  onClose() {
    this.router.navigate(['/login']);
  }

}
