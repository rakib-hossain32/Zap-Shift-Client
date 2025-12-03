import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { Commet } from "react-loading-indicators";
import PremiumForbidden from "../pages/Forbidden/Forbidden";


const AdminRouter = ({ children }) => {
  const { loading } = useAuth();
    const { role, isLoading } = useRole();
    
    console.log(role)

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  if (role.role !== "admin") {
    return <PremiumForbidden showReport={true}></PremiumForbidden>
  }

  return children;
};

export default AdminRouter;
