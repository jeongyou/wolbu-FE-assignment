import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../types';

type UseRoleFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const useRoleField = ({ register }: UseRoleFieldParams) => {
  const registration = register('role', {
    required: '회원 유형을 선택해주세요',
  });

  return { registration };
};
