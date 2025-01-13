import { useEffect } from "react";
import Header from "../Header/header";
import Sidebar from "../SideNavBar/sidenavbar";
import { Outlet, useNavigate } from "react-router-dom";

function Layout({ isMenuOpen, setIsMenuOpen }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  return (
    <div className="  bg-gray-100">
      <div className="flex flex-col">
        <Header
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
        />
        <div className="flex flex-row w-full">
          <Sidebar isMenuOpen={isMenuOpen} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
