import React from 'react';
import { Box } from '@mui/material';

const Container = (props: { children: React.ReactNode }): JSX.Element => {
  return <Box>{props.children}</Box>;
};

export default Container;
