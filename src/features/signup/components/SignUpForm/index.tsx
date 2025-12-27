'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/shared/components/Input';
import { Flex } from '@/shared/components/Flex';
import RoleSelect, { Role } from '../RoleSelect';
import { useState } from 'react';
import ConfirmButton from '../ConfirmButton';
import NameField from './NameField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';

import { useNameField } from '../../hooks/useNameField';
import { usePhoneField } from '../../hooks/usePhoneField';
import { useEmailField } from '../../hooks/useEmailField';
import { SignUpFormValues } from '../../types';
import { formatPhone } from '../../utils/validatePhone';
import PasswordField from './PasswordField';
import { usePasswordField } from '../../hooks/usePasswordField';

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
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log({ ...values, phone: formatPhone(values.phone) });
  };

  const { registration: nameRegistration } = useNameField({ register });

  const { registration: emailRegistration } = useEmailField({ register });
  const {
    phoneValue,
    registration: phoneRegistration,
    handleChange: handlePhoneChange,
    handleBlur: handlePhoneBlur,
  } = usePhoneField({ register, setValue, watch });

  const { registration: passwordRegistration } = usePasswordField({ register });

  const [role, setRole] = useState<Role | null>(null);
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction='column' gap={16}>
        <NameField registration={nameRegistration} error={errors.name} />

        <EmailField registration={emailRegistration} error={errors.email} />

        <PhoneField
          registration={phoneRegistration}
          value={phoneValue}
          error={errors.phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
        />

        <PasswordField
          registration={passwordRegistration}
          error={errors.password}
        />

        <Input label='회원 유형'>
          <RoleSelect value={role} onChange={setRole} />
        </Input>

        <ConfirmButton>가입하기</ConfirmButton>
      </Flex>
    </form>
  );
};

export default SignUpForm;
