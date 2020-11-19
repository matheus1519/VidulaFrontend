import React from 'react';
import Radio from '@material-ui/core/Radio';

import { FormControlLabel } from '@material-ui/core';
import { ContainerRadio, ContainerLabel } from './styles';

function CustomizedRadio({ ...rest }) {
  return (
    <ContainerRadio>
      <Radio {...rest} />
    </ContainerRadio>
  );
}

export default function RadioButton({ checked, label, ...rest }) {
  return (
    <ContainerLabel label={label} checked={checked}>
      <FormControlLabel control={<CustomizedRadio />} label={label} {...rest} />
    </ContainerLabel>
  );
}
