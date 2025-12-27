import type { FocusEvent } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import { SignUpFormValues } from '../types';
import {
  formatPhone,
  normalizePhone,
  validatePhone,
} from '../utils/validatePhone';

type UsePhoneFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
};

export const usePhoneField = ({
  register,
  setValue,
  watch,
}: UsePhoneFieldParams) => {
  const registration = register('phone', {
    required: '전화번호를 입력해주세요',
    validate: validatePhone,
  });

  const phoneValue = watch('phone');

  const handleChange = (nextValue: string) => {
    const digits = normalizePhone(nextValue);
    setValue('phone', digits, { shouldValidate: true, shouldDirty: true });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const formatted = formatPhone(phoneValue);
    setValue('phone', formatted, { shouldValidate: true, shouldDirty: true });
    registration.onBlur(event);
  };

  return {
    phoneValue,
    registration,
    handleChange,
    handleBlur,
  };
};
