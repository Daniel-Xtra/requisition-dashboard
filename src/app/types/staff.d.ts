import { TDivision, TProfile, TUser } from './user';

export type TStaff = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: any;
  membership_type: string;
  phone_number: string;
  password_reset_code: any;
  verified: boolean;
  player_id: any;
  pass_updated: number;
  created_at: string;
  divisionId: number;
  profile: TProfile;
  division: TDivision;
};
