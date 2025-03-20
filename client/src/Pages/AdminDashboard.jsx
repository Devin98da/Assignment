import React from "react";
import Sidebar from "../Components/SideBar";
import { Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
