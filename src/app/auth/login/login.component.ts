import { Component, OnInit, ViewChild , NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { ElementRef } from '@angular/core';
import { Admin } from '../../models/admin.model';
import { AppConst } from 'app/app.constant';
//import * as  data from "../../user.json"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') private myForm: ElementRef;
  permission = {
    USER:{
      CREATE_USER:0,
      UPDATE_USER:0,
      VIEW_USER:0,
      DELETE_USER:0
    },
    PROJECT:{
      CREATE_PROJECT:0,      
      UPDATE_PROJECT:0,
      VIEW_PROJECT:0,
      DELETE_PROJECT:0
    },
    DRAWING:{
      CREATE_DRAWING:0,
      UPDATE_DRAWING:0,
      VIEW_DRAWING:0,
      DELETE_DRAWING:0
    },
    IMAGE:{
      CREATE_IMAGE:0,
      UPDATE_IMAGE:0,
      VIEW_IMAGE:0,
      DELETE_IMAGE:0
    },
    REPORT:{
      CREATE_REPORT:0,
      UPDATE_REPORT:0,
      VIEW_REPORT:0,
      DELETE_REPORT:0
    }
  };
  token: string;
  admin = new Admin();
  show_button: Boolean = false;
  show_eye: Boolean = false;
  emailPattern = AppConst.emailValidationPattern;
  constructor(private router: Router,
    private authService: AuthService,
    private sharedService: SharedService , private zone: NgZone) {
  }

  ngOnInit() {
  }

  /**
   * sign in admin
  * // TODO: submitForgotPassword
  * @param formDetail
  * @returns token , profile detail , message
  */
  login(form: NgForm) {
    const data = {
      email : form.value.email.toLowerCase(),
      password : form.value.password,
    }
    this.authService.adminLogin(data).subscribe((res: any) => {
      
      this.token = res.data.auth_token;
      this.sharedService.setLocalStorage('isLoggedin', this.token);
      this.sharedService.setLocalStorage('profile', res.data.profile.profile_pic);
      this.sharedService.setLocalStorage('admin_name', res.data.profile.user_name);

      //USER PERMISSION
      this.permission.USER.CREATE_USER = res.data.userPermissions.USER.CREATE_USER
      this.permission.USER.UPDATE_USER = res.data.userPermissions.USER.UPDATE_USER
      this.permission.USER.VIEW_USER = res.data.userPermissions.USER.VIEW_USER
      this.permission.USER.DELETE_USER = res.data.userPermissions.USER.DELETE_USER

      //PROJECT
      this.permission.PROJECT.CREATE_PROJECT = res.data.userPermissions.PROJECT.CREATE_PROJECT
      this.permission.PROJECT.UPDATE_PROJECT = res.data.userPermissions.PROJECT.UPDATE_PROJECT
      this.permission.PROJECT.VIEW_PROJECT   = res.data.userPermissions.PROJECT.VIEW_PROJECT
      this.permission.PROJECT.DELETE_PROJECT = res.data.userPermissions.PROJECT.DELETE_PROJECT

      //DRAWING
      this.permission.DRAWING.CREATE_DRAWING = res.data.userPermissions.DRAWING.CREATE_DRAWING
      this.permission.DRAWING.UPDATE_DRAWING = res.data.userPermissions.DRAWING.UPDATE_DRAWING
      this.permission.DRAWING.VIEW_DRAWING = res.data.userPermissions.DRAWING.VIEW_DRAWING
      this.permission.DRAWING.DELETE_DRAWING = res.data.userPermissions.DRAWING.DELETE_DRAWING

      //IMAGE
      this.permission.IMAGE.CREATE_IMAGE = res.data.userPermissions.IMAGE.CREATE_IMAGE
      this.permission.IMAGE.UPDATE_IMAGE = res.data.userPermissions.IMAGE.UPDATE_IMAGE
      this.permission.IMAGE.VIEW_IMAGE = res.data.userPermissions.IMAGE.VIEW_IMAGE
      this.permission.IMAGE.DELETE_IMAGE = res.data.userPermissions.IMAGE.DELETE_IMAGE

      //REPORT
      this.permission.REPORT.CREATE_REPORT = res.data.userPermissions.REPORT.CREATE_REPORT
      this.permission.REPORT.UPDATE_REPORT = res.data.userPermissions.REPORT.UPDATE_REPORT
      this.permission.REPORT.VIEW_REPORT = res.data.userPermissions.REPORT.VIEW_REPORT
      this.permission.REPORT.DELETE_REPORT = res.data.userPermissions.REPORT.DELETE_REPORT

      localStorage.setItem('permission',JSON.stringify(this.permission));
      localStorage.setItem('usertype',JSON.stringify(res.data.profile.user_type));
      // this.zone.run(() => { this.router.navigate(['/dashboard']) });
      this.zone.run(() => { this.router.navigate(['/projectlist']) });
      this.sharedService.loggerSuccess(res.message);
    });
    
  }

  /**
   * showPassword on click eye symbol
  * // TODO: showPassword
  * @returns toggle of password show and hide
  */
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

}
