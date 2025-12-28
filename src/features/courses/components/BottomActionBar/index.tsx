'use client';

import * as S from './BottomActionBar.styles';

type BottomActionBarProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

const BottomActionBar = ({
  label,
  disabled = false,
  onClick,
}: BottomActionBarProps) => {
  return (
    <S.Container>
      <S.Button type='button' disabled={disabled} onClick={onClick}>
        {label}
      </S.Button>
    </S.Container>
  );
};

export default BottomActionBar;
