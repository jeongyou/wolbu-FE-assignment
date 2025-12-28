import { http } from '@/api/client';

import { SignUpFormValues, Role } from '../types';

export type SignUpRequest = SignUpFormValues;

export type SignUpResponse = {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: Role;
  message: string;
};

export const postSignUp = (payload: SignUpRequest) =>
  http.post<SignUpResponse>('/api/users/signup', payload);
