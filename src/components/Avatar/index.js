import React from 'react';
import { Avatar } from '@material-ui/core';

import { Container } from './styles';

function AvatarCustom({ url, size, alt, children }) {
  return (
    <Container size={size}>
      <Avatar alt={alt} src={url}>
        {children}
      </Avatar>
    </Container>
  );
}

export default AvatarCustom;
