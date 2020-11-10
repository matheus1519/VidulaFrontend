import React from 'react';

import { Container } from './styles';

function TextArea({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

export default TextArea;
