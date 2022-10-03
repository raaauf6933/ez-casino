import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { createMenuStructure } from "components/AppHeader/menuStructure";
import { useUser } from "context/auth/context";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { NavLink } from "react-router-dom";
import NestedList from "components/StaticDrawer/nestedList";

interface DrawerProps {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const MobileDrawer: React.FC<DrawerProps> = props => {
  const { open, setOpen } = props;
  const menuStructure = createMenuStructure();
  const user = useUser();

  const menuList = menuStructure.filter(
    e =>
      e.permissionUserType.includes(user?.usertype) ||
      e.permissionUserType.length === 0
  );

  const activeStyle = {
    color: "#FFD700",
    fontSize: "1.2em",
    textDecoration: "none"
  };

  const defaultStyle = {
    color: "white",
    fontSize: "1.2em",
    textDecoration: "none"
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      //   sx={{
      //     "& .MuiDrawer-paper": {
      //       width: "auto"
      //     }
      //   }}
      color="primary"
      sx={{
        "& .MuiDrawer-paper": {
          background: "#1B2430"
        }
      }}
    >
      <List
        sx={{
          "& .MuiListItem-root": {
            display: "block"
          }
        }}
      >
        {menuList.map(list => {
          if (list.children) {
            return (
              <>
                <NestedList list={list} />
              </>
            );
          } else {
            return (
              <ListItem key={list.key} disablePadding>
                <NavLink
                  to={list.url}
                  style={({ isActive }) =>
                    isActive ? activeStyle : defaultStyle
                  }
                >
                  <ListItemButton>
                    <ListItemIcon
                      style={{
                        color: "white"
                      }}
                    >
                      {list.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={list.label}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "1em"
                        }
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            );
          }
        })}
      </List>
    </Drawer>
  );
};

export default MobileDrawer;
