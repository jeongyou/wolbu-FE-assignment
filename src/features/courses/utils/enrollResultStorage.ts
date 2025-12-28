'use client';

export const ENROLL_RESULT_STORAGE_KEY = 'enrollResult';

export type EnrollResultStorage = {
  success: { courseId: number; courseTitle: string }[];
  failed: { courseId: number; courseTitle?: string; reason: string }[];
};

export const saveEnrollResult = (result: EnrollResultStorage) => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(
    ENROLL_RESULT_STORAGE_KEY,
    JSON.stringify(result)
  );
};

export const readEnrollResult = (): EnrollResultStorage | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(ENROLL_RESULT_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as EnrollResultStorage;
  } catch {
    return null;
  }
};

export const clearEnrollResult = () => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(ENROLL_RESULT_STORAGE_KEY);
};
