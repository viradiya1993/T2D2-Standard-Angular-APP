import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { AppConst } from '../../app.constant';
import { LayoutsService } from './../../layouts/layouts.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    admin_name: any;
    profile: any;

    constructor(location: Location, private element: ElementRef, private router: Router,
        private authService: AuthService, private zone: NgZone, private sharedService: SharedService,
        private layoutsService: LayoutsService) {
        this.location = location;
        this.sidebarVisible = false;
        this.layoutsService.getLoggedInAdminDetail().subscribe((res: any) => {
            this.admin_name = res.data.user_name;
            this.profile = res.data.profile_pic;
            if (res.data.profile_pic === '') {
              this.profile = AppConst.image;
            }
          })
    }

    ngOnInit() {
        this.sharedService.userName$.subscribe((res: any) => {
            this.admin_name = res;
        })
        this.sharedService.userImage$.subscribe((res: any) => {
            if(res === null ){
                this.profile = AppConst.image
            } else {
                this.profile = res;
            }
        })
       
        if (!this.admin_name) {
            this.profile = this.sharedService.getLocalStorage('profile');
            this.admin_name = this.sharedService.getLocalStorage('admin_name');
        }
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    logout() {
        this.authService.adminLogout().subscribe((res: any) => {
            localStorage.clear();
            this.zone.run(() => { this.router.navigate(['/login']) });
        })

    }
}
