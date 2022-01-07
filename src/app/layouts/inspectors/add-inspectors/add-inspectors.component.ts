import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './../../../shared/shared.service'
import { Inspector } from './../../../models/inspector.model';
import { LayoutsService } from './../../layouts.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConst } from '../../../app.constant';



@Component({
  selector: 'app-add-inspectors',
  templateUrl: './add-inspectors.component.html'
})
export class AddInspectorsComponent implements OnInit {

  inspectorAddDetail: Inspector = new Inspector();
  fileData: File = null;
  public imagePath;
  imgURL: any;
  editable = false;
  inspectorId = null;
  numberValidation: boolean;
  countryWithCode: any[];
  country_code: string;
  emailPattern = AppConst.emailValidationPattern;
  settings: any = [];
  usersettings: any = [];
  mainUserType: any;
  subUserType: any;
  subUserType2: any;
  childUserType = [];
  showChild = false;

  @ViewChild(NgForm) myForm: NgForm;
  constructor(public sharedService: SharedService, private layoutsService: LayoutsService,
    private router: Router, private activatedRoute: ActivatedRoute) { 
      this.getUserType();
    };
  ngOnInit() {
    this.getCountryCode();
    this.getSetting();
    
    this.activatedRoute.params.subscribe((res: any) => {
      this.inspectorId = res.id;
      if (this.inspectorId) {
        this.layoutsService.getInspectorDetail(res.id).subscribe((response: any) => {
          this.editable = true;

          this.inspectorAddDetail.user_name = response.data[0].user_name;
          this.inspectorAddDetail.email = response.data[0].email;
          this.inspectorAddDetail.mobile_number = response.data[0].mobile_number;
          this.inspectorAddDetail.profile_pic = response.data[0].profile_pic;
          this.inspectorAddDetail.prefix_dialing = response.data[0].prefix_dialing;

          if (response.data[0].user_type == 2 || response.data[0].user_type == 7 || response.data[0].user_type == 8 || response.data[0].user_type == 9) {
            this.showChild = true;
            this.childUserType = this.mainUserType[1].children;
            this.inspectorAddDetail.user_type = 5;
            this.inspectorAddDetail.sub_type = response.data[0].user_type;
          }else if(response.data[0].user_type == 10 || response.data[0].user_type == 11){
            this.showChild = true;
            this.childUserType = this.mainUserType[2].children;
            this.inspectorAddDetail.user_type = 6;
            this.inspectorAddDetail.sub_type = response.data[0].user_type;
          }else if(response.data[0].user_type == 4){
            this.inspectorAddDetail.user_type = response.data[0].user_type;
            this.showChild = false;
          }

          response.data[0].userSettings.forEach(element => {
            this.usersettings.push(element.setting_id.toString());
          });
          this.inspectorAddDetail.setting = this.usersettings;
        })
      }
    })
    if (this.imgURL === undefined) {
      this.imgURL = AppConst.image;
    }
  }
  // Get User Type
  getUserType() {
    this.layoutsService.getUserType().subscribe((res: any) => {
      this.mainUserType = res.data[1].children;
    })
  }
  /**
   * select profile pic
  *  TODO: fileProgress
  * @param fileInput
  * @returns selected image file
  */
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    const reader = new FileReader();
    this.imagePath = fileInput.target.files;
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.inspectorAddDetail.profile_pic = reader.result;
    }
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
  onChangeCountry(event) {
    const obj = this.countryWithCode.find(el => el.prefix_dialing == event.value);
    this.country_code = obj.country_code;
  }

  /**
  * // TODO: getCountryCode
  * @param getCountryCode
  * @returns country code
  */
  getCountryCode() {
    this.layoutsService.getCountryCode().subscribe((res: any) => {
      this.countryWithCode = res.data.country;
      // if( this.countryWithCode!=null &&  this.countryWithCode.length > 0)
      // {
      //   const obj = this.countryWithCode.filter(el => el.country_code == 'US');
      //   if(obj!=null && obj.length>0)
      //   {
      //     this.inspectorAddDetail.prefix_dialing=obj[0].prefix_dialing;
      //   }
      // }
      if(!this.inspectorId){
        let defaultCountryCode = this.countryWithCode.find(c => c.country_code == 'US');
        this.inspectorAddDetail.prefix_dialing = defaultCountryCode.prefix_dialing;
      }
    })
  }

  // submit inspector detail
  /**
  * // TODO: onSubmit
  * @param formDetail
  * @returns message
  */
  onSubmit(type) {
    const formData = new FormData;
    formData.append('user_name', this.inspectorAddDetail.user_name);
    formData.append('email', this.inspectorAddDetail.email);
    formData.append('mobile_number', this.inspectorAddDetail.mobile_number);
    formData.append('profile_pic', this.fileData);
    formData.append('prefix_dialing', this.inspectorAddDetail.prefix_dialing);
    if (this.inspectorAddDetail.user_type == 5 || this.inspectorAddDetail.user_type == 6) {
      this.inspectorAddDetail.user_type = this.inspectorAddDetail.sub_type;
    }
    formData.append('user_type', this.inspectorAddDetail.user_type);

    formData.append('country_code', this.country_code);
    if (type === 'save') {
      for (var i = 0; i < this.inspectorAddDetail.setting.length; i++) {
        formData.append('setting_ids[]', this.inspectorAddDetail.setting);
      }
      this.layoutsService.addInspector(formData).subscribe((res: any) => {
        this.sharedService.loggerSuccess(res.message);
        this.myForm.reset();
        this.router.navigate(['/inspectors'])
      })
    } else {
      this.layoutsService.updateInspector(formData, this.inspectorId).subscribe((res: any) => {
        this.sharedService.loggerSuccess(res.message);
        this.myForm.reset();
        this.router.navigate(['/inspectors']);
      })
    }

  }

 // User Type
 onChangeUserType(event) {
  if (event === 4) {
    this.inspectorAddDetail.user_type = event;
    this.showChild = false;
  } else if (event == 5) {
    this.childUserType = this.mainUserType[1].children;
    this.showChild = true;
  } else if (event == 6) {
    this.childUserType = this.mainUserType[2].children;
    this.showChild = true;
  }
}
// User Sub type
onChnageSubType(event) {
  this.inspectorAddDetail.sub_type = event;
}
  /**
  * // TODO: getSetting
  * @returns setting list
  */
  getSetting() {
    this.layoutsService.getGlobalSetting().subscribe((res: any) => {
      this.settings = res.data;
      let settingData = [];
      res.data.forEach(element => {
        settingData.push(element._id);
      });
      this.inspectorAddDetail.setting = settingData
    })
  }

  onCancel(){
    this.myForm.reset();
    this.router.navigate(['/inspectors'])
  }
}
