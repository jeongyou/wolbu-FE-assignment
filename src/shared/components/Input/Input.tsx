'use client';

import { ReactNode } from 'react';
import * as S from './Input.styles';

type InputProps = {
  label: string;
  error?: string;
  helperText?: string;
  children: ReactNode;
};

const Input = ({ label, error, helperText, children }: InputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      {children}
      {helperText && !error && <S.Helper>{helperText}</S.Helper>}
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
};

export default Input;
