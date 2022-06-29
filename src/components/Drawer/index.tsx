import { SwipeableDrawer } from "@mui/material";
import * as React from "react";

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = props => {
  const { children, open, onClose } = props;

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
        >
          {children}
        </SwipeableDrawer>
      </div>
    </>
  );
};

export default Drawer;
