'use client';

import { Input, InputBase } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type MaxStudentsFieldProps = {
  registration: UseFormRegisterReturn<'maxStudents'>;
  error?: FieldError;
};

const MaxStudentsField = ({ registration, error }: MaxStudentsFieldProps) => {
  return (
    <Input label='수강 인원' error={error?.message}>
      <InputBase
        placeholder='수강 인원을 입력해주세요'
        type='text'
        inputMode='numeric'
        {...registration}
      />
    </Input>
  );
};

export default MaxStudentsField;
