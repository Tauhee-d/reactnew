import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import DashboardDoc from "./pages/DashboardDoc/DashboardDoc";
import Room from "./pages/Room/Room/Room";
import DocPatientList from "./pages/Doctors/PatientList";
import PatientList from "./pages/Room/PatientList/PatientList";
import PatientProfile from "./pages/Room/PatientProfile/PatientProfile";
import { useState } from "react";
import UserRoleContext from './components/ContextApi/UserRoleContext'
import Alert from "./pages/Alert/Alert";
import Protected from "./components/ProtectedRoutes/Protected";
import Attachments from "./pages/Room/PatientProfile/Attachments";
import Doctor from "./pages/Doctors/Doctor";
import Nurse from "./pages/Nurse/Nurse";
import Profile from "./components/Profile/Profile";
import DashboardNurse from "./pages/Nurse/DashboardNurse";



const App = () => {
  const [userRole, setUserRole] = useState(null);
  // const [dummy,setDummy] = useState(null);
// console.log("first",dummy)



  const UserTypes = {
    doctor: "doctor",
    admin: "admin",
    nurse:'nurse'
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
              ) : userRole === UserTypes.nurse ? (
                <DashboardNurse/>
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
            ) : userRole === UserTypes.nurse ? (
              <Room/>
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
      <Route path="/Doctor" index element={<Doctor />} />
      <Route path="/Nurse" index element={<Nurse />} />
      <Route path="/Alert" index element={<Alert />} />
      <Route path="/Attachments" index element={<Attachments />} />
      <Route path="/DocPatientList" index element={<DocPatientList />} />
      <Route path="/PatientList" index element={<PatientList />} />
      <Route path="/PatientProfile" index element={<PatientProfile />} />
      <Route path="/Profile" index element={<Profile />} />

     
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