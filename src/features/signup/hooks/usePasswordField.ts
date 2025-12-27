import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../types';
import { validatePassword } from '../utils/validatePassword';

type UsePasswordFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const usePasswordField = ({ register }: UsePasswordFieldParams) => {
  const registration = register('password', {
    required: '비밀번호는 필수 입력입니다',
    validate: validatePassword,
  });

  return {
    registration,
  };
};
