import React, { useState } from "react";
import Table from "components/Table";
import { Card, Button } from "@mui/material";
import { ColumnType, UserTypeEnum } from "types";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import { useNavigate } from "react-router-dom";
import { agentCreatePath } from "page/Agent/url";
import RequirePermission from "components/RequirePermission";
import FilterBar from "components/FilterBar";

interface ListPageProps {
  columns: ColumnType[];
  data: any[];
  onRowClick: (id: string) => void;
  onTabChange: (data: number) => void;
  currentTab: number;
  tabs: any[];
  loading: boolean;
}

const ListPage: React.FC<ListPageProps> = props => {
  const { columns, data, onRowClick, onTabChange, currentTab, tabs, loading } =
    props;
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Agents"
        toolbar={
          <>
            <RequirePermission
              userTypes={[UserTypeEnum.AGENT, UserTypeEnum.CLUB_ADMIN]}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(agentCreatePath)}
              >
                Create Agent
              </Button>
            </RequirePermission>
          </>
        }
      />
      <Card>
        <FilterBar
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={onTabChange}
          loading={loading}
        />
        <SearchBar
          label="Search Agent"
          value={searchValue}
          setValue={setSearchValue}
        />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          onRowClick={onRowClick}
        />
      </Card>
    </>
  );
};

export default ListPage;
