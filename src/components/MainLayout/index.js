import React from 'react';

import { Menu } from '~/components';
import { Container, Content } from './styles';

function MainLayout({ children }) {
  return (
    <Container>
      <Menu />
      <Content>{children}</Content>
    </Container>
  );
}

export default MainLayout;
