import { SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import * as React from "react";

interface DrawerProps extends Omit<SwipeableDrawerProps, "onOpen"> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onOpen?: any;
}

const Drawer: React.FC<DrawerProps> = props => {
  const { children, open, onClose, ...rest } = props;

  const getState = () => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
  };
  return (
    <>
      <div>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={onClose}
          onOpen={getState()}
          {...rest}
        >
          {children}
        </SwipeableDrawer>
      </div>
    </>
  );
};

export default Drawer;
