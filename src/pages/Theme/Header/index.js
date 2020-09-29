import React, { useCallback, useState } from 'react';
import Switch from 'react-switch';

import { useTheme } from '~/context/Theme';

import { Container } from './styles';

export default function Header() {
  const { changeTheme, theme } = useTheme();
  const { colors } = theme;

  const [checked, setChecked] = useState(!!(theme.title === 'light'));

  const handleTheme = useCallback(() => {
    setChecked(!checked);
    changeTheme();
  }, [checked, changeTheme, setChecked]);

  return (
    <Container>
      Hello Matheus
      <Switch
        onChange={handleTheme}
        checked={checked}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={colors.disabled}
        onColor={colors.primary}
        // onHandleColor={colors.texts.primary}
        // offHandleColor={colors.texts.primary}
      />
    </Container>
  );
}
