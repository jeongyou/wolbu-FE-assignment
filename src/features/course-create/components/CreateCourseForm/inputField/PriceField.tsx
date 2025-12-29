'use client';

import { Input, InputBase } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type PriceFieldProps = {
  registration: UseFormRegisterReturn<'price'>;
  error?: FieldError;
};

const PriceField = ({ registration, error }: PriceFieldProps) => {
  return (
    <Input label='가격' error={error?.message}>
      <InputBase
        placeholder='가격을 입력해주세요'
        type='text'
        inputMode='numeric'
        {...registration}
      />
    </Input>
  );
};

export default PriceField;
