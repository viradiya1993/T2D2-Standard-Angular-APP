import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material'


// import {
//   AgmCoreModule
// } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SharedService } from './shared/shared.service';
import { AuthService } from './auth/auth.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ErrorsHandlerService } from './shared/error-handler';
import { SharedModule } from './shared/shared.module';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    SharedModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  providers: [
    SharedService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, 
    {
      provide: ErrorHandler,
      useClass: ErrorsHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
