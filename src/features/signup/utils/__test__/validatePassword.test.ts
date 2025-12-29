import { describe, expect, it } from 'vitest';

import { validatePassword } from '../validatePassword';

describe('validatePassword', () => {
  it('요구 길이 미만이면 오류 메시지를 반환한다', () => {
    expect(validatePassword('')).toBe('비밀번호를 입력해주세요');
    expect(validatePassword('Ab1')).toBe('비밀번호는 6~10자여야 합니다');
  });

  it('요구 길이 초과이면 오류 메시지를 반환한다', () => {
    expect(validatePassword('Abcdef12345')).toBe('비밀번호는 6~10자여야 합니다');
  });

  it('영문/숫자 이외 문자가 포함되면 거부한다', () => {
    expect(validatePassword('Abcd1한')).toBe(
      '비밀번호는 영문과 숫자만 입력할 수 있습니다'
    );
    expect(validatePassword('Abcd1!')).toBe(
      '비밀번호는 영문과 숫자만 입력할 수 있습니다'
    );
  });

  it('대/소문자/숫자 중 두 가지 미만이면 거부한다', () => {
    expect(validatePassword('abcdef')).toBe(
      '영문 대소문자, 숫자 중 두 가지 이상을 조합해주세요'
    );
    expect(validatePassword('ABCDEF')).toBe(
      '영문 대소문자, 숫자 중 두 가지 이상을 조합해주세요'
    );
    expect(validatePassword('123456')).toBe(
      '영문 대소문자, 숫자 중 두 가지 이상을 조합해주세요'
    );
  });

  it('조건을 만족하면 true를 반환한다', () => {
    expect(validatePassword('Abcdef')).toBe(true); // 대+소 조합
    expect(validatePassword('Abc123')).toBe(true); // 대+숫자
    expect(validatePassword('abc123')).toBe(true); // 소+숫자
    expect(validatePassword('Abc1234567')).toBe(true); // 최대 길이 경계
  });
});
