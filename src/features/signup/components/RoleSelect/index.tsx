'use client';

import { InputBase } from '@/shared/components/Input';
import * as S from './RoleSelect.styles';

export type Role = 'STUDENT' | 'INSTRUCTOR';

type RoleSelectProps = {
  value: Role | null;
  onChange: (next: Role) => void;
};

const RoleSelect = ({ value, onChange }: RoleSelectProps) => {
  return (
    <S.Container>
      <S.Option>
        <InputBase
          type='checkbox'
          checked={value === 'STUDENT'}
          onChange={() => onChange('STUDENT')}
        />
        <span>수강생</span>
      </S.Option>

      <S.Option>
        <InputBase
          type='checkbox'
          checked={value === 'INSTRUCTOR'}
          onChange={() => onChange('INSTRUCTOR')}
        />
        <span>강사</span>
      </S.Option>
    </S.Container>
  );
};

export default RoleSelect;
