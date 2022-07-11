import { Tab } from "@mui/material";
import * as React from "react";
import classNames from "classnames";
import useStyles from "./styles";

interface FilterTabProps {
  onClick: () => void;
  label: string;
  selected?: boolean;
  value?: any;
  disabled: boolean;
}

const FilterTab: React.FC<FilterTabProps> = props => {
  const { onClick, label, selected, value, disabled } = props;
  const classes = useStyles(props);

  return (
    <Tab
      disableRipple
      label={label}
      classes={{
        root: classes.tabRoot,
        wrapped: classNames(classes.tabLabel, {
          [classes.selectedTabLabel]: selected
        })
      }}
      sx={{
        fontWeight: 600
      }}
      disabled={disabled}
      onClick={onClick}
      value={value}
    />
  );
};

export default FilterTab;
