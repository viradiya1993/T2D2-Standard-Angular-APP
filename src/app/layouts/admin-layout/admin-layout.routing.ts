import { AuthGuard } from './../../auth/auth.guard';
import { Routes } from '@angular/router';

// export const AdminLayoutRoutes: Routes = [
//     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//     { path: 'dashboard', canActivate: [AuthGuard], loadChildren: '../dashboard/dashboard.module#DashboardModule' },
//    // { path: 'dashboard', canActivate: [AuthGuard], loadChildren: '../dashboard1/dashboard1.module#Dashboard1Module' },
//     { path: 'inspectors', canActivate: [AuthGuard], loadChildren: '../inspectors/inspectors.module#InspectorsModule' },
//     { path: 'projects',  canActivate: [AuthGuard], loadChildren: '../projects/projects.module#ProjectsModule' },
//     { path: 'change-password', canActivate: [AuthGuard], loadChildren: '../change-password/change-password.module#ChangePasswordModule' },
//     { path: 'drawings', canActivate: [AuthGuard], loadChildren: '../drawings/drawings.module#DrawingsModule' },
//     { path: 'images',  canActivate: [AuthGuard], loadChildren: '../images/images.module#ImagesModule' },
//     { path: 'reports', canActivate: [AuthGuard], loadChildren: '../reports/reports.module#ReportsModule' },
//     { path: 'edit-profile', canActivate: [AuthGuard], loadChildren: '../edit-profile/edit-profile.module#EditProfileModule' },
//     { path: 'damage-detection', canActivate: [AuthGuard], loadChildren:'../damage-detection/damage-detection.module#DamageDetectionModule' },
//     { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
// ];

export const AdminLayoutRoutes: Routes = [
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    //{ path: 'dashboard', canActivate: [AuthGuard], loadChildren: '../dashboard/dashboard.module#DashboardModule' },
    { path: '', redirectTo: '/projectlist', pathMatch: 'full' },
    { path: 'projectlist', canActivate: [AuthGuard], loadChildren: '../projectlist/projectlist.module#ProjectlistModule' },
    { path: 'inspectors', canActivate: [AuthGuard], loadChildren: '../inspectors/inspectors.module#InspectorsModule' },
    { path: 'project-user', canActivate: [AuthGuard], loadChildren: '../project-users/project-users.module#ProjectUsersModule' },
    { path: 'dashboard', canActivate: [AuthGuard], loadChildren: '../dashboard/dashboard.module#DashboardModule' },
    { path: 'projects',  canActivate: [AuthGuard], loadChildren: '../projects/projects.module#ProjectsModule' },
    { path: 'change-password', canActivate: [AuthGuard], loadChildren: '../change-password/change-password.module#ChangePasswordModule' },
    { path: 'drawings', canActivate: [AuthGuard], loadChildren: '../drawings/drawings.module#DrawingsModule' },
    { path: 'images',  canActivate: [AuthGuard], loadChildren: '../images/images.module#ImagesModule' },
    { path: 'reports', canActivate: [AuthGuard], loadChildren: '../reports/reports.module#ReportsModule' },
    { path: 'edit-profile', canActivate: [AuthGuard], loadChildren: '../edit-profile/edit-profile.module#EditProfileModule' },
    { path: 'damage-detection', canActivate: [AuthGuard], loadChildren:'../damage-detection/damage-detection.module#DamageDetectionModule' },
    { path: 'gallery', canActivate: [AuthGuard], loadChildren:'../gallery/gallery.module#GalleryModule' },
    // { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/projectlist', pathMatch: 'full' },
];
