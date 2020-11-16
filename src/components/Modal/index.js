import React, { useEffect, useState } from 'react';

import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Container, Header } from './styles';
import { useTheme } from '~/context/Theme';

function Modal({ title, width, children, onClose }) {
  const body = document.querySelector('body');
  body.style.overflow = 'hidden';

  useEffect(() => {
    return () => {
      body.style.overflow = 'auto';
    };
  }, []);

  const { theme } = useTheme();

  const [onMouseOver, setOnMouseOver] = useState(false);

  return (
    <Container width={width}>
      <div>
        <Header>
          <h2>{title}</h2>
          <div
            onMouseEnter={() => setOnMouseOver(true)}
            onMouseLeave={() => setOnMouseOver(false)}
          >
            {onMouseOver ? (
              <AiFillCloseCircle
                onClick={() => onClose(false)}
                color={theme.danger}
                size={44}
              />
            ) : (
              <AiOutlineCloseCircle
                onClick={() => onClose(true)}
                color={theme.danger}
                size={44}
              />
            )}
          </div>
        </Header>
        {children}
      </div>
    </Container>
  );
}

export default Modal;
