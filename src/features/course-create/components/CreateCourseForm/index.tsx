'use client';

import { useForm } from 'react-hook-form';
import MaxStudentsField from './inputField/MaxStudentsField';
import PriceField from './inputField/PriceField';
import TitleField from './inputField/TitleField';
import { useTitleField } from '../../hooks/inputField/useTitleField';
import { usePriceField } from '../../hooks/inputField/usePriceField';
import { useMaxStudentsField } from '../../hooks/inputField/useMaxStudentsField';
import { Flex } from '@/shared/components/Flex';
import BottomActionBar from '@/shared/components/BottomActionBar';

export type CreateCourseFormValues = {
  title: string;
  price: number;
  maxStudents: number;
};

const CreateCourseForm = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateCourseFormValues>({
    defaultValues: {
      title: '',
      price: 0,
      maxStudents: 0,
    },
    mode: 'onChange',
  });

  const { registration: titleRegistration } = useTitleField({ register });
  const { registration: priceRegistration } = usePriceField({ register });
  const { registration: maxStudentsRegistration } = useMaxStudentsField({
    register,
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <Flex direction='column' gap={16}>
        <TitleField registration={titleRegistration} error={errors.title} />
        <PriceField registration={priceRegistration} error={errors.price} />
        <MaxStudentsField
          registration={maxStudentsRegistration}
          error={errors.maxStudents}
        />
      </Flex>
      <BottomActionBar
        label='강의 등록하기'
        disabled={!isValid || isSubmitting}
        onClick={() => {}}
      />
    </form>
  );
};

export default CreateCourseForm;
