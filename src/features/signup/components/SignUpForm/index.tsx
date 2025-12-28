'use client';

import { useForm } from 'react-hook-form';
import { Flex } from '@/shared/components/Flex';
import ConfirmButton from '../ConfirmButton';

import PhoneField from './inputField/PhoneField';
import PasswordField from './inputField/PasswordField';
import RoleField from './inputField/RoleField';
import NameField from './inputField/NameField';
import EmailField from './inputField/EmailField';

import { useNameField } from '../../hooks/inputField/useNameField';
import { usePhoneField } from '../../hooks/inputField/usePhoneField';

import { usePasswordField } from '../../hooks/inputField/usePasswordField';
import { useRoleField } from '../../hooks/inputField/useRoleField';
import { useSignUpSubmit } from '../../hooks/useSignUpSubmit';
import { SignUpFormValues } from '../../types';
import { useToastContext } from '@/shared/components/Toast/ToastProvider';
import { useEmailField } from '../../hooks/inputField/useEmailField';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    setError,
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

  const { showToast } = useToastContext();
  const { handleSubmit: handleSignUpSubmit, signUpLoading } = useSignUpSubmit({
    setError,
    onSuccess: showToast,
  });

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
    <form onSubmit={handleSubmit(handleSignUpSubmit)} noValidate>
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

        <ConfirmButton
          disabled={!isValid}
          loading={isSubmitting || signUpLoading}
        >
          가입하기
        </ConfirmButton>
      </Flex>
    </form>
  );
};

export default SignUpForm;
