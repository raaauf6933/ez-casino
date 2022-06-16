import * as React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Popper as PopperMui, Typography } from "@mui/material";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

interface ToolBar {
  label: string;
  onClick: () => void;
}

interface PopperProps {
  toolbar: ToolBar[];
}

const Popper: React.FC<PopperProps> = props => {
  const { toolbar } = props;
  const [openPopper, setOpenPopper] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpenPopper(previousOpen => !previousOpen);
  };

  const canBeOpen = openPopper && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <div
      style={{
        cursor: "pointer"
      }}
    >
      <ArrowDropDownIcon
        aria-describedby={id}
        onClick={handleClick}
        fontSize="large"
      />
      <PopperMui
        id={id}
        open={openPopper}
        placement="bottom-start"
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {toolbar.map((e, i) => (
                <>
                  <Typography
                    key={e.label + i}
                    style={{ cursor: "pointer" }}
                    onClick={e.onClick}
                    sx={{ p: 2 }}
                  >
                    {e.label}
                  </Typography>
                </>
              ))}
            </Paper>
          </Fade>
        )}
      </PopperMui>
    </div>
  );
};

export default Popper;
