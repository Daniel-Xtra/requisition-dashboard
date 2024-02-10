import { Injectable, inject } from '@angular/core';
import { AppCoreService } from '../app-core/app-core.service';
import { HttpClient } from '@angular/common/http';
import {
  IAdminRequisitionResponse,
  IAuthResponse,
  IBaseResponse,
  IDepartmentResponse,
  ILoginResponse,
} from 'src/app/interfaces/definitiion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends AppCoreService {
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

  allRequisition(
    sort_by = 'all',
    page_no = 1,
    per_page = 15,
    from?: '',
    to?: ''
  ) {
    return this.http.get<IAdminRequisitionResponse>(
      `${environment.BASE_URL}/admin/all-requisition?sort_by=${sort_by}&page_no=${page_no}&per_page=${per_page}&from?=${from}&to?=${to}`
    );
  }
}
