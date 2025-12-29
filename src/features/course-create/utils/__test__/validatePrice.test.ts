import { describe, expect, it } from 'vitest';

import { validatePrice } from '../validatePrice';

describe('validatePrice', () => {
  it('값이 없거나 NaN이면 숫자 입력 요청을 반환한다', () => {
    expect(validatePrice(null)).toBe('숫자를 입력해주세요');
    expect(validatePrice(NaN)).toBe('숫자를 입력해주세요');
  });

  it('0 이하이면 오류 메시지를 반환한다', () => {
    expect(validatePrice(0)).toBe('가격은 0보다 커야 합니다');
    expect(validatePrice(-100)).toBe('가격은 0보다 커야 합니다');
  });

  it('양수이면 true를 반환한다', () => {
    expect(validatePrice(10000)).toBe(true);
  });
});
