import React from 'react';
import { useTheme } from '~/context/Theme';

import { Container } from './styles';

function Logo({ outline, disabled, color }) {
  const { theme } = useTheme();

  return (
    <Container
      disabled={disabled}
      outline={outline ? 1 : 0}
      to={outline ? '/assistir' : '/'}
    >
      {outline ? (
        <svg
          width="35"
          height="36"
          viewBox="0 0 32 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5777 26.8446L29.1056 7.78885C30.4354 5.12925 28.5014 2 25.5279 2L6.47214 2C3.49861 2 1.56462 5.12925 2.89443 7.78885L12.4223 26.8446C13.8964 29.7928 18.1036 29.7928 19.5777 26.8446Z"
            stroke={color || (disabled ? theme.disabled : theme.primary)}
            strokeWidth="3"
          />
        </svg>
      ) : (
        <svg
          width="44"
          height="45"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5777 33.8446L37.1056 6.78885C38.4354 4.12925 36.5014 1 33.5279 1L6.47213 1C3.49861 1 1.56463 4.12926 2.89443 6.78886L16.4223 33.8446C17.8964 36.7928 22.1036 36.7928 23.5777 33.8446Z"
            fill={color || (disabled ? theme.disabled : theme.primary)}
            stroke={color || (disabled ? theme.disabled : theme.primary)}
            strokeWidth="2"
          />
        </svg>
      )}
    </Container>
  );
}

export default Logo;
