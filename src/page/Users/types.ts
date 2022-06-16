import { StatusType, UserTypeEnum } from "types";

export interface User {
  contact_number: string;
  createdAt: string;
  first_name: string;
  id: number;
  last_name: string;
  password: string;
  status: StatusType;
  updatedAt: string;
  username: string;
  usertype: UserTypeEnum;
}
