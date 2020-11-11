import React from 'react';

import { Container } from './styles';

function Avatar({ url, size }) {
  return <Container src={url} size={size} />;
}

export default Avatar;
