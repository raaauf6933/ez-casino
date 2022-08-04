import { Button } from "@mui/material";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import { columns } from "./../../utils";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Card from "components/Card";
import Table from "components/Table";

interface ClubPayoutListPageProps {
  data?: any;
  loading: boolean;
}

const ClubPayoutListPage: React.FC<ClubPayoutListPageProps> = props => {
  const { data, loading } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  // const navigate = useNavigate();

  return (
    <>
      {" "}
      <PageHeader
        title="Club Payout"
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
        <Table
          columns={columns}
          data={data}
          loading={loading}
          // onRowClick={id => navigate(clubUrl(id))}
        />
      </Card>
    </>
  );
};

export default ClubPayoutListPage;
