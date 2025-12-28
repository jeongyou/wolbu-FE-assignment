import { http } from '@/api/client';

import { SignUpFormValues } from '../types';

export const postSignUp = (payload: SignUpFormValues) =>
  http.post<void>('/api/users/signup', payload);
