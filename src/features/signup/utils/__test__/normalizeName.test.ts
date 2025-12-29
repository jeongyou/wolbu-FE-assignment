import { describe, expect, it } from 'vitest';

import { trimName } from '../normalizeName';

describe('trimName', () => {
  it('앞뒤 공백을 제거한다', () => {
    expect(trimName('  홍 길동  ')).toBe('홍 길동');
  });

  it('공백이 없는 문자열은 그대로 반환한다', () => {
    expect(trimName('홍길동')).toBe('홍길동');
  });
});
