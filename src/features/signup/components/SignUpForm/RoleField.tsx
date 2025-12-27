'use client';

import { Input } from '@/shared/components/Input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import RoleSelect from '../RoleSelect';

type RoleFieldProps = {
  registration: UseFormRegisterReturn<'role'>;
  error?: FieldError;
};

const RoleField = ({ registration, error }: RoleFieldProps) => {
  return (
    <Input label='회원 유형' error={error?.message}>
      <RoleSelect registration={registration} />
    </Input>
  );
};

export default RoleField;
