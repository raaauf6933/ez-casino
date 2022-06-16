import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";

interface AuthProps {
  data?: any;
}

const Auth: React.FC<AuthProps> = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Auth;
