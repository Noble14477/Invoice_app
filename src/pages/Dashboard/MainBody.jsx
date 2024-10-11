import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { category, money, setting2, user } from "../../assets";
import RecentInvoice from "../../components/RecentInvoice";
import RecentActivities from "../../components/RecentActivities";
import CreateInvoice from "./CreateInvoice";

const MainBody = () => {
  const [createModal, setCreateModal] = useState(false);
  
  const handleCreateModal = ()=>{
    setCreateModal(prev=>!prev)
  }

  return (
    <>
      <div className="grid gap-12 max-w-7xl mx-auto">
        <Navbar />
        {createModal && <CreateInvoice isOpen={handleCreateModal}/>}
        <section className="flex justify-between md:items-center px-6 flex-col items-start gap-4 md:flex-row">
          <h2 className="text-2xl font-bold w-full lg:text-3xl">Invoice</h2>
          <div className="flex gap-4 w-full">
            <button className="md:py-4 py-2 text-[14px] uppercase text-gray-500 bg-white rounded-full w-full">
              See what's new
            </button>
            <button className="md:py-4 py-2 text-[14px] uppercase text-gray-100 bg-primary rounded-full w-full" onClick={handleCreateModal}>
              create
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 px-6 gap-8">
          <div className="bg-white py-6 md:px-10 px-4 rounded-3xl lg:w-full">
            <img src={category} alt="overview-Icon" className="size-8 " />
            <p className="text-xs uppercase py-4 flex md:gap-4 gap-2 items-center">
              Total paid{" "}
              <span className="bg-[#B6FDD3] size-8 flex justify-center items-center px-6 rounded-full font-semibold">
                1,289
              </span>
            </p>
            <h1 className="font-bold md:text-2xl">
              $4,120,102.<span className="text-sm text-gray-500">76</span>
            </h1>
          </div>

          <div className="bg-white py-6 md:px-10 px-4 rounded-3xl lg:w-full">
            <img src={category} alt="overview-Icon" className="size-8 " />
            <p className="text-xs uppercase py-4 flex gap-2 items-center">
              Total overdue{" "}
              <span className="bg-[#FFB7BD] size-6 flex justify-center items-center px-6 rounded-full font-semibold">
                13
              </span>
            </p>
            <h1 className="font-bold md:text-2xl">
              $23,000.<span className="text-sm text-gray-500">13</span>
            </h1>
          </div>

          <div className="bg-white py-6 md:px-10 px-4 rounded-3xl lg:w-full">
            <img src={category} alt="overview-Icon" className="size-8 " />
            <p className="text-xs uppercase py-4 flex gap-2 items-center">
              Total draft{" "}
              <span className="bg-[#D9D9E0] size-8 flex justify-center items-center px-6 rounded-full font-semibold">
                08
              </span>
            </p>
            <h1 className="font-bold md:text-2xl">
              $12,200.<span className="text-sm text-gray-500">00</span>
            </h1>
          </div>

          <div className="bg-white py-6 md:px-10 px-4 rounded-3xl lg:w-full">
            <img src={category} alt="overview-Icon" className="size-8 " />
            <p className="text-xs uppercase py-4 flex gap-2 items-center">
              Total Unpaid{" "}
              <span className="bg-[#F8E39B] size-8 flex justify-center items-center px-6 rounded-full font-semibold">
                06
              </span>
            </p>
            <h1 className="font-bold md:text-2xl">
              $87,102..<span className="text-sm text-gray-500">00</span>
            </h1>
          </div>
        </section>

        <section className="px-6 ">
          <h3 className="font-bold text-xl pb-4 text-darkGray">
            Invoice Actions
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary text-white rounded-3xl px-10  py-6 w-full cursor-pointer" onClick={handleCreateModal}>
              <img src={money} alt="money icon" />

              <h3 className="text-xl font-semibold py-2">Create New Invoice</h3>
              <p className="font-thin text-sm">Create new invoices easily</p>
            </div>

            <div className="bg-white text-darkGray rounded-3xl px-10  py-6 w-full">
              <img src={setting2} alt="icon" />

              <h3 className="text-xl font-semibold py-2">
                Change Invoice settings
              </h3>
              <p className="font-thin text-sm">Customise your invoices</p>
            </div>

            <div className="bg-white text-darkGray rounded-3xl px-10  py-6 w-full">
              <img src={user} alt="user icon" className="" />

              <h3 className="text-xl font-semibold py-2">
                Manage Customer list
              </h3>
              <p className="font-thin text-sm">Add and remove customers</p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-5 pb-10 md:gap-8 px-6">
          <div className="col-span-3 w-full">
            <RecentInvoice />
          </div>

          <div className="col-span-2 w-full mt-8 md:mt-0">
            <RecentActivities />
          </div>
        </section>
      </div>
    </>
  );
};

export default MainBody;
