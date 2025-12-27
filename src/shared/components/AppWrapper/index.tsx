'use client';

import { ReactNode } from 'react';
import { MobileWrapper } from './AppWrapper.styles';

type AppWrapperProps = {
  children: ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  return <MobileWrapper>{children}</MobileWrapper>;
};

export default AppWrapper;
