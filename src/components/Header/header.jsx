import React, { useState } from "react";
import Logo from "../../Images/logo.png";
import { Menu } from "lucide-react";

function Header({ isMenuOpen, setIsMenuOpen }) {

  const user = localStorage.getItem("user")
  const email = localStorage.getItem("email")

  return (
    <header className="border-b bg-white">
      <div className="container ml-1 px-4 pl-0">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center justify-between border-b">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center mb-1">
              {isMenuOpen && (
                <img
                  src={Logo}
                  alt="Scooter Logo"
                  //   className="h-8"
                />
              )}
            </div>
          </div>

          {/* Right section - User Profile */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{user || "Test"}</div>
                <div className="text-xs text-gray-500">{email || "Test@gmail.com"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
