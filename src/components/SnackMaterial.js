import React, { useState, Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SnackMaterial({ open }) {
  const [abra, setAbra] = useState(open);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAbra(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={abra}
        // autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={
          <Fragment>
            <IconButton
              size="medium"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </div>
  );
}
