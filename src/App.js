import "./App.css";
import { BrowserRouter, Routes,  Route } from "react-router-dom";
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
import SingleRecPatient from "./pages/DashboardDoc/SingleRecPatient";
import Room from './pages/Room/Room/Room'
import PatientList from "./pages/Room/PatientList/PatientList";
import PatientProfile from "./pages/Room/PatientProfile/PatientProfile";




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
    
   
    
    <Routes>
        
          <Route  path="/">
            <Route index element={<Signin onSubmit={roleData} /> }/>
          </Route>
          <Route  path="/dashboard">
            <Route index element={  <ProtectedElement>{   Role === UserTypes.admin? <DashboardAdmin />:Role === UserTypes.doctor? <DashboardDoc />:Role === UserTypes.patient?<Patient1/>:null}</ProtectedElement>} /> 
          </Route>
          <Route path="/recentpatient/:id" index element={<SingleRecPatient/>}/>
          <Route path="/parentrooms" index element={<ParentRoom/>}/>
          <Route path="/Room" index element={<ProtectedElement> {Role === UserTypes.admin? <Room/>: Role === UserTypes.doctor?<Room/>:null}</ProtectedElement>}/>
          <Route path="/PatientList" index element={<PatientList/>}/>
          <Route path="/PatientProfile" index element={<PatientProfile/>}/>
        
          
          
      {/* <div className="containers">
        <Switch>
          <Route path="/Device">
           {<Device />}
          </Route>
          <Route path="/table">
            <FirebaseTable />
          </Route>
         
          <Route path="/patient">
            {<ProtectedElement>{Role === UserTypes.patient?<Patient1/>:Role === UserTypes.admin? <Patient1 />:null}</ProtectedElement>}
          </Route>
         
        
         
         
         
          <Route path="/PatientProfile">
            <PatientProfile/>
          </Route>
         
         
         
         
          <Route path="/patientlist">
            <Patient/>
          </Route>
          
         

        
        </Switch>
       
      </div> */}
    </Routes>
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
