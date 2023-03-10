import { useContext } from "react"
import UserRoleContext from '../../components/ContextApi/UserRoleContext'
import DashboardAdmin from "../../pages/DashboardAdmin/DashboardAdmin";
import DashboardDoc from "../../pages/DashboardDoc/DashboardDoc";
import Patient from "../../pages/Patient/Patient";


const DashboardNav = () => {
    const { userRole } = useContext(UserRoleContext);

  return (
    <div>
      {userRole === 'admin' && <DashboardAdmin/>}
      {userRole === 'doctor' && <DashboardDoc/>}
      {userRole === 'patient' && <Patient/>}

    </div>
  )
}

export default DashboardNav
