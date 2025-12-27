'use client';

import { Flex } from '@/shared/components/Flex';
import { Input, InputBase } from '@/shared/components/Input';
import RoleSelect, { Role } from '../RoleSelect';
import { useState } from 'react';
import ConfirmButton from '../ConfirmButton';

const SignUpForm = () => {
  const [role, setRole] = useState<Role | null>(null);
  return (
    <Flex direction='column' gap={16}>
      <Input label='이름'>
        <InputBase />
      </Input>

      <Input label='이메일'>
        <InputBase />
      </Input>

      <Input label='휴대폰 번호'>
        <InputBase />
      </Input>

      <Input
        label='비밀번호'
        helperText={`• 최소 6자 이상 10자 이하
• 영문 소문자, 대문자, 숫자 중 최소 두 가지 이상 조합 필요`}
      >
        <InputBase />
      </Input>

      <Input label='회원 유형'>
        <RoleSelect value={role} onChange={setRole} />
      </Input>

      <ConfirmButton>가입하기</ConfirmButton>
    </Flex>
  );
};

export default SignUpForm;
