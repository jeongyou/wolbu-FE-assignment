'use client';

import styled from '@emotion/styled';

type FlexProps = {
  direction?: 'row' | 'column';
  align?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  gap?: number;
};

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  gap: ${({ gap = 0 }) => `${gap}px`};
`;

export { Flex };
