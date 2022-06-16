import AppLayout from "./components/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRouter from "auth";
import Home from "./page/Home";
import ClubList from "./page/Club/views/ClubList";
import ClubDetails from "./page/Club/views/ClubDetails";
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
  return (
    <>
      {isAuthenticated ? (
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="clubs">
              <Route index element={<ClubList />} />
              <Route path=":id" element={<ClubDetails />} />
              <Route path="create" element={<ClubCreate />} />
            </Route>
            <Route path="agents">
              <Route index element={<AgentList />} />
              <Route path=":id" element={<AgentList />} />
            </Route>
            <Route path="payout">
              <Route index element={<PayoutList />} />
            </Route>
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path="create" element={<UserCreate />} />
              <Route path=":id" element={<UserEdit />} />
            </Route>
            {/* 
          <Route path="/payout" element={<Payout />} />
          <Route path="/users" element={<Users />} /> */}
          </Routes>
        </AppLayout>
      ) : (
        <AuthRouter />
      )}
    </>
  );
};

export default App;
