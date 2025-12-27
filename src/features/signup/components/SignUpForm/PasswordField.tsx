'use client';

import { Input, InputBase } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type PasswordFieldProps = {
  registration: UseFormRegisterReturn<'password'>;
  error?: FieldError;
};

const PasswordField = ({ registration, error }: PasswordFieldProps) => {
  return (
    <Input
      label='비밀번호'
      error={error?.message}
      helperText={`• 최소 6자 이상 10자 이하
• 영문 소문자, 대문자, 숫자 중 최소 두 가지 이상 조합 필요`}
    >
      <InputBase
        placeholder='비밀번호를 입력해주세요'
        type='password'
        autoComplete='new-password'
        {...registration}
      />
    </Input>
  );
};

export default PasswordField;
