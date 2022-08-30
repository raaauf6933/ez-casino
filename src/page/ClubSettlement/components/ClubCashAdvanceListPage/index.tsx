import { Box } from "@mui/material";
import Card from "components/Card";
import PageHeader from "components/PageHeader";
import SearchBar from "components/SearchBar";
import Table from "components/Table";
import { useBulkActionsTypes } from "hooks/useBulkActions";
import { club_cash_advance_column } from "page/ClubSettlement/utils";
import React from "react";

interface ClubCashAdvanceListPageProps extends useBulkActionsTypes {
  setSearchValue: (data: string) => void;
  searchValue: string;
  data: any;
}

const ClubCashAdvanceListPage: React.FC<
  ClubCashAdvanceListPageProps
> = props => {
  const {
    searchValue,
    setSearchValue,
    data
    // listElements,
    // toggleAll
  } = props;
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
          data={data}
          // toggleAll={toggleAll}
          // selected={listElements}
          loading={false}
          // toolbar={
          //   <>
          //     <Button
          //       variant="outlined"
          //       color="primary"
          //       sx={{ marginRight: "1em" }}
          //     >
          //       <Typography fontWeight={600}>Completed</Typography>
          //     </Button>
          //     <Button variant="outlined" color="error">
          //       <Typography fontWeight={600}>Cancel</Typography>
          //     </Button>
          //   </>
          // }
          // onRowClick={id => navigate(clubUrl(id))}
        />
      </Card>
    </>
  );
};

export default ClubCashAdvanceListPage;
