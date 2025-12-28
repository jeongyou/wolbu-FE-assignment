'use client';

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

type StoredUser = {
  name: string;
  role: 'STUDENT' | 'INSTRUCTOR';
};

const canUseStorage = () => typeof window !== 'undefined';

export const saveAccessToken = (token: string) => {
  if (!canUseStorage()) return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = () => {
  if (!canUseStorage()) return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAccessToken = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(TOKEN_KEY);
};

export const saveAuthUser = (user: StoredUser) => {
  if (!canUseStorage()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAuthUser = (): StoredUser | null => {
  if (!canUseStorage()) return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};

export const clearAuthUser = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(USER_KEY);
};
