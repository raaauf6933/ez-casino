import React, { useState } from "react";
import Table from "components/Table";
import { Card } from "@mui/material";
import { ColumnType, UserTypeEnum } from "types";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import RequirePermission from "components/RequirePermission";
import ButtonGroup from "components/ButtonGroup";

interface ListPageProps {
  columns: ColumnType[];
  data: any[];
  onUploadPayout: () => void;
  onRowClick: (id: string) => void;
  onExportAgentTemplate: () => void;
}

const ListPage: React.FC<ListPageProps> = props => {
  const { columns, data, onUploadPayout, onRowClick, onExportAgentTemplate } =
    props;
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <PageHeader
        title="Payouts"
        toolbar={
          <>
            <RequirePermission userTypes={[UserTypeEnum.CLUB_ADMIN]}>
              <ButtonGroup
                buttons={{
                  buttons: [
                    {
                      label: "Export Agent Payout Template",
                      onClick: onExportAgentTemplate
                    }
                  ],
                  mainButton: {
                    label: "Generate Payout",
                    onClick: onUploadPayout
                  }
                }}
              />
            </RequirePermission>
          </>
        }
      />
      <Card>
        <SearchBar
          label="Search Batch"
          value={searchValue}
          setValue={setSearchValue}
        />
        <Table
          columns={columns}
          data={data}
          loading={false}
          onRowClick={id => onRowClick(id.toString())}
        />
      </Card>
    </>
  );
};

export default ListPage;
