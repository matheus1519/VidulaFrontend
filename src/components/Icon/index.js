import React from 'react';

import { Container } from './styles';

function IconComponent({ icon: Icon, size, disabled, onClick, ...rest }) {
  return (
    <Container
      disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      {...rest}
    >
      <Icon size={size || 20} />
    </Container>
  );
}

export default IconComponent;
