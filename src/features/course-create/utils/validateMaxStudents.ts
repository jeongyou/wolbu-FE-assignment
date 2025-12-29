export const validateMaxStudents = (value: number) => {
  if (Number.isNaN(value)) return '숫자를 입력해주세요';
  if (value <= 0) return '1명 이상 입력해주세요';
  return true;
};
