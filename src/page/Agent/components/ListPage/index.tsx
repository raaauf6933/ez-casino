import React, { useState } from "react";
import Table from "components/Table";
import { Card, Button } from "@mui/material";
import { ColumnType, UserTypeEnum } from "types";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import { useNavigate } from "react-router-dom";
import { agentCreatePath } from "page/Agent/url";
import RequirePermission from "components/RequirePermission";

interface ListPageProps {
  columns: ColumnType[];
  data: any[];
  onRowClick: (id: string) => void;
}

const ListPage: React.FC<ListPageProps> = props => {
  const { columns, data, onRowClick } = props;
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
        <SearchBar
          label="Search Agent"
          value={searchValue}
          setValue={setSearchValue}
        />
        <Table
          columns={columns}
          data={data}
          loading={false}
          onRowClick={onRowClick}
        />
      </Card>
    </>
  );
};

export default ListPage;
