'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

import { InputBase } from '@/shared/components/Input';
import * as S from './RoleSelect.styles';

type RoleSelectProps = {
  registration: UseFormRegisterReturn<'role'>;
};

const RoleSelect = ({ registration }: RoleSelectProps) => {
  return (
    <S.Container>
      <S.Option>
        <InputBase type='radio' value='STUDENT' {...registration} />
        <span>수강생</span>
      </S.Option>

      <S.Option>
        <InputBase type='radio' value='INSTRUCTOR' {...registration} />
        <span>강사</span>
      </S.Option>
    </S.Container>
  );
};

export default RoleSelect;
