import useFetch from "hooks/useFetch";
import {
  GET_CLUB_ADMIN_DASHBOARD,
  GET_SUPER_USER_DASHBOARD
} from "page/Home/api";
import React from "react";
import { useUser } from "context/auth/context";
import { UserTypeEnum } from "types";
import ClubPageDetails from "page/Home/components/ClubPage/ClubPageDetails";

const ClubAdminDashboard: React.FC = () => {
  const user = useUser();

  const { response, loading } = useFetch({
    url:
      user?.usertype === UserTypeEnum.CLUB_ADMIN
        ? GET_CLUB_ADMIN_DASHBOARD
        : GET_SUPER_USER_DASHBOARD
  });

  return (
    <>
      <ClubPageDetails data={response} loading={loading} />
    </>
  );
};

export default ClubAdminDashboard;
