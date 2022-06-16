import ListPage from "page/Payout/components/ListPage";
import { columns } from "./../../utils";
import React from "react";

interface PayoutListProps {
  data?: any;
}

const PayoutList: React.FC<PayoutListProps> = () => {
  const data = [
    {
      date_created: "June 24, 2022",
      generated_by: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    },
    {
      date_created: "June 24, 2022",
      generated_by: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    },
    {
      date_created: "June 24, 2022",
      generated_by: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    },
    {
      date_created: "June 24, 2022",
      generated_by: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    }
  ];

  return <ListPage columns={columns} data={data} />;
};

export default PayoutList;
