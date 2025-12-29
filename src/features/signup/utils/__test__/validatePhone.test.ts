import { describe, expect, it } from 'vitest';

import {
  formatPhone,
  normalizePhone,
  validatePhone,
} from '../validatePhone';

describe('normalizePhone', () => {
  it('숫자만 남기고 11자리로 자른다', () => {
    expect(normalizePhone('010-1234-5678')).toBe('01012345678');
    expect(normalizePhone('01012345678999')).toBe('01012345678');
    expect(normalizePhone('abc0101234')).toBe('0101234');
  });
});

describe('formatPhone', () => {
  it('자리수에 따라 하이픈을 넣어 포맷한다', () => {
    expect(formatPhone('0101')).toBe('010-1');
    expect(formatPhone('0101234')).toBe('010-1234');
    expect(formatPhone('01012345678')).toBe('010-1234-5678');
  });
});

describe('validatePhone', () => {
  it('값이 없으면 필수 입력 메시지를 반환한다', () => {
    expect(validatePhone('')).toBe('휴대폰 번호를 입력해주세요');
  });

  it('11자리가 아니면 오류 메시지를 반환한다', () => {
    expect(validatePhone('0101234')).toBe('휴대폰 번호 11자리를 입력해주세요');
  });

  it('허용되지 않은 번호대면 오류 메시지를 반환한다', () => {
    expect(validatePhone('01212345678')).toBe('올바른 휴대폰 번호를 입력해주세요');
  });

  it('유효한 번호면 true를 반환한다', () => {
    expect(validatePhone('010-1234-5678')).toBe(true);
    expect(validatePhone('01912345678')).toBe(true); // 과거 번호 체계
  });
});
