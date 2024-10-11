// MenuContext.js
import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subTotal, setSubTotal] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  

  const isAuthenticated = () => {
    const getLocalstorage = JSON.parse(localStorage.getItem("user"));
    
    // Ensure that getLocalstorage is an object before trying to access its properties
    if (getLocalstorage && getLocalstorage.email) {
      return getLocalstorage; // Return the entire object to access the email later
    } else {
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
        toggleModal,
        isModalOpen,
        isAuthenticated,
        subTotal, setSubTotal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
