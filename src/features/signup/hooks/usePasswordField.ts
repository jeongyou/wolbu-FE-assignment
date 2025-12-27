import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../types';
import { validatePassword } from '../utils/validatePassword';

type UsePasswordFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const usePasswordField = ({ register }: UsePasswordFieldParams) => {
  const registration = register('password', {
    required: '비밀번호를 입력해주세요',
    validate: validatePassword,
  });

  return {
    registration,
  };
};
