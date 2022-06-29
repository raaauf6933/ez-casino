import ListPage from "page/Club/components/ListPage";
import * as React from "react";
import { columns } from "./../../utils";
import StatusLabel from "components/StatusLabel";
// import { StatusType } from "types";
import useFetch from "hooks/useFetch";
import { GET_CLUBS } from "page/Club/api";
import { Club } from "page/Club/types";

interface ClubListProps {
  data?: any;
}

const ClubList: React.FC<ClubListProps> = () => {
  const { response, loading } = useFetch({
    method: "GET",
    url: GET_CLUBS
  });

  const data =
    response?.data &&
    response?.data.map((club: Club) => ({
      club_name: club.club_name,
      contact_person: club.contact_person,
      id: club.id,
      key: club.id,
      status: <StatusLabel status={club.status} />
    }));

  return (
    <>
      <ListPage columns={columns} data={data} loading={loading} />
    </>
  );
};

export default ClubList;
