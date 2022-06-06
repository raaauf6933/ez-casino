import AppLayout from "./components/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import ClubList from "./page/Club/views/ClubList";
import ClubDetails from "./page/Club/views/ClubDetails";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme";
import AgentList from "page/Agent/views/AgentList";
// import Payout from './page/Payout';
// import Users from './page/Users';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme()}>
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

const AppRoutes = (): JSX.Element => {
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="clubs">
            <Route index element={<ClubList />} />
            <Route path=":id" element={<ClubDetails />} />
          </Route>
          <Route path="agents">
            <Route index element={<AgentList />} />
            <Route path=":id" element={<AgentList />} />
          </Route>
          {/* 
          <Route path="/payout" element={<Payout />} />
          <Route path="/users" element={<Users />} /> */}
        </Routes>
      </AppLayout>
    </>
  );
};

export default App;
