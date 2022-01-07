import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from 'app/shared/shared.service';
import { filter } from 'rxjs/operators'


declare const $: any;
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES2: RouteInfo[] = [
  { path: '/dashboard', title: 'dashboard', icon: 'dashboard', class: '' },
  // { path: '/projects', title: 'Projects',  icon: 'collections_bookmark', class: '' },
  { path: '/drawings', title: 'drawings', icon: 'brush', class: '' },
  // { path: '/images', title: 'images',  icon: 'images', class: '' },
  { path: '/reports', title: 'reports', icon: 'description', class: '' },
  { path: '/project-user', title: 'project user', icon: 'supervised_user_circle', class: '' },

  // { path: '/damage-detection', title: 'Damage Detection',  icon: 'compare', class: '' },
  // { path: '/gallery', title: 'Gallery',  icon: 'image', class: '' }

];

export const ROUTES: RouteInfo[] = [
  { path: '/projectlist', title: 'projects', icon: 'dashboard', class: '' },
  { path: '/inspectors', title: 'users', icon: 'supervised_user_circle', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  Projectname: any;
  projectid: any
  sideMenu: boolean = false;
  subMenu: boolean = false;
  displayItems = [];
  userType: any;


  constructor(private authService: AuthService,
    private zone: NgZone,
    private router: Router,
    public behaviorService: SharedService) {
    this.userType = JSON.parse(localStorage.getItem('usertype'))
    if (this.userType === 4) {
      this.displayItems = ["projects","dashboard", "drawings","reports","project user"]
    }else{
      this.displayItems = ["projects","dashboard", "drawings","reports","project user","users"]
    }
    this.sideMenu = true;
    this.behaviorService.ChangeSide$.subscribe(result => {
      if (result) {
        this.sideMenu = true;
        localStorage.setItem('projectname', JSON.stringify(result.project_name));
        this.Projectname = JSON.parse(localStorage.getItem("projectname"));
        this.menuItems = ROUTES2.filter(menuItem => menuItem);
      } else if (result == null) {
        this.Projectname = JSON.parse(localStorage.getItem("projectname"));
      } else {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      }
    });
    this.projectid = JSON.parse(localStorage.getItem("_projectid"));
    if (this.projectid) {
      this.menuItems = ROUTES2.filter(menuItem => menuItem);
    } else {
      this.sideMenu = false;
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/projectlist') {
        this.sideMenu = false;
        this.subMenu = false;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.zone.run(() => { this.router.navigate(['/projectlist']) });
      } else if (event.url === '/inspectors') {
        this.sideMenu = false;
        this.subMenu = false;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.zone.run(() => { this.router.navigate(['/inspectors']) });
      } else if (event.url === '/inspectors/add-inspector') {
        this.subMenu = false;
      } else if (event.url === '/inspectors/edit-inspector' || event.url.includes('/inspectors/edit-inspector')) {
        this.subMenu = false;
      } else if (event.url === '/projects/add-project' || event.url.includes('/projects/add-project')) {
        this.subMenu = false;
      } else if (event.url === '/projects/edit-project' || event.url.includes('/projects/edit-project')) {
        this.subMenu = false;
      }  else if (event.url === '/inspectors/edit-inspector/' || event.url.includes('/inspectors/edit-inspector')) {
        this.subMenu = false;
      }  else if (event.url === '/' || event.url === '/change-password' || event.url === '/edit-profile') {
        this.subMenu = false;
      } else {
        this.subMenu = true;
      }
    });

  }


  ngOnInit() {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);

  }

  logout() {
    this.authService.adminLogout().subscribe((res: any) => {
      localStorage.removeItem('isLoggedin');
      this.zone.run(() => { this.router.navigate(['/login']) });
    })

  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
  backButton() {
    this.sideMenu = false;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    //localStorage.removeItem('_projectid');
    //localStorage.removeItem('projectname');
    this.zone.run(() => { this.router.navigate(['/projectlist']) });
  }
}
