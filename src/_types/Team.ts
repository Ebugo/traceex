import { Auth } from './Authentication';

export interface Team {
  id: string;
  created_at: string;
  updated_at: string;
  role: string;
  auth_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: null;
  is_delete: boolean;
  business: string;
  username: null;
  user_auth: Auth;
}

export type CreateTeamMember = Pick<
  Team,
  'first_name' | 'last_name' | 'email' | 'role'
>;

export type UpdateTeamMember = Omit<CreateTeamMember, 'email'> & {
  profile_id: Team['id'];
};
