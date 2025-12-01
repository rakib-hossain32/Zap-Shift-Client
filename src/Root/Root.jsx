import { Outlet } from "react-router";
import Navbar from "./../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";

const Root = () => {
    return (
      <div className=" bg-[#EAECED]">
        <div className="max-w-[1500px] mx-auto flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    );
};

export default Root;
