import { Box } from "@mui/material";
import Card from "components/Card";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import Table from "components/Table";
import { club_cashadvance_data } from "page/ClubSettlement/data";
import { club_cash_advance_column } from "page/ClubSettlement/utils";
import React from "react";

interface ClubCashAdvanceListPageProps {
  setSearchValue: (data: string) => void;
  searchValue: string;
}

const ClubCashAdvanceListPage: React.FC<
  ClubCashAdvanceListPageProps
> = props => {
  const { searchValue, setSearchValue } = props;
  return (
    <>
      <PageHeader
        title="Club Cash Advance"
        // toolbar={
        //   <Button variant="contained" color="primary">
        //     Create Club
        //   </Button>
        // }
      />
      <Card>
        <Box
          display="inline-flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          overflow="auto"
        ></Box>

        <SearchBar
          label="Search Club"
          value={searchValue}
          setValue={setSearchValue}
        />
        <Table
          columns={club_cash_advance_column}
          data={club_cashadvance_data}
          loading={false}
          // onRowClick={id => navigate(clubUrl(id))}
        />
      </Card>
    </>
  );
};

export default ClubCashAdvanceListPage;
