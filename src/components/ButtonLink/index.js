import React from 'react';

import { Container, ContainerLink } from './styles';

function ButtonLink({ children, disabled, to, icon: Icon, mt, ...rest }) {
  return to ? (
    <ContainerLink disabled={disabled} to={to} mt={mt} {...rest}>
      {children}
      {/* <Icon size={20} /> */}
    </ContainerLink>
  ) : (
    <Container disabled={disabled} mt={mt} {...rest}>
      {children}
      {Icon && <Icon size={20} />}
    </Container>
  );
}

ButtonLink.defaultProps = {
  mt: 0,
};

export default ButtonLink;
