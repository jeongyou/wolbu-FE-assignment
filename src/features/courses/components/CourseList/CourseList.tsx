'use client';

import type { Course } from '../../api/types';
import CourseCard from '../CourseCard';

import { useCourseSelection } from '../../hooks/useCourseSelection';
import * as S from './CourseList.styles';

type CourseListProps = {
  courses: Course[];
};

const CourseList = ({ courses }: CourseListProps) => {
  const { isSelected, toggle } = useCourseSelection();

  if (!courses.length) return <p>강의가 없습니다.</p>;

  return (
    <>
      <S.List>
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard
              course={course}
              checked={isSelected(course.id)}
              onToggle={() => toggle(course.id)}
            />
          </li>
        ))}
      </S.List>
    </>
  );
};

export default CourseList;
