import DashboardIcon from "@mui/icons-material/Dashboard";
import CasinoIcon from "@mui/icons-material/Casino";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import { UserTypeEnum } from "types";

export interface MenuStructure {
  key: number;
  label: string;
  icon: React.ReactNode;
  url: string;
  permissionUserType: UserTypeEnum[] | any;
  children?: {
    key: number;
    label: string;
    icon: React.ReactNode;
    url: string;
  }[];
}

export const createMenuStructure = (): MenuStructure[] => [
  {
    icon: <DashboardIcon />,
    key: 1,
    label: "Dashboard",
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
    label: "Agent Payout",
    permissionUserType: [UserTypeEnum.CLUB_ADMIN, UserTypeEnum.SUPER_USER],
    url: "/agent-payout"
  },
  {
    children: [
      {
        icon: <PaymentsIcon />,
        key: 4,
        label: "Payout",
        url: "/club-settlement/payout"
      },
      {
        icon: <CreditCardIcon />,
        key: 4,
        label: "Cash Advance",
        url: "/club-settlement/cash-advance"
      }
    ],
    icon: <AssignmentIcon />,
    key: 4,
    label: "Club Settlement",
    permissionUserType: [UserTypeEnum.SUPER_USER],
    url: "/club-settlement"
  },
  {
    icon: <PersonIcon />,
    key: 5,
    label: "Users",
    permissionUserType: [UserTypeEnum.SUPER_USER],
    url: "/users"
  }
];
