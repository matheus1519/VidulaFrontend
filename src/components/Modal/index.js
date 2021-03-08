import React, { useEffect, useRef, useState } from 'react';
import useKeypress from 'react-use-keypress';

import { AiFillCloseCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Container, Header } from './styles';
import { useTheme } from '~/hooks/Theme';

function Modal({ title, width, children, onClose }) {
  const body = document.querySelector('body');

  useEffect(() => {
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = 'auto';
    };
  }, [body.style.overflow]);

  const { theme } = useTheme();

  const [onMouseOver, setOnMouseOver] = useState(false);

  return (
    <Container width={width}>
      <div>
        <Header>
          <h2>{title}</h2>
          {onClose && (
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
          )}
        </Header>
        {children}
      </div>
    </Container>
  );
}

export default Modal;
