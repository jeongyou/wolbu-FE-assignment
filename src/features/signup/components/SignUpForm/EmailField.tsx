'use client';

import { Input, InputBase } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type EmailFieldProps = {
  registration: UseFormRegisterReturn<'email'>;
  error?: FieldError;
};

const EmailField = ({ registration, error }: EmailFieldProps) => {
  return (
    <Input label='이메일' error={error?.message}>
      <InputBase
        placeholder='example@email.com'
        type='email'
        inputMode='email'
        autoComplete='email'
        {...registration}
      />
    </Input>
  );
};

export default EmailField;
