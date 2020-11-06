import React from 'react';

import { Container } from './styles';

function ButtonLink({ mt, children, disabled, ...rest }) {
  return (
    <Container disabled={disabled} mt={mt} {...rest}>
      {children}
    </Container>
  );
}

ButtonLink.defaultProps = {
  mt: 0,
};

export default ButtonLink;
