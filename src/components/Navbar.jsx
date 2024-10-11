import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { arrowDownIcon, notificationIcon } from "../assets";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [initials, setInitials] = useState("");
  const [toggleLogout, setToggleLogout] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isUser, setisUser] = useState("");
  const { isAuthenticated } = useContext(AppContext);

  const navigate = useNavigate();

  const handleToggleUserInfo = () => {
    setToggleLogout((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const userInitials = () => {
    const userData = isAuthenticated(); 
  
    if (userData) {
      const displayName = userData.email; 
      console.log(displayName);
      
      setInitials(getInitials(displayName));
      setUserEmail(userData.email); 
      setisUser(userData); 
    } else {
      setInitials(""); 
    }
  };
  useEffect(() => {
    userInitials();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => n.charAt(0).toUpperCase()).join("");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center w-full border-b border-gray-200">
        <h1 className="text-2xl font-bold py-4 uppercase text-darkGray -tracking-tighter">
          Invoice
        </h1>
        {isUser.email && (
          <div className="flex gap-2 md:gap-6">
            <div className="bg-white size-10 rounded-full flex justify-center items-center">
              <img src={notificationIcon} alt="notification Icon" />
            </div>
            <div
              className="bg-white h-10 flex justify-center items-center gap-1 rounded-full p-2 relative"
              onClick={handleToggleUserInfo}
            >
              <p className="bg-primary rounded-full size-8 text-white flex items-center justify-center font-bold">
                {initials ? <span>{initials}</span> : <span>Guest</span>}
              </p>
              <img src={arrowDownIcon} alt="" />
              {toggleLogout && (
                <div className="absolute bg-white shadow-lg px-2 py-4 -bottom-28 right-0 place-items-start grid gap-4 rounded-xl text-sm">
                  <p className="">{userEmail}</p>
                  <button
                    className="bg-red-600 text-white p-2 w-full rounded-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
