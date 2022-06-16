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

const drawerWidth = 240;

const SideMenu = (): JSX.Element => {
  const menuList = createMenuStructure();

  const activeStyle = {
    color: "#14A873",
    fontSize: "1.2em",
    textDecoration: "none"
  };

  const defaultStyle = {
    color: "black",
    fontSize: "1.2em",
    textDecoration: "none"
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
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
    >
      <List
        sx={{
          "& .MuiListItem-root": {
            display: "block"
          }
        }}
      >
        {menuList.map(list => (
          <ListItem key={list.key} disablePadding>
            <NavLink
              to={list.url}
              style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
            >
              <ListItemButton>
                <ListItemIcon>{list.icon}</ListItemIcon>
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
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
