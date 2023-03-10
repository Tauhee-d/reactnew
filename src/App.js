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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserRoleContext from './components/ContextApi/UserRoleContext'
import DashboardNav from "./components/AppNavigator/DashboardNav";


const App = () => {
  const [userRole, setUserRole] = useState(null);


  const UserTypes = {
    doctor: "doctor",
    patient: "patient",
    admin: "admin",
  };

  // const Role = sessionStorage.getItem("user");

  // const storedRole = sessionStorage.getItem("user");
  // useEffect(()=> {
  //   sessionStorage.setItem('userRole',storedRole)
  //   setRole(storedRole);

  //   navigation("/dashboard");
  // },[Role])


  // useEffect(() => {
  //   setRole(storedRole);
  //   console.log("login1", storedRole);
  // }, [storedRole, Role]);
  // console.log('login',Role)

  // useEffect(() => {
  //   // Refresh the app every 5 seconds
  //   const intervalId = setInterval(() => {
  //     window.location.reload();
  //   },[]);

  //   // Clear the interval on unmount
  //   return () => clearInterval(intervalId);
  // }, []);
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
      <Route path="/parentrooms" index element={<ParentRoom />} />
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
