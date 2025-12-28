'use client';

import * as S from './Toast.styles';

type ToastProps = {
  message: string;
  open: boolean;
};

const Toast = ({ message, open }: ToastProps) => {
  if (!open) return null;

  return (
    <S.Container>
      <S.Message>{message}</S.Message>
    </S.Container>
  );
};

export default Toast;
