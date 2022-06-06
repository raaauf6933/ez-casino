import ListPage from "page/Club/components/ListPage";
import * as React from "react";
import { columns } from "./../../utils";

interface ClubListProps {
  data?: any;
}

const ClubList: React.FC<ClubListProps> = () => {
  const data = [
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    },
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    },
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    },
    {
      club_name: "X_POKER",
      contact_person: "Jonas Kevin Esquillo",
      id: "1",
      status: "Active"
    }
  ];

  return (
    <>
      <ListPage columns={columns} data={data} />
    </>
  );
};

export default ClubList;
