import React from 'react';

import { Container } from './styles';

function Button({ flex, type, color, children, ...rest }) {
  return (
    <Container flex={flex} type={type} color={color} {...rest}>
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
