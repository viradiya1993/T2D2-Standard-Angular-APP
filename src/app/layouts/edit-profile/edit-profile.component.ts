import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from './../../shared/shared.service';
import { LayoutsService } from './../layouts.service';
import { AppConst } from '../../app.constant';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  userDetail: any = {};
  fileData: File = null;
  public imagePath;
  isEmail: boolean;
  userName: string;
  countryWithCode:any;
  numberValidation: boolean;
  emailPattern = AppConst.emailValidationPattern;

  constructor(private layoutsService: LayoutsService, public sharedService: SharedService,
     private router: Router) { }

  /**
   * select profile pic
  * // TODO: fileProgress
  * @param fileInput
  * @returns selected image file
  */
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    const reader = new FileReader();
    this.imagePath = fileInput.target.files;
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (_event) => {
      this.userDetail.profile_pic = reader.result;
    }
  }

  ngOnInit() {
    this.getCountryCode();
    this.getAdminDetail();
  }


  /**
  * // TODO: getCountryCode
  * @param getCountryCode
  * @returns country code
  */
 getCountryCode() {
  this.layoutsService.getCountryCode().subscribe((res: any) => {
    this.countryWithCode = res.data.country
  })
}

  /**
   * get admin detail
  * // TODO: getAdminDetail
  * @returns detail if admin , profile pic
  */
  getAdminDetail() {
    this.layoutsService.getLoggedInAdminDetail().subscribe((res: any) => {
      this.userDetail = res.data;
      this.userName = res.data.user_name;
      this.isEmail = res.data.email ? true : false;
      if (res.data.profile_pic === '') {
        this.userDetail.profile_pic = AppConst.image;
      }
    })
  }

   // For number validation min-7 max-13
  /**
  * // TODO: chekval
  * @returns true - when length less then 7 , false - complete fill up
  */
 chekval(eve) {
  if (eve.length < 7) {
    this.numberValidation = true;
  } else {
    this.numberValidation = false;
  }
}

  /**
   * forgot password
  * // TODO: submitForgotPassword
  * @param formDetail
  * @returns message
  */
  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('profile_pic', this.fileData);
    formData.append('email', this.userDetail.email);
    formData.append('mobile_number', this.userDetail.mobile_number);
    formData.append('user_name', this.userDetail.user_name);
    formData.append('user_type', this.userDetail.user_type);
    formData.append('prefix_dialing', this.userDetail.prefix_dialing);
    
    this.layoutsService.saveLoggedInAdminDetail(formData).subscribe((res: any) => {
      this.sharedService.setLocalStorage('profile', res.data.profile_pic);
      this.sharedService.setLocalStorage('admin_name', res.data.user_name);
      this.sharedService.updateAdminName(res.data.user_name);
      this.sharedService.updateAdminImage(res.data.profile_pic);
      this.sharedService.loggerSuccess(res.message);
      this.router.navigate(['/projectlist'])
    })
  }
}
