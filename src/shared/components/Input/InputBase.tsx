'use client';

import { ComponentProps } from 'react';
import * as S from './InputBase.styles';

type InputBaseProps = ComponentProps<'input'>;

const InputBase = (props: InputBaseProps) => {
  return <S.InputBase {...props} />;
};

export default InputBase;
