export const normalizePhone = (value: string) =>
  value.replace(/\D/g, '').slice(0, 11);

export const formatPhone = (value: string) => {
  const digits = normalizePhone(value);

  if (digits.length < 4) {
    return digits;
  }

  if (digits.length < 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

export const validatePhone = (value: string) => {
  const digits = normalizePhone(value);

  if (!digits) {
    return '휴대폰 번호를 입력해주세요';
  }

  if (digits.length < 10 || digits.length > 11) {
    return '휴대폰 번호 10~11자리를 입력해주세요';
  }

  const formatted = formatPhone(digits);
  if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formatted)) {
    return '올바른 휴대폰 번호를 입력해주세요';
  }

  return true;
};
