import AppLayout from "./components/AppLayout";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { parse as parseQs } from "qs";
import "react-toastify/dist/ReactToastify.css";
import AuthRouter from "auth";
import Home from "./page/Home";
import ClubList from "./page/Club/views/ClubList";
import ClubEdit from "./page/Club/views/ClubEdit";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme";
import AgentList from "page/Agent/views/AgentList";
import UsersList from "page/Users/views/UsersList";
import PayoutList from "page/Payout/views/PayoutList";
import { useAuth, AuthContextProvider } from "context/auth/context";
import UserCreate from "page/Users/views/UserCreate";
import { AppStateProvider } from "context/appState/context";
import UserEdit from "page/Users/views/UserEdit";
import { ToastContainer } from "react-toastify";
import ClubCreate from "page/Club/views/ClubCreate";
import SectionRoute from "components/SectionRoute";
import { UserTypeEnum } from "types";
import AgentCreate from "page/Agent/views/AgentCreate";
import AccountDetails from "page/AccountDetails/views/AccountDetails";
import PayoutDetails from "page/Payout/views/PayoutDetails";

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <AppStateProvider>
          <AuthContextProvider>
            <ThemeProvider theme={theme()}>
              <AppRoutes />
              <ToastContainer />
            </ThemeProvider>
          </AuthContextProvider>
        </AppStateProvider>
      </BrowserRouter>
    </>
  );
};

const AppRoutes = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { search } = useLocation();
  const queryParams = parseQs(search.substr(1));

  return (
    <>
      {isAuthenticated ? (
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="clubs"
              element={
                <SectionRoute permissionUserType={[UserTypeEnum.SUPER_USER]} />
              }
            >
              <Route index element={<ClubList />} />
              <Route path=":id" element={<ClubEdit />} />
              <Route path="create" element={<ClubCreate />} />
            </Route>
            <Route path="agents">
              <Route index element={<AgentList params={queryParams} />} />
              <Route path=":id" element={<AgentList params={queryParams} />} />
              <Route path="create" element={<AgentCreate />} />
            </Route>
            <Route
              path="payout"
              element={
                <SectionRoute
                  permissionUserType={[
                    UserTypeEnum.CLUB_ADMIN,
                    UserTypeEnum.SUPER_USER
                  ]}
                />
              }
            >
              <Route index element={<PayoutList params={queryParams} />} />
              <Route
                path=":id"
                element={<PayoutDetails params={queryParams} />}
              />
            </Route>
            <Route
              path="users"
              element={
                <SectionRoute permissionUserType={[UserTypeEnum.SUPER_USER]} />
              }
            >
              <Route index element={<UsersList />} />
              <Route path="create" element={<UserCreate />} />
              <Route path=":id" element={<UserEdit />} />
            </Route>
            <Route path="account-details">
              <Route
                path=":id"
                element={<AccountDetails params={queryParams} />}
              />
            </Route>
            {/* 
          <Route path="/payout" element={<Payout />} />
          <Route path="/users" element={<Users />} /> */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </AppLayout>
      ) : (
        <AuthRouter />
      )}
    </>
  );
};

export default App;
