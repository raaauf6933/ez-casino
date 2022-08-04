import Card from "components/Card";
import Table from "components/Table";
import * as React from "react";
import PayoutBatchDetailsColumn from "./columns";

interface PayoutBatchDetailsProps {
  data: any[];
}

const PayoutBatchDetails: React.FC<PayoutBatchDetailsProps> = props => {
  const { data } = props;
  return (
    <Card title="Batch  Details">
      <Table
        columns={PayoutBatchDetailsColumn}
        data={data}
        loading={false}
        defaultPageSize={100}
      />
    </Card>
  );
};

export default PayoutBatchDetails;
