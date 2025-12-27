'use client';

import { FocusEvent } from 'react';
import { Input, InputBase } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type PhoneFieldProps = {
  registration: UseFormRegisterReturn<'phone'>;
  value: string;
  error?: FieldError;
  onChange: (next: string) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

const PhoneField = ({
  registration,
  value,
  error,
  onChange,
  onBlur,
}: PhoneFieldProps) => {
  return (
    <Input label='휴대폰 번호' error={error?.message}>
      <InputBase
        placeholder='010-1234-5678'
        inputMode='tel'
        autoComplete='tel-national'
        {...registration}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onBlur={(event) => {
          onBlur(event);
        }}
      />
    </Input>
  );
};

export default PhoneField;
