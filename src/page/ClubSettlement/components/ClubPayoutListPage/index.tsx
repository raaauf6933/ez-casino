// import { Button } from "@mui/material";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import { club_batch_payout_columns } from "../../utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/Card";
import Table from "components/Table";
// import FilterBar from "components/FilterBar";
import { Button, Typography } from "@mui/material";
import { clubPayoutUrl } from "page/ClubSettlement/url";
// import { Box } from "@mui/material";

interface ClubPayoutListPageProps {
  data?: any;
  loading: boolean;
  onUploadFile: () => void;
  // onTabChange: (data: number) => void;
  // currentTab: number;
  // tabs: any[];
}

const ClubPayoutListPage: React.FC<ClubPayoutListPageProps> = props => {
  const {
    data,
    loading,
    onUploadFile
    // onTabChange, currentTab, tabs
  } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <PageHeader
        title="Club Payout"
        toolbar={
          <>
            <Button variant="contained" onClick={() => onUploadFile()}>
              <Typography whiteSpace="nowrap">Upload Payout</Typography>{" "}
            </Button>
          </>
        }
      />
      <Card>
        {/* <Box
          display="inline-flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          overflow="auto"
        > */}
        {/* <FilterBar
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={onTabChange}
          loading={loading}
        /> */}

        {/* </Box> */}

        <SearchBar
          label="Search Club"
          value={searchValue}
          setValue={setSearchValue}
        />
        <Table
          columns={club_batch_payout_columns}
          data={data}
          loading={loading}
          onRowClick={id => navigate(clubPayoutUrl(id))}
        />
      </Card>
    </>
  );
};

export default ClubPayoutListPage;
