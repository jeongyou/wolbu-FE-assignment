export const validateEmail = (value: string) => {
  if (!value) {
    return '이메일을 입력해주세요';
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(value)) {
    return '올바른 이메일 형식을 입력해주세요';
  }

  return true;
};
