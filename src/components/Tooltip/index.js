import React from 'react';

import { Container } from './styles';

function Tooltip({ title, error, className, children }) {
  return (
    <Container error={error} className={className}>
      <small>{title}</small>
      {children}
    </Container>
  );
}

export default Tooltip;
