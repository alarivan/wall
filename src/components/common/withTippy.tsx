import React from 'react';
import Tippy, { TippyProps } from '@tippy.js/react';

export type TippyPropsLite = Omit<TippyProps, 'content' | 'children'>;

const withTippy = (
  Component: React.ComponentType,
  content: string,
  options?: TippyPropsLite,
) => ({ ...props }: any) => (
  <Tippy content={content} {...options}>
    <Component {...props} />
  </Tippy>
);

export default withTippy;
