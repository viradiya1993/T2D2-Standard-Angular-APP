import { Component, ViewChild, OnInit, ElementRef, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { Project } from '../../../models/project.model'
import { LayoutsService } from '../../layouts.service'
import { SharedService } from '../../../shared/shared.service'
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { } from "googlemaps";
import * as moment from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppConst } from '../../../app.constant';
declare var $: any;

export interface Section {
  name: string;
  updated: string;
}


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit,OnDestroy, AfterViewInit {

  userImg:any;
  project: Project = new Project;
  members: any[];
  projectId: any;
  editable = false;
  projectmember: any = [];
  latitude: any = '';
  longitude: any = '';
  isshowmarker = false;
  mapLatitude;
  mapLongitude;
  adressType: string;
  mainUserType: any;
  imgURL: any;
  fileData: File = null;
  selectedUsers : any;
  public imagePath;
  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild('addresstext') addresstext: ElementRef;
  autocompleteInput: any;
  projectmemberList: any =[];

  constructor(private layoutsService: LayoutsService, public sharedService: SharedService,
    private activatedRoute: ActivatedRoute, private router: Router, private datePipe: DatePipe,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userImg = AppConst.image;
    this.getUserType();
    this.getMember();
    this.activatedRoute.params.subscribe((res: any) => {
      this.projectId = res.id;
      if (this.projectId) {
        this.layoutsService.getProjectDetail(res.id).subscribe((response: any) => {
          this.isshowmarker = true;
          this.editable = true;
          this.project = response.data.project;
          this.autocompleteInput = response.data.project.project_location;
          // if(response.data.project.latitude != null || response.data.project.longitude != null){
          this.latitude = parseFloat(response.data.project.latitude);
          this.longitude = parseFloat(response.data.project.longitude);
          this.mapLatitude = this.latitude;
          this.mapLongitude = this.longitude;
          // }
          this.project.start_date = response.data.project.start_date ? moment(response.data.project.start_date).format() : null;
          this.project.end_date = response.data.project.end_date ? moment(response.data.project.end_date).format() : null;
          this.projectmemberList = response.data.projectMembers;
          response.data.projectMembers.forEach(element => {
            this.projectmember.push(element.user_id._id);
          });
          this.sharedService.setLocalStorage('selectedUsers', JSON.stringify(this.projectmember));
          this.project.projectMembers = this.projectmember;
          this.imgURL = response.data.project.project_pic;
          if (this.imgURL === undefined || this.imgURL ===null) {
            this.imgURL = AppConst.noProjectImage;
          }
        })
      }
      else {
        this.project.start_date = moment().toDate();
        this.imgURL = AppConst.noProjectImage;
      }
    })
    
  }
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: ["USA", "IND", "CA"] },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.isshowmarker = true;
    console.log(place);
    this.autocompleteInput = place['formatted_address']
    this.latitude = place['geometry'].location.lat();
    this.longitude = place['geometry'].location.lng();
    this.mapLatitude = place['geometry'].location.lat();
    this.mapLongitude = place['geometry'].location.lng();

    $("#project_description").focus();

    // this.setAddress.emit(place);
  }

  /**
  * for validation End date should be greater than Start date
 * // TODO: filterDate
 * @returns enddate null
 */
  filterDate() {
    if (this.project.start_date > this.project.end_date) {
      this.project.end_date = ''
    }
  }

  /**
 * // TODO: onSave
 * @param formDetail
 * @returns message
 */
  onSave(type) {
    if (this.latitude == null || this.latitude == '') {
      this.sharedService.loggerError('Please Point marker');
      return;
    }
    const formData = new FormData;
    let parseUserIds = JSON.parse(this.sharedService.getLocalStorage('selectedUsers'));
    let stringData = parseUserIds.toString();
   
    formData.append('project_id', this.project.project_id);
    formData.append('project_name', this.project.project_name);
    formData.append('project_location',this.autocompleteInput);
    formData.append('project_description', this.project.project_description);
    formData.append('project_pic', this.fileData);
    formData.append('start_date', this.project.start_date ? this.project.start_date : null);
    if(this.project.end_date){
      formData.append('end_date', this.project.end_date);
    }
    formData.append('latitude',this.latitude);
    formData.append('longitude', this.longitude);
    formData.append('projectMembers', stringData);

    if (type === 'save') {
      // if(this.project.start_date == undefined || this.project.end_date == undefined){
      //   this.sharedService.loggerError('Please Select Start and End Date');
      // } else {

      console.log('final data',formData);
      
      this.layoutsService.addProject(formData).subscribe((res: any) => {
        this.sharedService.loggerSuccess(res.message);
        this.myForm.reset();
        this.router.navigate(['/projectlist']);
        this.sharedService.removeLocalStorage('selectedUsers');
      });

      // }
    } else {
      this.layoutsService.updateProject(formData, this.projectId).subscribe((res: any) => {
        this.sharedService.loggerSuccess(res.message);
        this.myForm.reset();
        this.router.navigate(['/projectlist']);
        this.sharedService.removeLocalStorage('selectedUsers');
      })
    }
  }

  /**
  * // TODO: getMember
  * @returns member list
  */
  getMember() {
    let type = null;
    this.layoutsService.getMemberList(type).subscribe((res: any) => {
      this.members = res.data
    })
  }

  placeMarker(e) {
    this.isshowmarker = true;
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
  }

  // Get User Type
  getUserType() {
    this.layoutsService.getUserType().subscribe((res: any) => {
      this.mainUserType = res.data[1].children;
    })
  }

  onCancel(){
    this.sharedService.removeLocalStorage('selectedUsers');
    this.router.navigate(['/projectlist']);
  }

  openDialog() {
    console.log(this.members);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      panelClass: 'user-modal',
      width: '650px',
      data: {
        memberData: this.members,
        userTypes: this.mainUserType,
        projectMemberList : this.projectmemberList
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Got result of user IDS', result);
        this.projectmemberList = result.projectMemberList;
      })
  }

  onDeleteUser(user){
    let id = user.user_id._id;
    this.projectmemberList = this.projectmemberList.filter((user) => {
      if(user.user_id._id != id) {
        return user
      }
    })
    let parseUserIds = JSON.parse(this.sharedService.getLocalStorage('selectedUsers'));
    parseUserIds = parseUserIds.filter((elemnet) => {
      if(elemnet !== id) {
        return elemnet
      }
    })
    console.log('finalId',parseUserIds);
    this.sharedService.setLocalStorage('selectedUsers',JSON.stringify(parseUserIds));
    console.log('After this.projectmemberList',this.projectmemberList);
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    const reader = new FileReader();
    this.imagePath = fileInput.target.files;
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.project.project_pic = reader.result;
    }
  }

  ngOnDestroy() {
    this.sharedService.removeLocalStorage('selectedUsers');
  }

}


