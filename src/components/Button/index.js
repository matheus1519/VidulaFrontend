import React from 'react';
import Loading from '../Loading';

import { Container } from './styles';

function Button({
  disabled,
  loading,
  flex,
  type,
  small,
  color,
  children,
  ...rest
}) {
  return (
    <Container
      disabled={loading}
      flex={flex}
      type={type}
      color={color}
      small={small}
      {...rest}
    >
      {loading ? <Loading /> : children}
    </Container>
  );
}

Button.defaultProps = {
  type: 'primary',
  color: 'primary',
  flex: false,
};

export default Button;
