import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Rooms from "./pages/Rooms/Room/Room";
import UserList from "./pages/UserList/UserList";
import UserTable from "./pages/UserTable/UserTable";
import TimeTemp from "./pages/TimeTemp/TimeTemp";
import Signin from "./pages/Signin&Signup/Signin";
import Device from "./pages/Device/Device";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import FirebaseTable from "./pages/FirebaseTable/FirebaseTable";
import Patient from "./pages/Rooms/Patient/Patient";
import Profile from "./pages/Rooms/PatientProfile/Profile";
import ParentRoom from "./pages/Rooms/Room/ParentRoom";
import DashboardDoc from "./pages/DashboardDoc/DashboardDoc";
import Patient1 from "./pages/Patient/Patient";
import { useState } from "react";
import { useEffect } from "react";


// const UserTypes = {
//   doctor:"Doctor User",
//   patient:'Patient User',
//   admin:'Admin User'
// }
// const CurrentUserType = UserTypes.admin





function App() {

  
  const [role ,setRole] = useState('')
  
  const UserTypes = {
    doctor:"doctor",
    patient:'patient',
    admin:"admin"
  }
  // const CurrentUserType = UserTypes.doctor
  // const CurrentUserType = app

  const Role = sessionStorage.getItem('user')
  console.log("first",Role)

  const roleData = (userrole) => {
    console.log("first",sessionStorage)
    setRole(userrole)
    console.log("user role1",role)
    console.log("user role2",userrole)

  }
  return (
    
    <Router>
        
          <Route exact path="/">
            <Signin onSubmit={roleData} /> 
          </Route>
      <div className="containers">
        <Switch>
          <Route  path="/dashboard">
            {/* {<ProtectedElement>{CurrentUserType && app && UserTypes.admin? <DashboardAdmin />:CurrentUserType && app && UserTypes.doctor? <DashboardDoc />:null}</ProtectedElement>} */}
            {  <ProtectedElement>{   Role === UserTypes.admin? <DashboardAdmin />:Role === UserTypes.doctor? <DashboardDoc />:<Patient1/>}</ProtectedElement>}
            
          </Route>
          <Route path="/Device">
           {<Device />}
          </Route>
          <Route path="/table">
            <FirebaseTable />
          </Route>
          <Route path="/parentrooms">
            <ParentRoom/>
          </Route>
          <Route path="/patient">
            {<ProtectedElement>{Role === UserTypes.patient?<Patient1/>:Role === UserTypes.admin? <Patient1 />:null}</ProtectedElement>}
          </Route>
          <Route path="*">
            <div>Page Not Found!</div>
          </Route>
          
         
          {/* <Route path="/rooms">
            <Rooms />
          </Route> */}
          {/* <Route path="/patients">
            <UserList />
          </Route> */}
          {/* <Route path="/users">
            <UserTable />
          </Route> */}
          {/* <Route path="/doctors">
            <TimeTemp />
          </Route> */}
         
          {/* <Route path="/patient">
            <Patient/>
          </Route> */}
          {/* <Route path="/profile">
            <Profile/>
          </Route> */}
         

        
        </Switch>
       
      </div>
    </Router>
  );
}

function ProtectedElement({children}){
  return<>
  {children}
  </>
}
// function UserElement({children}){
//   if(CurrentUserType === UserTypes.PATIENT_USER || CurrentUserType === UserTypes.ADMIN_USER){
//     return<>{children}</>
//   }else{
//     return<div>you do not have access to this page</div>
//   }
// }

export default App;
