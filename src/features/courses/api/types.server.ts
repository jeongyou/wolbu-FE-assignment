export type CourseServerResponse = {
  id: number;
  title: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
};

export type GetCoursesServerResponse = {
  content: CourseServerResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // 현재 페이지
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
