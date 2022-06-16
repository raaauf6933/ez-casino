import ListPage from "page/Club/components/ListPage";
import * as React from "react";
import { columns } from "./../../utils";
import StatusLabel from "components/StatusLabel";
import { StatusType } from "types";

interface ClubListProps {
  data?: any;
}

const ClubList: React.FC<ClubListProps> = () => {
  const data = [
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: <StatusLabel status={StatusType.ACTIVE} />
    },
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: <StatusLabel status={StatusType.INACTIVE} />
    },
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: <StatusLabel status={StatusType.ACTIVE} />
    },
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: <StatusLabel status={StatusType.ACTIVE} />
    }
  ];

  return (
    <>
      <ListPage columns={columns} data={data} />
    </>
  );
};

export default ClubList;
