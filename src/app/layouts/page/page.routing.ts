import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ManageMembersComponent } from 'src/app/pages/manage-members/manage-members.component';
import { RequisitionsComponent } from 'src/app/pages/requisitions/requisitions.component';
import { ManageRequisitionsComponent } from 'src/app/pages/manage-requisitions/manage-requisitions.component';
import { MyRequisitionsComponent } from 'src/app/pages/my-requisitions/my-requisitions.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

import { StoreGuard } from 'src/app/guards/store.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { ReviewRequisitionsComponent } from 'src/app/pages/review-requisitions/review-requisitions.component';
import { IctGuard } from 'src/app/guards/ict.guard';
export enum Role {
  staff = 'staff',
  admin = 'admin',
  store = 'store',
  ict = 'ict',
}
export const PageRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-members',
    component: ManageMembersComponent,
    data: { membership_type: [Role.admin] },
    canActivate: [AdminGuard],
  },
  {
    path: 'requisitions',
    component: RequisitionsComponent,
    canActivate: [AdminGuard],
    data: { membership_type: [Role.admin] },
  },
  {
    path: 'manage-requisitions',
    component: ManageRequisitionsComponent,
    canActivate: [StoreGuard],
    data: { membership_type: [Role.store] },
  },
  {
    path: 'my-requisitions',
    component: MyRequisitionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'review-requisitions',
    component: ReviewRequisitionsComponent,
    canActivate: [IctGuard],
    data: { membership_type: [Role.ict] },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
];
