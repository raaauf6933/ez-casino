import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List
} from "@mui/material";
import { MenuStructure } from "components/AppHeader/menuStructure";
import * as React from "react";
import { NavLink } from "react-router-dom";

interface NestedListProps {
  list: MenuStructure;
}

const NestedList: React.FC<NestedListProps> = props => {
  const { list } = props;

  const [openMenu, setOpenMenu] = React.useState(false);

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
    <>
      <ListItemButton onClick={() => setOpenMenu(prevState => !prevState)}>
        <ListItemIcon sx={{ color: "white" }}>{list.icon}</ListItemIcon>
        <ListItemText
          primary={list.label}
          sx={{
            "& .MuiTypography-root": {
              color: "white",
              fontSize: "1.2em"
            }
          }}
        />
        {openMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {list.children?.map(subList => (
            <>
              <NavLink
                to={subList.url}
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {subList.icon}
                  </ListItemIcon>
                  <ListItemText primary={subList.label} />
                </ListItemButton>
              </NavLink>
            </>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NestedList;
