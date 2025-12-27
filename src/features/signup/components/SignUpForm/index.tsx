'use client';

import { useForm } from 'react-hook-form';
import { Flex } from '@/shared/components/Flex';
import ConfirmButton from '../ConfirmButton';
import NameField from './NameField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import PasswordField from './PasswordField';
import RoleField from './RoleField';

import { useNameField } from '../../hooks/useNameField';
import { usePhoneField } from '../../hooks/usePhoneField';
import { useEmailField } from '../../hooks/useEmailField';
import { usePasswordField } from '../../hooks/usePasswordField';
import { useRoleField } from '../../hooks/useRoleField';
import { SignUpFormValues } from '../../types';
import { formatPhone } from '../../utils/validatePhone';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'STUDENT',
    },
    mode: 'onChange',
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
  const { registration: roleRegistration } = useRoleField({ register });

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

        <RoleField registration={roleRegistration} error={errors.role} />

        <ConfirmButton disabled={!isValid} loading={isSubmitting}>
          가입하기
        </ConfirmButton>
      </Flex>
    </form>
  );
};

export default SignUpForm;
