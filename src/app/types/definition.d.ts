export type TUser = {
  id: number;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  membership_type: string;
  password_reset_code: any;
  verified: boolean;
  player_id: any;
  pass_updated: number;
  refresh_token: any;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  divisionId: number;
  profile: TProfile;
};

export type TResetPassword = {
  code: string;
  password: string;
  confirm_password?: string;
};

export type TDepartment = {
  id: number;
  name: string;
  slug: string;
  abbreviation: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
};

export type TList = {
  id: number;
  item: string;
  unique_id: string;
  qty_required: number;
  purpose: any;
  status: string;
  requested_by: number;
  qty_approved: any;
  comment: any;
  approved_by: number;
  date_approved: any;
  qty_issued: any;
  issued_by: number;
  date_issued: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  divisionId: number;
  user: TUser;
  division: TDivision;
  approved_name: TApprovedName;
  issuer_name: TIssuerName;
};

export type TDivision = {
  id: number;
  name: string;
  slug: string;
  abbreviation: string;
};

export type TApprovedName = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  membership_type: string;
  password_reset_code: any;
  verified: boolean;
  player_id: any;
  pass_updated: number;
  created_at: string;
  divisionId: any;
};

export type TIssuerName = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  membership_type: string;
  password_reset_code: any;
  verified: boolean;
  player_id: any;
  pass_updated: number;
  created_at: string;
  divisionId: any;
};

export type TProfile = {
  id: number;
  profile_picture_url: any;
  current_position: string;
  created_at: string;
};

export enum Role {
  staff = 'staff',
  admin = 'admin',
  store = 'store',
  ict = 'ict',
}

export type TRequisition_Add = {
  division: string;
  purpose: string;
  requests: TRequests;
};

export type TRequests = {
  item: string;
  qty_required: number;
};

export type TIct_Review = {
  qty_approved: number;
  comment: string;
};

export type TStore_Review = {
  qty_issued: number;
};
