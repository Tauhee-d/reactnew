import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Topbar from "./components/Topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Rooms from "./pages/Rooms/Room";
import UserList from "./pages/UserList/UserList";
import UserTable from "./pages/UserTable/UserTable";
import TimeTemp from "./pages/TimeTemp/TimeTemp";
import Signin from "./pages/Signin&Signup/Signin";
import Device from "./pages/Device/Device";
import Dash from "./pages/Dash";
import Graph from "./components/Graph";
import DayData from "./components/DayData";
import FirebaseTable from "./pages/FirebaseTable/FirebaseTable";

function App() {
  return (
    // <>
    //     <Graph Data="Data"/>
    // </>
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

        
        </Switch>
       
      </div>
    </Router>
  );
}

export default App;
