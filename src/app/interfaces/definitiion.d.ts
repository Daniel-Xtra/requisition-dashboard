import { TStaff } from '../types/staff';
import { TDepartment, TResult, TUser } from '../types/user';

export interface IBaseResponse {
  readonly status?: boolean;
  readonly message?: string;
  readonly data?: any;
}

export interface IAuthResponse extends IBaseResponse {
  readonly data: TUser;
}
export interface ILoginResponse extends IBaseResponse {
  readonly data: {
    user: TUser;
    token: string;
    refreshToken: string;
  };
}

export interface IDepartmentResponse extends IBaseResponse {
  readonly data: TDepartment[];
}

export interface IAdminRequisitionResponse extends IBaseResponse {
  readonly data: {
    count: number;
    results: TResult[];
    totalPages: number;
    currentPage: number;
  };
}

export interface IMyRequisitionResponse extends IBaseResponse {
  readonly data: {
    count: number;
    results: TResult[];
    totalPages: number;
    currentPage: number;
  };
}

export interface IIctRequisitionResponse extends IBaseResponse {
  readonly data: {
    count: number;
    results: TResult[];
    totalPages: number;
    currentPage: number;
  };
}

export interface IStaffResponse extends IBaseResponse {
  readonly data: {
    count: number;
    results: TStaff[];
    totalPages: number;
    currentPage: number;
  };
}

export interface IStoreResponse extends IBaseResponse {
  readonly data: {
    count: number;
    results: TResult[];
    totalPages: number;
    currentPage: number;
  };
}

export interface IStaffUpdateResponse extends IBaseResponse {
  readonly data: TStaff;
}

export interface IStoreReviewResponse extends IBaseResponse {
  readonly data: TResult;
}
