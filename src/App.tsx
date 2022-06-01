import AppLayout from './components/AppLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
// import ClubList from './page/Club/views/ClubList';
// import ClubDetails from './page/Club/views/ClubDetails';
import Agent from './page/Agent';
// import Payout from './page/Payout';
// import Users from './page/Users';

const App = () :JSX.Element => {

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};

const AppRoutes = () :JSX.Element => {
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home  />} />
          {/* <Route path="clubs">
            <Route index element={<ClubList />} />
            <Route path=":id" element={<ClubDetails />} />
          </Route>
          <Route path="/agents" element={<Agent />} />
          <Route path="/payout" element={<Payout />} />
          <Route path="/users" element={<Users />} /> */}
            <Route path="/agents" element={<Agent />} />
        </Routes>
      </AppLayout>
    </>
  );
};

export default App;
