import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  helpIcon,
  homeIcon,
  invoiceIcon,
  menuClose,
  modelIcon,
  overviewIcon,
  settingsIcon,
} from "../assets";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const [logoutIcon, setLogoutIcon] = useState(false);
  const { toggleMenu } = useContext(AppContext);

  const toggleLogout = () => {
    setLogoutIcon(!logoutIcon);
  };
  
  return (
    <div className="h-full bg-white w-full overflow-hidden">
      <div className="md:hidden absolute right-4 top-6 cursor-pointer" onClick={toggleMenu}>
        <img src={menuClose} alt="menu" />
      </div>

      <div className="py-20 px-4  h-full">
        <div className=" flex flex-col gap-2">
          <NavLink
            to="/getting-started"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center border-[6px] border-gray-100 py-3 px-4 rounded-full text-gray-800"
                : "flex gap-2  items-center px-4 py-3 text-accent"
            }
            // className="flex gap-2 items-center relative w-full px-4 group"
          >
            <img src={homeIcon} alt="home-Icon" />
            <span className="text-[14px] ">Geting Started</span>
          </NavLink>
          <NavLink
            to="/overview"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center border-[6px] border-gray-100 py-3 px-4 rounded-full text-gray-800"
                : "flex gap-2  items-center px-4 py-3 text-accent"
            }
            // className="flex gap-2 items-center relative w-full px-4 group"
          >
            <img src={overviewIcon} alt="overview-Icon" />
            <span className="text-[14px] ">Overview</span>
          </NavLink>
          <NavLink
            to="/accounts"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center border-[6px] border-gray-100 py-3 px-4 rounded-full text-gray-800"
                : "flex gap-2  items-center px-4 py-3 text-accent"
            }
            // className="flex gap-2 items-center relative w-full px-4 group"
          >
            <img src={homeIcon} alt="home-Icon" />
            <span className="text-[14px] ">Accounts</span>
          </NavLink>
          <NavLink
            to="/invoice"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center border-[6px] border-gray-100 py-3 px-4 rounded-full text-gray-800"
                : "flex gap-2  items-center px-4 py-3 text-accent"
            }
            // className="flex gap-2 items-center relative w-full px-4 group"
          >
            <img src={invoiceIcon} alt="invoice_Icon" />
            <span className="text-[14px] ">Invoice</span>
          </NavLink>
          <NavLink
            to="/beneficiary-management"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center border-[6px] border-gray-100 py-3 px-4 rounded-full text-gray-800"
                : "flex gap-2  items-center px-4 py-3 text-accent"
            }
            // className="flex gap-2 items-center relative w-full px-4 group"
          >
            <img src={modelIcon} alt="user icon" />
            <span className="text-[14px] ">Beneficiary Management</span>
          </NavLink>
          <NavLink
            to="/help-center"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center border-[6px] border-gray-100 py-3 px-4 rounded-full text-gray-800"
                : "flex gap-2  items-center px-4 py-3 text-accent"
            }
            // className="flex gap-2 items-center relative w-full px-4 group"
          >
            <img src={helpIcon} alt="help center" />
            <span className="text-[14px] ">Help Center</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center border-[6px] border-gray-100 py-3 px-4 rounded-full text-gray-800"
                : "flex gap-2  items-center px-4 py-3 text-accent"
            }
            // className="flex gap-2 items-center relative w-full px-4 group"
          >
            <img src={settingsIcon} alt="settings" />
            <span className="text-[14px] ">Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
