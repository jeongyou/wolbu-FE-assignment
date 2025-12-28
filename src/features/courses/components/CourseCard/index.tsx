'use client';

import { HiCheck } from 'react-icons/hi';
import { Flex } from '@/shared/components/Flex';
import type { Course } from '../../api/types';
import * as S from './CourseCard.styles';
import { formatPrice } from '../../utils/formatPrice';

type CourseCardProps = {
  course: Course;
  checked: boolean;
  onToggle: () => void;
};

const CourseCard = ({ course, checked, onToggle }: CourseCardProps) => {
  const disabled = course.isFull;
  const handleCheckboxClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    if (disabled) return;
    onToggle();
  };

  return (
    <S.Container disabled={disabled}>
      <S.CheckButton
        type='button'
        checked={checked}
        onClick={handleCheckboxClick}
        aria-pressed={checked}
        disabled={disabled}
      >
        {checked && <HiCheck size={16} />}
      </S.CheckButton>

      <S.CourseInfo>
        <Flex direction='row' justify='space-between'>
          <S.Title>{course.title}</S.Title>
          <S.Price data-disabled={disabled}>
            {formatPrice(course.price)}
          </S.Price>
        </Flex>

        <Flex direction='row' justify='space-between'>
          <S.Meta>강사: {course.instructorName}</S.Meta>
          <Flex direction='column' align='flex-end'>
            <S.Meta>
              수강인원: {course.currentStudents} / {course.maxStudents}명 (
              {course.isFull ? '마감' : `잔여 ${course.availableSeats}석`})
            </S.Meta>
          </Flex>
        </Flex>
      </S.CourseInfo>
    </S.Container>
  );
};

export default CourseCard;
