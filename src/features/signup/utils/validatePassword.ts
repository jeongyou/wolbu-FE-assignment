export const validatePassword = (value: string) => {
  if (!value) {
    return '비밀번호를 입력해주세요';
  }

  if (value.length < 6 || value.length > 10) {
    return '비밀번호는 6~10자여야 합니다';
  }

  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);

  const categoryCount = [hasLower, hasUpper, hasNumber].filter(Boolean).length;
  if (categoryCount < 2) {
    return '영문 대소문자, 숫자 중 두 가지 이상을 조합해주세요';
  }

  return true;
};
