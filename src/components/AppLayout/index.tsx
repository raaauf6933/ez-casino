import * as React from 'react';
import AppHeader from '../AppHeader';
import { Box } from '@mui/material';
import SideMenu from '../StaticDrawer';



const AppLayout = (props: { children: React.ReactNode; }):JSX.Element => {
  const {children} = props;
  
  return (
    <>
      <Box>
        <AppHeader />
        <SideMenu />
        <Box component="main" sx={{ padding: '1.5em 2em 0em 16em' }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
