import React, { useState } from "react";
import Table from "components/Table";
import { Card, Button } from "@mui/material";
import { ColumnType } from "types";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import { useNavigate } from "react-router-dom";
import { userCreatePath, userUrl } from "page/Users/url";

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
        title="Users"
        toolbar={
          <Button
            onClick={() => navigate(userCreatePath)}
            variant="contained"
            color="primary"
          >
            Create User
          </Button>
        }
      />
      <Card>
        <SearchBar
          label="Search User"
          value={searchValue}
          setValue={setSearchValue}
        />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          onRowClick={id => navigate(userUrl(id.toString()))}
        />
      </Card>
    </>
  );
};

export default ListPage;
