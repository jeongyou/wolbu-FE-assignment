'use client';

import { Input, InputBase } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TitleFieldProps = {
  registration: UseFormRegisterReturn<'title'>;
  error?: FieldError;
};

const TitleField = ({ registration, error }: TitleFieldProps) => {
  return (
    <Input label='강의명' error={error?.message}>
      <InputBase
        placeholder='강의명을 입력해주세요'
        type='text'
        inputMode='text'
        {...registration}
      />
    </Input>
  );
};

export default TitleField;
