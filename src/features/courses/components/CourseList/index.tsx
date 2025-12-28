'use client';

import type { Course } from '../../api/types';
import CourseCard from '../CourseCard';
import * as S from './CourseList.styles';

type CourseListProps = {
  courses: Course[];
  isSelected: (id: number) => boolean;
  onToggle: (id: number) => void;
};

const CourseList = ({ courses, isSelected, onToggle }: CourseListProps) => {
  if (!courses.length) return <p>강의가 없습니다.</p>;

  return (
    <S.List>
      {courses.map((course, index) => (
        <li key={`${course.id}-${index}`}>
          <CourseCard
            course={course}
            checked={isSelected(course.id)}
            onToggle={() => onToggle(course.id)}
          />
        </li>
      ))}
    </S.List>
  );
};

export default CourseList;
