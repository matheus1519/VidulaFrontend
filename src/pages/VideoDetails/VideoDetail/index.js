import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { MdBuild } from 'react-icons/md';

import { Container } from './styles';

function VideoDetail({ filled, ...rest }) {
  return (
    <Container filled={filled} {...rest}>
      {filled ? <BiCheckCircle size={64} /> : <MdBuild size={64} />}
    </Container>
  );
}

export default VideoDetail;
