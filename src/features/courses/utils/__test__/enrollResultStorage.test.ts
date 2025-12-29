import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import {
  ENROLL_RESULT_STORAGE_KEY,
  clearEnrollResult,
  readEnrollResult,
  saveEnrollResult,
  type EnrollResultStorage,
} from '../enrollResultStorage';

const mockSessionStorage = () => {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
};

describe('enrollResultStorage', () => {
  const sessionStorageMock = mockSessionStorage();

  beforeAll(() => {
    vi.stubGlobal('window', { sessionStorage: sessionStorageMock } as unknown as Window);
  });

  afterEach(() => {
    sessionStorageMock.getItem.mockClear();
    sessionStorageMock.setItem.mockClear();
    sessionStorageMock.removeItem.mockClear();
  });

  it('저장한 결과를 읽어올 수 있다', () => {
    const data: EnrollResultStorage = {
      success: [{ courseId: 1, courseTitle: 'A' }],
      failed: [{ courseId: 2, reason: 'Full' }],
    };

    saveEnrollResult(data);

    expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
      ENROLL_RESULT_STORAGE_KEY,
      JSON.stringify(data)
    );
    const read = readEnrollResult();
    expect(read).toEqual(data);
  });

  it('값이 없으면 null을 반환한다', () => {
    sessionStorageMock.getItem.mockReturnValueOnce('');
    expect(readEnrollResult()).toBeNull();
  });

  it('잘못된 JSON이면 null을 반환한다', () => {
    sessionStorageMock.getItem.mockReturnValueOnce('invalid json');
    expect(readEnrollResult()).toBeNull();
  });

  it('clearEnrollResult가 값을 삭제한다', () => {
    clearEnrollResult();
    expect(sessionStorageMock.removeItem).toHaveBeenCalledWith(
      ENROLL_RESULT_STORAGE_KEY
    );
  });
});
