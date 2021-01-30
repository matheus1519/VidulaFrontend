import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { Container } from './styles';

function Loading({ ...rest }) {
  return (
    <Container>
      <CircularProgress size={19.5} {...rest} />
    </Container>
  );
}

export default Loading;
