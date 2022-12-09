import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Topbar from "./components/Topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Rooms from "./pages/Rooms/Room";
import UserList from "./pages/UserList/UserList";
import UserTable from "./pages/UserTable/UserTable";
import UserDetail from "./pages/UserDetail/UserDetail";
import TimeTemp from "./pages/TimeTemp/TimeTemp";

function App() {
  return (
    <Router>
      <Topbar title="fu@@d" />
      <div className="containers">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/rooms">
            <Rooms />
          </Route>
          <Route path="/patients">
            <UserList />
          </Route>
          <Route path="/devices">
            <UserTable />
          </Route>
          <Route path="/userDetail">
            <UserDetail />
          </Route>
          <Route path="/doctors">
            <TimeTemp />
          </Route>

          {/* <Route path="/MainRoom">
      <MainRoom/>
    </Route> */}
        </Switch>
        {/* <MainContainer/> */}
        {/* <Dashboard/> */}
      </div>
    </Router>
    // </Admin>
  );
}

export default App;
