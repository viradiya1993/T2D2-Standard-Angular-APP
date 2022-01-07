import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel } from './../../models/reset-password.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {
  user: ResetPasswordModel = new ResetPasswordModel();
  token: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService, public sharedService: SharedService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.token = res.token;
    })
  }

  /**
   * submitForm reset password
  * // TODO: submitForm
  * @param FormDetail
  * @returns message
  */
  submitForm(form: NgForm) {
    const data = {
      new_password: form.value.confirmPassword,
      reset_password_token: this.token
    }
    this.authService.adminResetPassword(data).subscribe((res: any) => {
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/login'])
    })
  }

  /**
   * to canle redirect to login
  * // TODO: comment onCancel
  * Cancel form
  */
  onCancel() {
    this.router.navigate(['/login']);
  }
}
