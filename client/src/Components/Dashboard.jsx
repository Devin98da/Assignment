import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../Redux/Slices/adminSlice";

const Dashboard = () => {

  const students = useSelector(state => state.students.students);
  const activeStudents = students?.filter(s => s.status === "Active").length || 0;
  const inactiveStudents = students?.filter(s => s.status === "Inactive").length || 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (students?.length === 0) {
          const res = await dispatch(getStudents());
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();

  }, [dispatch]);

  return (
    <div >
      <h2 className="mt-4">Dashboard</h2>
      <p>Welcome to the admin dashboard. Manage everything from here.</p>

      <div className="row g-3">
        {/* Total Users */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg text-center">
            <div className="card-body">
              <h5 className="card-title fw-bold">Total Students</h5>
              <p className="card-text display-6">{students?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg text-center">
            <div className="card-body">
              <h5 className="card-title fw-bold">Active Students</h5>
              <p className="card-text display-6">{activeStudents}</p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg text-center">
            <div className="card-body">
              <h5 className="card-title fw-bold">Inactive Students</h5>
              <p className="card-text display-6">{inactiveStudents}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
