import { useUser } from "context/auth/context";
import * as React from "react";
import { UserTypeEnum } from "types";

interface RequirePermissionProps {
  userTypes: UserTypeEnum[] | any;
  children: React.ReactNode;
}

const RequirePermission: React.FC<RequirePermissionProps> = props => {
  const { children, userTypes } = props;

  const user = useUser();

  return userTypes.includes(user?.usertype) ? <>{children}</> : null;
};

export default RequirePermission;
