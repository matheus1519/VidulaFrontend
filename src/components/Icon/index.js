import React from 'react';
import { useTheme } from '~/context/Theme';

import { Container } from './styles';

function IconComponent({ icon: Icon, size, disabled }) {
  const { theme } = useTheme();

  return (
    <Container disabled={disabled}>
      <Icon size={size || 20} />
    </Container>
  );
}

export default IconComponent;
