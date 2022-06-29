import { useUser } from "context/auth/context";
import React from "react";
import { Outlet } from "react-router-dom";
import { UserTypeEnum } from "types";

interface SectionRouteProps {
  permissionUserType: UserTypeEnum[] | any;
}

const SectionRoute: React.FC<SectionRouteProps> = props => {
  const { permissionUserType } = props;
  const user = useUser();

  return permissionUserType && permissionUserType.includes(user?.usertype) ? (
    <Outlet />
  ) : (
    <h1>Not Found</h1>
  );
};

export default SectionRoute;
