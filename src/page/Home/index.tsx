import { Typography } from "@mui/material";
import { useUser } from "context/auth/context";
import { UserTypeEnum } from "types";
import AgentDashboard from "./views/AgentDashboard";
import ClubAdminDashboard from "./views/ClubAdminDashboard";
import SuperAdminDashboard from "./views/SuperAdminDashboard";

const Home = (): JSX.Element => {
  const user = useUser();

  const getUserDashboard = () => {
    switch (user?.usertype) {
      case UserTypeEnum.AGENT:
        return <AgentDashboard />;
      case UserTypeEnum.CLUB_ADMIN:
        return <ClubAdminDashboard />;
      default:
        return <SuperAdminDashboard />;
    }
  };

  return (
    <>
      {" "}
      <Typography variant="h3" fontWeight={600} gutterBottom>
        Hello there, {user?.first_name}
      </Typography>
      {getUserDashboard()}
    </>
  );
};

export default Home;
