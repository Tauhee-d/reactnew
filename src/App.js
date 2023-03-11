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
import UserRoleContext from './components/ContextApi/UserRoleContext'


const App = () => {
  const [userRole, setUserRole] = useState(null);


  const UserTypes = {
    doctor: "doctor",
    patient: "patient",
    admin: "admin",
  };

  
  return (
   
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>

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
              {userRole === UserTypes.admin ? (
                <DashboardAdmin />
              ) : userRole === UserTypes.doctor ? (
                <DashboardDoc />
              ) : userRole === UserTypes.patient ? (
                <Patient1 />
              ) : null}
            </ProtectedElement>
          }
        />
       
      </Route>

      <Route path="/recentpatient/:id" index element={<SingleRecPatient />} />
      {/* <Route path="/parentrooms" index element={<ParentRoom />} /> */}
      <Route
        path="/Room"
        index
        element={
          <ProtectedElement>
            {" "}
            {userRole === UserTypes.admin ? (
              <Room />
            ) : userRole === UserTypes.doctor ? (
              <Room />
            ) : null}
          </ProtectedElement>
        }
      />
      <Route path="/PatientList" index element={<PatientList />} />
      <Route path="/PatientProfile" index element={<PatientProfile />} />
    </Routes>
    </UserRoleContext.Provider>


  );
};

function ProtectedElement({ children }) {
  return <>{children}</>;
}

export default App;
