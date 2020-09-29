import React from 'react';

import { Container } from './styles';

function Button({ children, type, color, ...rest }) {
  const types = {
    primary: 'primary',
    secondary: 'secondary',
  };

  return <Container {...rest}>{children}</Container>;
}

Button.defaultProps = {
  type: 'primary',
};

export default Button;
