import {
  HttpSuccessResponse,
  Team,
  Business,
  CreateTeamMember,
  UpdateTeamMember,
  AuthSuccess,
} from '../_types';
import httpService from './httpService';

export const getTeamsApi = async (
  business_id: Business['id']
): Promise<HttpSuccessResponse<Team[]>> => {
  return httpService.get('team', {
    params: {
      business_id,
    },
  });
};

export const createTeamMemberApi = async (
  payload: CreateTeamMember
): Promise<HttpSuccessResponse<AuthSuccess>> => {
  return httpService.post('team', payload);
};

export const updateTeamMemberApi = async (
  payload: UpdateTeamMember
): Promise<HttpSuccessResponse<AuthSuccess>> => {
  return httpService.patch('team', payload);
};

export const deleteTeamMemberApi = async (
  auth_id: Team['id']
): Promise<HttpSuccessResponse<Team>> => {
  return httpService.delete('team', { data: { auth_id } });
};
