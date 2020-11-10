import React from 'react';
import Radio from '@material-ui/core/Radio';

import { FormControlLabel } from '@material-ui/core';
import { ContainerRadio, ContainerLabel } from './styles';

function CustomizedRadio(props) {
  return (
    <ContainerRadio>
      <Radio {...props} />
    </ContainerRadio>
  );
}

export default function RadioButton({ checked, ...rest }) {
  return (
    <ContainerLabel checked={checked}>
      <FormControlLabel control={<CustomizedRadio />} {...rest} />
    </ContainerLabel>
  );
}
