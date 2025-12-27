'use client';

import { useForm } from 'react-hook-form';
import { Input, InputBase } from '@/shared/components/Input';
import { Flex } from '@/shared/components/Flex';
import RoleSelect, { Role } from '../RoleSelect';
import { useState } from 'react';
import ConfirmButton from '../ConfirmButton';
import NameField from './NameField';

type SignUpFormValues = {
  name: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log(values);
  };

  const [role, setRole] = useState<Role | null>(null);
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction='column' gap={16}>
        <NameField
          registration={register('name', { required: '이름을 입력해주세요' })}
          error={errors.name}
        />

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
    </form>
  );
};

export default SignUpForm;
