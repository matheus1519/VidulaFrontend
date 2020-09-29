import React from 'react';

import { Container } from './styles';

function ButtonLink({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

export default ButtonLink;
