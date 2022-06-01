import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';


interface MenuStructure {
  key:number,
  label: string,
  icon: React.ReactNode,
  url: string
}

export const createMenuStructure = () : MenuStructure[] => [
  {
    icon: <HomeIcon />,
    key: 1,
    label: 'Home',
    url: '/'
  },
  {
    icon: <CasinoIcon />,
    key: 2,
    label: 'Clubs',
    url:'/clubs'
  },
  {
    icon: <PeopleIcon />,
    key: 3,
    label: 'Agents',
    url: '/agents'
  },
  {
    icon: <AssignmentIcon />,
    key: 4,
    label: 'Payout',
    url: '/payout'
  },
  {
    icon: <PersonIcon />,
    key: 5,
    label: 'Users',
    url: '/users'
  }
];
