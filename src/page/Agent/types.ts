import { Club } from "page/Club/types";
import { StatusType } from "types";

export interface Agent {
  added_by_id: number;
  club_id: number;
  comms_rate: number;
  contact_number: string;
  createdAt: string;
  email: string;
  first_name: string;
  game_code: string;
  id: number;
  last_name: string;
  status: StatusType;
  updatedAt: string;
  username: string;
  Club: Club;
}
