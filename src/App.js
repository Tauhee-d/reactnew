import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import DashboardDoc from "./pages/DashboardDoc/DashboardDoc";
import Patient1 from "./pages/Patient/Patient";
import Room from "./pages/Room/Room/Room";
import PatientList from "./pages/Room/PatientList/PatientList";
import PatientProfile from "./pages/Room/PatientProfile/PatientProfile";
import { useState } from "react";
import UserRoleContext from './components/ContextApi/UserRoleContext'
import Alert from "./pages/Alert/Alert";
import Protected from "./components/ProtectedRoutes/Protected";
import Attachments from "./pages/Room/PatientProfile/Attachments";


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
      </Route>
    <Route path='/' element={<Protected/>} >

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
    </Route>
    <Route path='/' element={<Protected/>} >
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

    </Route>


    <Route path="/*" element={<Navigate to="/" />} />



  
      {/* <Route
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
      /> */}
      <Route path="/Alert" index element={<Alert />} />
      <Route path="/Attachments" index element={<Attachments />} />
      <Route path="/PatientList" index element={<PatientList />} />
      <Route path="/PatientProfile" index element={<PatientProfile />} />

     
    </Routes>
    </UserRoleContext.Provider>


  );
};

const useAuth = () => {
  return true
}
function ProtectedElement({ children })
{

  return <>{children}</>;
}

export default App;
