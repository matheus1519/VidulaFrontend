import React from 'react';

import { Container } from './styles';

function Button({ flex, type, small, color, children, ...rest }) {
  return (
    <Container flex={flex} type={type} color={color} small={small} {...rest}>
      {children}
    </Container>
  );
}

Button.defaultProps = {
  type: 'primary',
  color: 'primary',
  flex: false,
};

export default Button;
