import React from "react";
import useAuth from "../hooks/useAuth";
import { Commet } from "react-loading-indicators";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    const location = useLocation()
    // console.log(location)

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={'/login'}/>
};

export default PrivateRoute;
