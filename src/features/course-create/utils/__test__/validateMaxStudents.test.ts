import { describe, expect, it } from 'vitest';

import { validateMaxStudents } from '../validateMaxStudents';

describe('validateMaxStudents', () => {
  it('값이 없거나 NaN이면 숫자 입력 요청을 반환한다', () => {
    expect(validateMaxStudents(null)).toBe('숫자를 입력해주세요');
    expect(validateMaxStudents(NaN)).toBe('숫자를 입력해주세요');
  });

  it('0 이하이면 오류 메시지를 반환한다', () => {
    expect(validateMaxStudents(0)).toBe('1명 이상 입력해주세요');
    expect(validateMaxStudents(-1)).toBe('1명 이상 입력해주세요');
  });

  it('양수이면 true를 반환한다', () => {
    expect(validateMaxStudents(30)).toBe(true);
  });
});
