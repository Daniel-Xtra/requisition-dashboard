import { Injectable, computed, inject, signal } from '@angular/core';
import { AppCoreService } from '../app-core/app-core.service';
import { HttpClient } from '@angular/common/http';
import {
  IAdminRequisitionResponse,
  IAuthResponse,
  IBaseResponse,
  IDepartmentResponse,
  IIctRequisitionResponse,
  ILoginResponse,
  IMyRequisitionResponse,
  IStaffResponse,
  IStaffUpdateResponse,
  IStoreResponse,
  IStoreReviewResponse,
} from 'src/app/interfaces/definitiion';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends AppCoreService {
  activeUsers = signal<number>(0);
  inactiveUsers = signal<number>(0);
  ictPending = signal<number>(0);
  storePending = signal<number>(0);
  issuedRequest = signal<number>(0);

  private http = inject(HttpClient);
  constructor() {
    super();
  }

  login(payload: any) {
    return this.http.post<ILoginResponse>(
      `${environment.BASE_URL}/auth/signin`,

      payload
    );
  }

  signup(payload: any) {
    return this.http.post<IBaseResponse>(
      `${environment.BASE_URL}/auth/signup`,
      payload
    );
  }

  requestReset(email: any) {
    return this.http.post<IBaseResponse>(
      `${environment.BASE_URL}/auth/request-reset/${email}`,
      null
    );
  }

  resetPassword(payload: any) {
    return this.http.post<IBaseResponse>(
      `${environment.BASE_URL}/auth/reset-password`,
      payload
    );
  }

  verifyOtp(payload: any) {
    return this.http.get<IBaseResponse>(
      `${environment.BASE_URL}/auth/verify-email?c=${payload}`
    );
  }

  verifyOTP(payload: any) {
    return this.http.get<IBaseResponse>(
      `${environment.BASE_URL}/auth/verify-code?c=${payload}`
    );
  }

  requestOtp(email: any) {
    return this.http.post<IAuthResponse>(
      `${environment.BASE_URL}/auth/request-email-verify/${email}`,
      null
    );
  }

  getDepartments() {
    return this.http.get<IDepartmentResponse>(
      `${environment.BASE_URL}/divisions`
    );
  }

  allRequisition(params: any) {
    return this.http.get<IAdminRequisitionResponse>(
      `${environment.BASE_URL}/admin/all-requisition`,
      { params }
    );
  }

  staffs(params: any) {
    return this.http.get<IStaffResponse>(
      `${environment.BASE_URL}/admin/manage-users`,
      {
        params,
      }
    );
  }

  staffAnalytics() {
    return this.http
      .get<IBaseResponse>(`${environment.BASE_URL}/admin/member-analysis`)
      .pipe(
        tap((data) => {
          this.activeUsers.set(data.data.active);
          this.inactiveUsers.set(data.data.inactive);
        })
      );
  }

  requestAnalytics() {
    return this.http
      .get<IBaseResponse>(`${environment.BASE_URL}/admin/request-analysis`)
      .pipe(
        tap((data) => {
          this.ictPending.set(data.data.ict_pending);
          this.storePending.set(data.data.store_pending);
          this.issuedRequest.set(data.data.issued);
        })
      );
  }

  personalAnalytics() {
    return this.http
      .get<IBaseResponse>(`${environment.BASE_URL}/requests/request-analysis`)
      .pipe(
        tap((data) => {
          this.ictPending.set(data.data.ict_pending);
          this.storePending.set(data.data.store_pending);
          this.issuedRequest.set(data.data.issued);
        })
      );
  }

  updateMember(email: string, payload: any) {
    return this.http.put<IStaffUpdateResponse>(
      `${environment.BASE_URL}/admin/update-user/${email}`,
      payload
    );
  }

  addRequisition(request: any) {
    return this.http.post(`${environment.BASE_URL}/requests/`, request);
  }

  myRequisitions(params) {
    return this.http.get<IMyRequisitionResponse>(
      `${environment.BASE_URL}/requests/individual/request`,
      { params }
    );
  }

  ictRequisitions(params: any) {
    return this.http.get<IIctRequisitionResponse>(
      `${environment.BASE_URL}/ict/all`,
      { params }
    );
  }

  reviewIct(unique_id: string, payload: any) {
    return this.http.put(
      `${environment.BASE_URL}/requests/${unique_id}`,
      payload
    );
  }

  reviewStore(unique_id: string, payload: any) {
    return this.http.put<IStoreReviewResponse>(
      `${environment.BASE_URL}/requests/${unique_id}/store`,
      payload
    );
  }

  storeRequisitions(params: any) {
    return this.http.get<IStoreResponse>(`${environment.BASE_URL}/stores/all`, {
      params,
    });
  }

  adminMemberReq(email: string, params) {
    return this.http.get<IAdminRequisitionResponse>(
      `${environment.BASE_URL}/admin/${email}/request`,
      { params }
    );
  }

  upload(form) {
    return this.http.post(`${environment.BASE_URL}/profiles/upload`, form, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }

  profileUpdate(payload: any) {
    return this.http.put(`${environment.BASE_URL}/profiles`, payload);
  }

  changePassword(payload: any) {
    return this.http.put(`${environment.BASE_URL}/users`, payload);
  }

  // ddpd
}
