export type GetCoursesParams = {
  page?: number; // 페이지 번호 (0부터 시작)
  size?: number; // 페이지 크기
  sort?: 'recent' | 'popular' | 'rate';
};

export type Course = {
  id: number;
  title: string;
  instructorName: string;
  currentStudents: number;
  maxStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
};

export type CoursePage = {
  courses: Course[];
  totalPages: number;
  currentPage: number;
};
