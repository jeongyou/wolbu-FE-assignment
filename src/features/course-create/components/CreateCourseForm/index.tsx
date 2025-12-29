'use client';

import ConfirmButton from '@/features/signup/components/ConfirmButton';
import { Flex } from '@/shared/components/Flex';
import { useForm } from 'react-hook-form';
import { useMaxStudentsField } from '../../hooks/inputField/useMaxStudentsField';
import { usePriceField } from '../../hooks/inputField/usePriceField';
import { useTitleField } from '../../hooks/inputField/useTitleField';
import { useCreateCourseSubmit } from '../../hooks/useCreateCourseSubmit';
import MaxStudentsField from './inputField/MaxStudentsField';
import PriceField from './inputField/PriceField';
import TitleField from './inputField/TitleField';

export type CreateCourseFormValues = {
  title: string;
  price: number | null;
  maxStudents: number | null;
};

const CreateCourseForm = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    setError,
    handleSubmit,
  } = useForm<CreateCourseFormValues>({
    defaultValues: {
      title: '',
      price: null,
      maxStudents: null,
    },
    mode: 'onChange',
  });

  const { registration: titleRegistration } = useTitleField({ register });
  const { registration: priceRegistration } = usePriceField({ register });
  const { registration: maxStudentsRegistration } = useMaxStudentsField({
    register,
  });

  const {
    handleSubmit: handleCreateCourseSubmit,
    loading: createCourseLoading,
  } = useCreateCourseSubmit({ setError });

  return (
    <form onSubmit={handleSubmit(handleCreateCourseSubmit)} noValidate>
      <Flex direction='column' gap={16}>
        <TitleField registration={titleRegistration} error={errors.title} />
        <PriceField registration={priceRegistration} error={errors.price} />
        <MaxStudentsField
          registration={maxStudentsRegistration}
          error={errors.maxStudents}
        />
        <ConfirmButton
          disabled={!isValid}
          loading={isSubmitting || createCourseLoading}
        >
          강의 등록하기
        </ConfirmButton>
      </Flex>
    </form>
  );
};

export default CreateCourseForm;
