import { TDepartment, TList, TUser } from '../types/definition';

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
    list: TList;
    totalPages: number;
    currentPage: number;
  };
}
