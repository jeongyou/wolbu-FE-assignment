import { describe, expect, it } from 'vitest';

import { validateTitle } from '../validateTitle';

describe('validateTitle', () => {
  it('값이 없으면 필수 입력 메시지를 반환한다', () => {
    expect(validateTitle('')).toBe('강의명을 입력해주세요');
    expect(validateTitle('   ')).toBe('강의명을 입력해주세요');
  });

  it('정상 값이면 true를 반환한다', () => {
    expect(validateTitle('React 입문')).toBe(true);
  });
});
