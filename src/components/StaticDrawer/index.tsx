import { createMenuStructure } from "../AppHeader/menuStructure";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useUser } from "context/auth/context";
import NestedList from "./nestedList";

const drawerWidth = 240;

const SideMenu = (): JSX.Element => {
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
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          background: "#1B2430",
          boxSizing: "border-box",
          position: "unset",
          width: drawerWidth
        },
        // '& .MuiPaper-root': {
        //   top: 'auto'
        // },
        // flexShrink: 0,

        width: drawerWidth
      }}
      color="primary"
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

export default SideMenu;
