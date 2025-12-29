export const validateTitle = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '강의명을 입력해주세요';
  return true;
};
