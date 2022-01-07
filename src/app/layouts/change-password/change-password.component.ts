import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangePasswordModel } from './../../models/change-password.model';
import { AuthService } from './../../auth/auth.service';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  user: ChangePasswordModel = new ChangePasswordModel();
  @ViewChild('myForm') formData: any;
  constructor(private router: Router, private authService: AuthService, public sharedService: SharedService) { }

  ngOnInit() {
  }

  /**
  * // TODO: comment onCancel
  * Cancel form
  */
  onCancel() {
    this.formData.reset();
    this.router.navigate(['/projectlist']);
  }

  /**
  * // TODO: comment onSave
  * @param user
  * @returns message
  */
  onSave(user) {
    const adminPassword = {
      old_password: user.value.oldPassword,
      new_password: user.value.confirmPassword
    }
    this.authService.adminChangePassword(adminPassword).subscribe((res: any) => {
      this.router.navigate(['/projectlist']);
      this.formData.reset();
      this.sharedService.loggerSuccess(res.message);
    })
  }
}
