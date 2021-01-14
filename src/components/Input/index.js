import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

function Input({ icon: Icon, name, fit, onBlur, ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (onBlur) onBlur();
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, [onBlur]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      onClick={() => inputRef.current.focus()}
      fit={fit}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && (
        <Error error title={error}>
          <FiAlertCircle size={20} />
        </Error>
      )}
    </Container>
  );
}

export default Input;
