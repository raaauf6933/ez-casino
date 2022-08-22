import Table from "components/Table";
import React from "react";
import ClubTransactionTableColumn from "./column";
import { my_transaction_data } from "./data";

interface ClubPageTransactionTableProps {
  data?: [];
}

const ClubPageTransactionTable: React.FC<
  ClubPageTransactionTableProps
> = () => {
  return (
    <>
      <Table
        columns={ClubTransactionTableColumn}
        loading={false}
        data={my_transaction_data}
      />
    </>
  );
};

export default ClubPageTransactionTable;
