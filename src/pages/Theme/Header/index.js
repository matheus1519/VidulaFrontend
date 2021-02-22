import React, { useCallback, useState } from 'react';
import Switch from 'react-switch';

import { useTheme } from '~/hooks/Theme';

import { Container } from './styles';

export default function Header() {
  const { changeTheme, theme, themeTitle } = useTheme();

  const [checked, setChecked] = useState(!!(themeTitle === 'light'));

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
        offColor={theme.disabled}
        onColor={theme.primary}
        // onHandleColor={theme.texts.primary}
        // offHandleColor={theme.texts.primary}
      />
    </Container>
  );
}
