import React, { useState } from "react";
import Table from "components/Table";
import { Card, Button } from "@mui/material";
import { ColumnType, UserTypeEnum } from "types";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import RequirePermission from "components/RequirePermission";

interface ListPageProps {
  columns: ColumnType[];
  data: any[];
  onUploadPayout: () => void;
  onRowClick: (id: string) => void;
}

const ListPage: React.FC<ListPageProps> = props => {
  const { columns, data, onUploadPayout, onRowClick } = props;
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <PageHeader
        title="Payouts"
        toolbar={
          <>
            <RequirePermission userTypes={[UserTypeEnum.CLUB_ADMIN]}>
              <Button
                variant="contained"
                color="primary"
                onClick={onUploadPayout}
              >
                Generate Payout
              </Button>
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
