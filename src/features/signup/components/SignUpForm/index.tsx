'use client';

import { useForm } from 'react-hook-form';
import { Input, InputBase } from '@/shared/components/Input';
import { Flex } from '@/shared/components/Flex';
import RoleSelect, { Role } from '../RoleSelect';
import { useState } from 'react';
import ConfirmButton from '../ConfirmButton';
import NameField from './NameField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';

import { usePhoneField } from '../../hooks/usePhoneField';
import { useEmailField } from '../../hooks/useEmailField';
import { SignUpFormValues } from '../../types';
import { formatPhone } from '../../utils/validatePhone';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log({ ...values, phone: formatPhone(values.phone) });
  };

  const { registration: emailRegistration } = useEmailField({ register });
  const {
    phoneValue,
    registration: phoneRegistration,
    handleChange: handlePhoneChange,
    handleBlur: handlePhoneBlur,
  } = usePhoneField({ register, setValue, watch });

  const [role, setRole] = useState<Role | null>(null);
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction='column' gap={16}>
        <NameField
          registration={register('name', { required: '이름을 입력해주세요' })}
          error={errors.name}
        />

        <EmailField registration={emailRegistration} error={errors.email} />

        <PhoneField
          registration={phoneRegistration}
          value={phoneValue}
          error={errors.phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
        />

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
