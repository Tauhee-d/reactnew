import React from 'react'
import UserRoleContext from '../ContextApi/UserRoleContext';
import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';


const Protected = () => {
  const {userRole} = useContext(UserRoleContext)
  return (
   userRole != null ? <Outlet/> : <Navigate to="/"  />
  )
}

export default Protected
