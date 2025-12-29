'use client';

import { ComponentProps } from 'react';
import * as S from './ConfirmButton.styles';

type ConfirmButtonProps = {
  children: string;
  loading?: boolean;
} & ComponentProps<'button'>;

const ConfirmButton = ({
  children,
  loading = false,
  disabled,
  ...props
}: ConfirmButtonProps) => {
  return (
    <S.Container>
      <S.Button type='submit' disabled={disabled || loading} {...props}>
        {loading ? '처리 중...' : children}
      </S.Button>
    </S.Container>
  );
};

export default ConfirmButton;
