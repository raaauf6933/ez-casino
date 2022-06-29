import React, { useState } from "react";
import Table from "components/Table";
import { Card, Button } from "@mui/material";
import { ColumnType } from "types";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import { useNavigate } from "react-router-dom";
import { clubCreatePath, clubUrl } from "page/Club/url";

interface ListPageProps {
  columns: ColumnType[];
  data: any[];
  loading: boolean;
}

const ListPage: React.FC<ListPageProps> = props => {
  const { columns, data, loading } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Clubs"
        toolbar={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(clubCreatePath)}
          >
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
        <Table
          columns={columns}
          data={data}
          loading={loading}
          onRowClick={id => navigate(clubUrl(id))}
        />
      </Card>
    </>
  );
};

export default ListPage;
