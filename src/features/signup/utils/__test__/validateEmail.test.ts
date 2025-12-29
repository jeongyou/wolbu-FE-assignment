import { describe, expect, it } from 'vitest';

import { validateEmail } from '../validateEmail';

describe('validateEmail', () => {
  it('값이 없으면 필수 입력 메시지를 반환한다', () => {
    expect(validateEmail('')).toBe('이메일을 입력해주세요');
  });

  it('형식이 올바르지 않으면 오류 메시지를 반환한다', () => {
    expect(validateEmail('test')).toBe('올바른 이메일 형식을 입력해주세요');
    expect(validateEmail('test@domain')).toBe(
      '올바른 이메일 형식을 입력해주세요'
    );
  });

  it('올바른 이메일이면 true를 반환한다', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@example.co.kr')).toBe(true);
  });
});
