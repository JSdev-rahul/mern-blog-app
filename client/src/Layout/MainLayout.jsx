import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

const MainLayout = () => {
  return (
    <main className="my-5 mx-4 ">
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
