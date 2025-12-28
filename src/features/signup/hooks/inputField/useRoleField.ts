import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../../types';

type UseRoleFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const useRoleField = ({ register }: UseRoleFieldParams) => {
  const registration = register('role', {
    required: '회원 유형은 필수로 선택해야 합니다',
  });

  return { registration };
};
