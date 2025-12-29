'use client';

import { ComponentProps } from 'react';
import * as S from './BottomActionBar.styles';

type BottomActionBarProps = {
  children: string;
  loading?: boolean;
  disabled?: boolean;
} & ComponentProps<'button'>;

const BottomActionBar = ({
  children,
  loading = false,
  disabled,
  type = 'submit',
  ...props
}: BottomActionBarProps) => {
  return (
    <S.Container>
      <S.Button type={type} disabled={disabled || loading} {...props}>
        {loading ? '처리 중...' : children}
      </S.Button>
    </S.Container>
  );
};

export default BottomActionBar;
