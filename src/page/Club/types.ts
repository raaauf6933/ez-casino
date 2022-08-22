import { StatusType } from "types";

export interface Club {
  id: number;
  admin_rate: number;
  club_game_id: number;
  club_name: string;
  contact_person: string;
  mobile_number: string;
  email: string;
  status: StatusType;
}
