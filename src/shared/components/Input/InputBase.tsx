'use client';

import { ComponentProps, forwardRef } from 'react';
import * as S from './InputBase.styles';

type InputBaseProps = ComponentProps<'input'>;

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>((props, ref) => {
  return <S.InputBase {...props} ref={ref} />;
});

InputBase.displayName = 'InputBase';

export default InputBase;
