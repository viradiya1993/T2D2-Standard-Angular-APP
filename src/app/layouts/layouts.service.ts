import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.Base_URL;
  }

  // Dashboard services

  // Get dashboard count
  getDashboardCount() {
    return this.http.get(this.url + 'users/get-dashboard-data')
  }
  // Get Project count
  getDashboard(data: any) {
    return this.http.post(this.url + 'project/get-project-dashboard-data', data)
  }
  // Get admin detail
  getLoggedInAdminDetail() {
    return this.http.get(this.url + 'users/get-user-profile')
  }
  // Save admin detail
  saveLoggedInAdminDetail(adminDetail: any) {
    return this.http.post(this.url + 'users/update-user-profile', adminDetail)
  }

  // Images services

  // Get image List
  getImages(limit: any, page: any, shortName: any, shortType: any, search: any, project_id: any, drawing_id: any) {
    let url = this.url + 'image/get-image-list';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }
    if (project_id != null) {
      url += '&project_id=' + project_id;
    }
    if (drawing_id != null) {
      url += '&drawing_id=' + drawing_id;
    }
    return this.http.get(url);
  }
  // Get Image Detail
  getImageDetail(id) {
    return this.http.get(this.url + 'image/get-image/' + id);
  }
  // Update Image
  updateImage(id: any, data: any) {
    return this.http.post(this.url + 'image/update-image/' + id, data);
  }

  editDetectedImages(id: any, data: any) {
    return this.http.post(this.url + 'image/update-detected-images/' + id, data);
  }


  // Inspectors services

  // for add inspector
  addInspector(data: any) {
    return this.http.post(this.url + 'inspector/add-inspector', data)
  }
  // for user type
  getUserType() {
    return this.http.get(this.url + 'users/get-user-types')
  }
  // get country code
  getCountryCode() {
    return this.http.get(this.url + 'country-code')
  }

  // for get inspector list
  getInspectors(limit: any, page: any, shortName: any, shortType: any, search: any, user_type: any) {
    let url = this.url + 'inspector/get-inspector-list';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }
    if (user_type != null) {
      url += '&user_type=' + user_type;
    }
    return this.http.get(url);
  }

  // for get inspector detail
  getInspectorDetail(id) {
    return this.http.get(this.url + 'inspector/get-inspector/' + id)
  }
  // For get global setting inspector
  getGlobalSetting() {
    return this.http.get(this.url + 'global-setting');
  }
  // get project user's
  getProjectUsers(limit: any, page: any, shortName: any, shortType: any, search: any, project_id: any, user_type: any) {
    let url = this.url + 'project/get-project-users';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }
    if (project_id != null) {
      url += '&project_id=' + project_id;
    }
    if (user_type != null) {
      url += '&user_type=' + user_type;
    }
    return this.http.get(url);
    //return this.http.post(this.url + '/project/get-project-users', data);
  }
  // for update inspector detail
  updateInspector(data: any, id: any) {
    return this.http.post(this.url + 'inspector/update-inspector/' + id, data);
  }

  // for delete inspector
  deleteInspector(id) {
    return this.http.delete(this.url + 'inspector/delete-inspector/' + id);
  }

  // Projects services

  // get member list
  getMemberList(user_type?: number) {
    let url = this.url + 'project/get-project-members';
    if (user_type != undefined || user_type != null) {
      url += '?user_type=' + user_type;
    }
    return this.http.get(url);
  }

  // get projects listing
  getProjects(limit: any, page: any, shortName: any, shortType: any, search: any, sDate, eDate) {
    let url = this.url + 'project/get-project-list';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }
    if (sDate != null && eDate != null) {
      url += '&start_date=' + sDate + '&end_date=' + eDate;
    }
    return this.http.get(url);
  }

  // add project
  addProject(data: any) {
    return this.http.post(this.url + 'project/add-project', data);
  }
  // update project
  updateProject(data: any, id: any) {
    return this.http.post(this.url + 'project/update-project/' + id, data)
  }
  // get project detail
  getProjectDetail(id) {
    return this.http.get(this.url + 'project/get-project/' + id);
  }

  // for delete project
  deleteProject(id) {
    return this.http.delete(this.url + 'project/delete-project/' + id);
  }

  uplodeImage(data) {
    let token = localStorage.getItem('isLoggedin');
    return this.http.post(this.url + 'image-upload', data);
  }

  // uplode image
  uplodeImageProject(data) {
    // let promise = new Promise((resolve, reject) => {
    //   let apiURL = this.url + 'image-upload';
    //   this.http.post(apiURL,data)
    //     .toPromise()
    //     .then(
    //       res => { // Success
    //         console.log(res);
    //         resolve();
    //       }
    //     );
    // });
    // return promise;

    // return this.http.post(this.url + 'image-upload' , data)
    const req = new HttpRequest('POST', this.url + 'image-upload', data, {
      reportProgress: true
    });
    return this.http.request(req);
    // return new Promise((resolve, reject) => {
    //   this.http.request(req).toPromise().then(
    //     event => { // Success
    //       console.log(event);
    //       resolve();
    //     }
    //   );
    // });
  }

  uplodeImageProject1(file: any) {
    return from(new Promise((resolve, reject) => {

      const formData: FormData = new FormData();

      if (file !== undefined) {
        formData.append('image', file);
      }

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = function (event) {
        console.log(Math.round(100 * event.loaded / event.total), 'service')
      }
      // xhr.upload.onloadend = function(e) {
      //   console.log(e.total , 'loaded')
      // }
      xhr.open('POST', this.url + 'image-upload', true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('isLoggedin'));
      xhr.send(formData);
    }));
  }
  uplodeImageProject2(data) {
    return this.http.post<any>(this.url + 'image-upload', data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  // uploded Image Save
  uplodeImageSave(data) {
    return this.http.post(this.url + 'image/add-image', data)
  }

  // Report service

  // Get Report List
  getreportImages(project_id: any, drawing_id: any, limit: any, page: any, shortName: any, shortType: any) {
    let url = this.url + 'image/get-image-list';

    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (project_id != null) {
      url += '&project_id=' + project_id;
    }
    if (drawing_id != null) {
      url += '&drawing_id=' + drawing_id;
    }
    return this.http.get(url);
  }
  // Add Report
  addReport(data) {
    return this.http.post(this.url + 'report/add-report', data)
  }
  //Delete Report
  deleteReport(id) {
    return this.http.delete(this.url + 'report/delete-report/' + id);
  }
  // Update Project
  updateReport(data: any, id: any) {
    return this.http.post(this.url + 'report/update-report/' + id, data)
  }
  // for delete drawing
  deleteImages(id) {
    return this.http.delete(this.url + 'image/delete-image/' + id);
  }
  // get project detail
  getReportDetail(id) {
    return this.http.get(this.url + 'report/download-report/' + id);
  }
  // Get Report List
  getReports(limit: any, page: any, shortName: any, shortType: any, search: any) {
    let url = this.url + 'report/get-report-list';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }

    return this.http.get(url);
  }

  getReportsList(limit: any, page: any, shortName: any, shortType: any, search: any, project_id: any) {
    let url = this.url + 'report/get-project-report';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }
    if (project_id != null) {
      url += '&project_id=' + project_id;
    }
    return this.http.get(url);
  }


  // Drawings services

  // for get inspector list
  getDrawings(limit: any, page: any, shortName: any, shortType: any, search: any, project_id: any) {
    let url = this.url + 'drawing/get-drawing-list';
    if (limit !== undefined) {
      url += '?limit=' + limit;
    } else {
      url += '?limit=5';
    }
    if (page !== undefined) {
      url += '&skip=' + page;
    } else {
      url += '&skip=0';
    }
    if (shortName !== undefined) {
      url += '&sortBy=' + shortName + ':' + shortType;
    }
    if (search != null) {
      url += '&q=' + search;
    }
    if (project_id != null) {
      url += '&project_id=' + project_id;
    }
    return this.http.get(url);
  }
  // Get Drawing
  getDrawingforImage(data: any) {
    return this.http.post(this.url + 'drawing/get-drawing-name-list/', data);
  }
  // get drawing detail
  getDrawingDetail(id) {
    return this.http.get(this.url + 'drawing/get-drawing/' + id);
  }
  // Add Drawing
  addDrawing(data: any) {
    return this.http.post(this.url + 'drawing/add-drawing', data)
  }
  // for delete drawing
  deleteDrawing(id) {
    return this.http.delete(this.url + 'drawing/delete-drawing/' + id);
  }
  // get project list
  getProjectList() {
    return this.http.get(this.url + 'drawing/get-project-list')
  }
  // Update Drawing
  updateDrawing(data: any, id: any) {
    return this.http.post(this.url + 'drawing/update-drawing/' + id, data)
  }

  // delete proejct assignment
  deleteProjectAssignment(data) {
    return this.http.post(this.url + 'project/delete-project-assignment', data)
  }


  // for adding not registered images
  addNotRegisterImage(data:any) {
    return this.http.post(this.url + 'image/add-not-registered-images', data);
  }
}
