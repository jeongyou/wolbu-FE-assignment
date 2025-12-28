import { http } from '@/api/client';

import type { LoginRequest, LoginResponse } from './types';

export const postLogin = (payload: LoginRequest) =>
  http.post<LoginResponse>('/api/users/login', payload);
