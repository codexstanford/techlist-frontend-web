import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export function CodeXFormHeader({
  text,
  variant = 'h5',
  color = 'primary',
  weight = '700',
}) {
  return (
    <Typography
      variant={variant}
      color={color}
      style={{
        fontWeight: { weight },
        letterSpacing: '-.5px',
        textDecoration: 'none',
        marginBottom: '2rem',
      }}
    >
      {text}
    </Typography>
  );
}
