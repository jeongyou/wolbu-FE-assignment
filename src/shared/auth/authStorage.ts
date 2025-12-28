'use client';

const KEY = 'accessToken';

const canUseStorage = () => typeof window !== 'undefined';

export const saveAccessToken = (token: string) => {
  if (!canUseStorage()) return;
  localStorage.setItem(KEY, token);
};

export const getAccessToken = () => {
  if (!canUseStorage()) return null;
  return localStorage.getItem(KEY);
};

export const clearAccessToken = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(KEY);
};
