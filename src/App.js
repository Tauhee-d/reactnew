import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import ParentRoom from "./pages/Rooms/Room/ParentRoom";
import DashboardDoc from "./pages/DashboardDoc/DashboardDoc";
import Patient1 from "./pages/Patient/Patient";
import SingleRecPatient from "./pages/DashboardDoc/SingleRecPatient";
import Room from "./pages/Room/Room/Room";
import PatientList from "./pages/Room/PatientList/PatientList";
import PatientProfile from "./pages/Room/PatientProfile/PatientProfile";
import { useState } from "react";

const App = () => {
  const UserTypes = {
    doctor: "doctor",
    patient: "patient",
    admin: "admin",
  };

  const Role = sessionStorage.getItem("user");

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        {/* <Route index element={<Signin onSubmit={roleData} /> }/> */}
      </Route>
      <Route path="/dashboard">
        <Route
          index
          element={
            <ProtectedElement>
              {Role === UserTypes.admin ? (
                <DashboardAdmin />
              ) : Role === UserTypes.doctor ? (
                <DashboardDoc />
              ) : Role === UserTypes.patient ? (
                <Patient1 />
              ) : null}
            </ProtectedElement>
          }
        />
      </Route>
      <Route path="/recentpatient/:id" index element={<SingleRecPatient />} />
      <Route path="/parentrooms" index element={<ParentRoom />} />
      <Route
        path="/Room"
        index
        element={
          <ProtectedElement>
            {" "}
            {Role === UserTypes.admin ? (
              <Room />
            ) : Role === UserTypes.doctor ? (
              <Room />
            ) : null}
          </ProtectedElement>
        }
      />
      <Route path="/PatientList" index element={<PatientList />} />
      <Route path="/PatientProfile" index element={<PatientProfile />} />
    </Routes>
  );
};

function ProtectedElement({ children }) {
  return <>{children}</>;
}

export default App;
