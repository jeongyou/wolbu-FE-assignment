export const validatePrice = (value: number) => {
  if (Number.isNaN(value)) return '숫자를 입력해주세요';
  if (value <= 0) return '가격은 0보다 커야 합니다';
  return true;
};
