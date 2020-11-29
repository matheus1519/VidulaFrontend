import React from 'react';

import { Container } from './styles';

function IconComponent({ icon: Icon, size, disabled }) {
  return (
    <Container disabled={disabled}>
      <Icon size={size || 20} />
    </Container>
  );
}

export default IconComponent;
