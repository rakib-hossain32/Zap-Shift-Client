import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Commet } from "react-loading-indicators";
import PremiumForbidden from "../pages/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, isLoading } = useRole();

  // console.log(role);

  if (loading || !user || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }

  if (role !== "rider") {
    return <PremiumForbidden showReport={true}></PremiumForbidden>;
  }

  return children;
};

export default RiderRoute;
