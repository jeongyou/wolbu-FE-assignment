import { describe, expect, it } from 'vitest';

import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
  it('가격을 천 단위 구분 기호와 원 단위로 포맷한다', () => {
    expect(formatPrice(0)).toBe('0원');
    expect(formatPrice(1000)).toBe('1,000원');
    expect(formatPrice(1234567)).toBe('1,234,567원');
  });
});
