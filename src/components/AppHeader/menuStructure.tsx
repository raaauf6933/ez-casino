import HomeIcon from "@mui/icons-material/Home";
import CasinoIcon from "@mui/icons-material/Casino";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import { UserTypeEnum } from "types";

interface MenuStructure {
  key: number;
  label: string;
  icon: React.ReactNode;
  url: string;
  permissionUserType: UserTypeEnum[] | any;
}

export const createMenuStructure = (): MenuStructure[] => [
  {
    icon: <HomeIcon />,
    key: 1,
    label: "Home",
    permissionUserType: [],
    url: "/"
  },
  {
    icon: <CasinoIcon />,
    key: 2,
    label: "Clubs",
    permissionUserType: [UserTypeEnum.SUPER_USER],
    url: "/clubs"
  },
  {
    icon: <PeopleIcon />,
    key: 3,
    label: "Agents",
    permissionUserType: [],
    url: "/agents"
  },
  {
    icon: <AssignmentIcon />,
    key: 4,
    label: "Payout",
    permissionUserType: [UserTypeEnum.CLUB_ADMIN, UserTypeEnum.SUPER_USER],
    url: "/payout"
  },
  {
    icon: <PersonIcon />,
    key: 5,
    label: "Users",
    permissionUserType: [UserTypeEnum.SUPER_USER],
    url: "/users"
  }
];
