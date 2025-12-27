import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../types';
import { validateEmail } from '../utils/validateEmail';

type UseEmailFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const useEmailField = ({ register }: UseEmailFieldParams) => {
  const registration = register('email', { validate: validateEmail });

  return {
    registration,
  };
};
