import React, { useContext } from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Layout = () => {
    const { isMenuOpen } = useContext(AppContext);
  return <div className="md:grid md:grid-cols-10">
    <section className={isMenuOpen ? "hidden md:block md:col-span-2" : "md:col-span-2 block"}>
        <Sidebar/>
    </section>
    <main className="md:col-span-8">
        <Outlet/>
    </main>
  </div>;
};

export default Layout;
