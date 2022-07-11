import { Tabs } from "@mui/material";
import useStyle from "./style";
import * as React from "react";

interface FilterTabsProps {
  currentTab: any;
  children: React.ReactNode;
}

const FilterTabs: React.FC<FilterTabsProps> = props => {
  const { currentTab, children } = props;
  const classes = useStyle({});

  return (
    <Tabs
      className={classes.tabsRoot}
      value={currentTab}
      indicatorColor={"primary"}
      scrollButtons="auto"
      variant="scrollable"
    >
      {children}
    </Tabs>
  );
};

export default FilterTabs;
