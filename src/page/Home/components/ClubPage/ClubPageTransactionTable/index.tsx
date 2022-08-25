import Table from "components/Table";
import React from "react";
import ClubTransactionTableColumn from "./column";

interface ClubPageTransactionTableProps {
  data?: [];
  transactions: any;
}

const ClubPageTransactionTable: React.FC<
  ClubPageTransactionTableProps
> = props => {
  const { transactions } = props;
  return (
    <>
      <Table
        columns={ClubTransactionTableColumn}
        loading={false}
        data={transactions}
      />
    </>
  );
};

export default ClubPageTransactionTable;
