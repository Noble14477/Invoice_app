import React from "react";
import { avata } from "../assets";

const RecentActivities = () => {
  return (
    <>
      <div className="bg-white rounded-3xl p-8 w-full grid gap-14">
        <div className="md:flex justify-between items-center">
          <h3 className="font-bold text-darkGray md:text-xl w-full">
            Recent Activities
          </h3>
          <button className="text-sm w-full md:w-fit whitespace-nowrap my-4 text-primary rounded-full border border-gray-200 px-4 py-2 uppercase font-bold">
            View all
          </button>
        </div>

        <div className="">
          <div className="flex gap-4 items-start">
            <img src={avata} alt="avater" className="rounded-full" />
            <div>
              <h3 className="font-bold">Invoice Creation</h3>
              <p className="text-sm text-[#697598] pb-2">Yesterday, 12:05 PM</p>
              <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg">
                <p className="text-gray-400 text-sm">
                  Created invoice{" "}
                  <span className="font-bold text-darkGray">
                    00239434/Olaniyi Ojo Adewale
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex gap-4 items-start">
            <img src={avata} alt="avater" className="rounded-full" />
            <div>
              <h3 className="font-bold">Invoice Creation</h3>
              <p className="text-sm text-[#697598] pb-2">Yesterday, 12:05 PM</p>
              <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg">
                <p className="text-gray-400 text-sm">
                  Created invoice{" "}
                  <span className="font-bold text-darkGray">
                    00239434/Olaniyi Ojo Adewale
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex gap-4 items-start">
            <img src={avata} alt="avater" className="rounded-full" />
            <div>
              <h3 className="font-bold">Invoice Creation</h3>
              <p className="text-sm text-[#697598] pb-2">Yesterday, 12:05 PM</p>
              <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg">
                <p className="text-gray-400 text-sm">
                  Created invoice{" "}
                  <span className="font-bold text-darkGray">
                    00239434/Olaniyi Ojo Adewale
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex gap-4 items-start">
            <img src={avata} alt="avater" className="rounded-full" />
            <div>
              <h3 className="font-bold">Invoice Creation</h3>
              <p className="text-sm text-[#697598] pb-2">Yesterday, 12:05 PM</p>
              <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg">
                <p className="text-gray-400 text-sm">
                  Created invoice{" "}
                  <span className="font-bold text-darkGray">
                    00239434/Olaniyi Ojo Adewale
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default RecentActivities;
