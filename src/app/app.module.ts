import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageComponent } from './layouts/page/page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ManageMembersComponent } from './pages/manage-members/manage-members.component';
import { ManageRequisitionsComponent } from './pages/manage-requisitions/manage-requisitions.component';
import { RequisitionsComponent } from './pages/requisitions/requisitions.component';
import { MyRequisitionsComponent } from './pages/my-requisitions/my-requisitions.component';
import { ColorPipe } from './pipes/color.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { HttpConfigInterceptor } from './interceptors/http.interceptor';
import { TimeagoModule } from 'ngx-timeago';
import { ViewMemberComponent } from './pages/view-member/view-member.component';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRequisitionComponent } from './components/modals/new-requisition/new-requisition.component';
import { ReviewRequisitionsComponent } from './pages/review-requisitions/review-requisitions.component';
import { SingleRequisitionComponent } from './pages/single-requisition/single-requisition.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageComponent,
    NavbarComponent,
    SidebarComponent,
    AuthLayoutComponent,
    ManageMembersComponent,
    ManageRequisitionsComponent,
    RequisitionsComponent,
    MyRequisitionsComponent,
    ReviewRequisitionsComponent,
    ViewMemberComponent,
    NewRequisitionComponent,
    ColorPipe,
    StatusColorPipe,
    SingleRequisitionComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOtpInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TimeagoModule.forRoot(),

    ToastNoAnimationModule.forRoot({
      preventDuplicates: true,
      maxOpened: 0,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
