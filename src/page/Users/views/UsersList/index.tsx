import ListPage from "page/Users/components/ListPage";
import { columns } from "./../../utils";
import React from "react";
import useFetch from "hooks/useFetch";
import { getAllUsers } from "../../api";
import { User } from "./../../types";
import StatusLabel from "components/StatusLabel";

interface UsersListProps {
  data?: any;
}

const UsersList: React.FC<UsersListProps> = () => {
  const { response, loading } = useFetch({
    method: "GET",
    url: getAllUsers
  });

  const data =
    response?.data &&
    response?.data?.data.map((user: User) => ({
      club_name: user?.Club?.club_name ? (
        user?.Club?.club_name
      ) : (
        <>
          <h3>--</h3>
        </>
      ),
      id: user.id,
      key: user.id,
      name: `${user.first_name} ${user.last_name}`,
      status: <StatusLabel status={user.status} />,
      user_type: user.usertype
    }));

  return <ListPage columns={columns} data={data} loading={loading} />;
};

export default UsersList;
