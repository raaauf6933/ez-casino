import Card from "components/Card";
import SearchBar from "components/SearchBar";
// import Table from "components/Table";
import TableAccordion from "components/TableAccordion";
import * as React from "react";
import PayoutBatchDetailsColumn from "./columns";

interface PayoutBatchDetailsProps {
  data: any[];
  setSearchValue: (data: string) => void;
  searchValue: string;
}

const PayoutBatchDetails: React.FC<PayoutBatchDetailsProps> = props => {
  const { data, searchValue, setSearchValue } = props;

  return (
    <Card title="Batch  Details">
      <SearchBar
        label="Search Game ID"
        value={searchValue}
        setValue={setSearchValue}
      />
      <TableAccordion
        columns={PayoutBatchDetailsColumn}
        data={data}
        loading={false}
        subTableColumns={PayoutBatchDetailsColumn}
        resetCurrentPage={searchValue}
      />
      {/* <Table
        columns={PayoutBatchDetailsColumn}
        data={data}
        loading={false}
        defaultPageSize={100}
      /> */}
    </Card>
  );
};

export default PayoutBatchDetails;
