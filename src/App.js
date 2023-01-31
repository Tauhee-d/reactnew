import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Rooms from "./pages/Rooms/Room/Room";
import UserList from "./pages/UserList/UserList";
import UserTable from "./pages/UserTable/UserTable";
import TimeTemp from "./pages/TimeTemp/TimeTemp";
import Signin from "./pages/Signin&Signup/Signin";
import Device from "./pages/Device/Device";
import Dash from "./pages/Dash";
import FirebaseTable from "./pages/FirebaseTable/FirebaseTable";
import Patient from "./pages/Rooms/Patient/Patient";
import Profile from "./pages/Rooms/PatientProfile/Profile";

function App() {
  return (
    
    <Router>
        
          <Route exact path="/">
            <Signin />
          </Route>
      <div className="containers">
        <Switch>
          <Route  path="/dash">
            <Dash />
          </Route>
          <Route  path="/dashboard">
            <Dashboard />
          </Route>
          <Route  path="/dash">
            <Dash />
          </Route>
          <Route path="/rooms">
            <Rooms />
          </Route>
          <Route path="/patients">
            <UserList />
          </Route>
          <Route path="/users">
            <UserTable />
          </Route>
          <Route path="/Device">
          <Device />
          </Route>
          <Route path="/doctors">
            <TimeTemp />
          </Route>
          <Route path="/table">
            <FirebaseTable />
          </Route>
          <Route path="/patient">
            <Patient/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>

        
        </Switch>
       
      </div>
    </Router>
  );
}

export default App;