@Component({
  selector: 'user-selection-dialog',
  templateUrl: 'users-selection-dialog.component.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  currentIndex = 0;
  userType = 4;
  selectedUserIds = [];
  Users = [];
  parentUsertTypes = [];
  subUserType: any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedService: SharedService,
    public layoutsService: LayoutsService) {
    this.parentUsertTypes = this.data.userTypes;
  }

  ngOnInit() {
    this.getUsers(this.userType);
  }

  getUsers(type) {
    if (JSON.parse(this.sharedService.getLocalStorage('selectedUsers'))) {
      this.selectedUserIds = JSON.parse(this.sharedService.getLocalStorage('selectedUsers'));
    }
    this.layoutsService.getMemberList(type).subscribe((res: any) => {
      this.Users = res.data;
    })
  }

  onChecked(member, event) {
    const value = member._id;
    if (event.checked) {
      if (!this.selectedUserIds.includes(value)) {
        this.selectedUserIds.push(value);
       let user = {}
       user['user_id'] = member
        this.data.projectMemberList.push(user);
      }
    } else {
      if (this.selectedUserIds.indexOf(value) > -1) {
        this.selectedUserIds.splice(this.selectedUserIds.indexOf(value), 1);
        // this.data.projectMemberList.splice(this.data.projectMemberList.indexOf(member), 1);
        this.data.projectMemberList = this.data.projectMemberList.filter((user) => {
          if(user.user_id._id !== value) {
            console.log('USER ', user);
            return user;
          }
        })
        console.log('this.data.projectMemberListthis.data.projectMemberList ', this.data.projectMemberList);
      }
    }
    this.sharedService.setLocalStorage('selectedUsers', JSON.stringify(this.selectedUserIds));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEmployeeTab(event: any) {
    this.currentIndex = event.index;
    console.log('event ', event);
    if (event.index === 1) {
      this.Users = [];
      this.currentIndex = 1;
      this.subUserType = this.parentUsertTypes[1].children;
    } else if (event.index === 2) {
      this.Users = [];
      this.currentIndex = 2;
      this.subUserType = this.parentUsertTypes[2].children;
    } else {
      this.subUserType = [];
      this.getUsers(4);
    }
  }

  submit() {
    this.dialogRef.close(this.data);
  }

  onChangeSubType(userType) {
    this.getUsers(userType);
  }
}