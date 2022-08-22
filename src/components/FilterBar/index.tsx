import FilterTab from "components/FilterTab";
import FilterTabs from "components/FilterTabs";
import * as React from "react";

interface FilterBarProps {
  tabs: any[];
  currentTab: any;
  onTabChange: (num: number) => any;
  loading: boolean;
}

const FilterBar: React.FC<FilterBarProps> = props => {
  const { tabs, currentTab, onTabChange, loading } = props;

  return (
    <>
      <div style={{ width: "100%" }}>
        <FilterTabs currentTab={currentTab}>
          {tabs.map((tab, tabIndex) => {
            return (
              <FilterTab
                onClick={() => onTabChange(tabIndex)}
                label={tab.label}
                key={tabIndex}
                disabled={loading}
              />
            );
          })}
        </FilterTabs>
      </div>
    </>
  );
};

export default FilterBar;
