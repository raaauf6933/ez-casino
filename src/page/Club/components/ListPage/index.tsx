import React, { useState } from "react";
import Table from "components/Table";
import { Card, Button } from "@mui/material";
import { ColumnType } from "types";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";

interface ListPageProps {
  columns: ColumnType[];
  data: any[];
}

const ListPage: React.FC<ListPageProps> = props => {
  const { columns, data } = props;
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <PageHeader
        title="Clubs"
        toolbar={
          <Button variant="contained" color="primary">
            Create Club
          </Button>
        }
      />
      <Card>
        <SearchBar
          label="Search Club"
          value={searchValue}
          setValue={setSearchValue}
        />
        <Table columns={columns} data={data} loading={false} />
      </Card>
    </>
  );
};

export default ListPage;
