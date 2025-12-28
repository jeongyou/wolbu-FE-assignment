'use client';

import { Input, InputBase } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type NameFieldProps = {
  registration: UseFormRegisterReturn<'name'>;
  error?: FieldError;
};

const NameField = ({ registration, error }: NameFieldProps) => {
  return (
    <Input label='이름' error={error?.message}>
      <InputBase
        placeholder='이름을 입력해주세요'
        type='text'
        autoComplete='name'
        {...registration}
      />
    </Input>
  );
};

export default NameField;
