import React, { useContext, useState } from "react";
import { avata, LogoFrame, menuClose } from "../../assets";
import InvoiceItems from "../../components/InvoiceItems";
import { AppContext } from "../../context/AppContext";

const InvoiceDetail = ({ data }) => {
  const { toggleModal } = useContext(AppContext);
  const [more, setMore] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const day = date.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // Handle 11th-13th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${date
      .toLocaleDateString("en-US", options)
      .replace(/(\d+)/, `$&${daySuffix(day)}`)}`;
  };

  const toggleMore = () => {
    setMore(!more);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 h-full overflow-hidden">
        <div className="bg-[#8f8f8f42] h-full w-full" />

        <div
          className="absolute right-4 md:right-16 top-4 cursor-pointer bg-white p-2 rounded-full"
          onClick={toggleModal}
        >
          <img src={menuClose} alt="menu" />
        </div>
        <div className="bg-white w-[90%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto rounded-3xl p-6 lg:p-10 overflow-y-auto">
          <div className="flex justify-between items-start flex-col md:flex-row gap-6">
            <div className="w-full">
              <h2 className="font-bold text-lg">
                Invoice - {data.data.invoiceNo}
              </h2>
              <p className="text-accent text-xs">
                View the details and activity of this invoice
              </p>
              <button className="text-primary border border-[#003EFF33] bg-[#e5eafc33] rounded-full py-1 px-4 text-xs mt-4">
                PARTIAL PAYMENT
              </button>
            </div>

            <div className="grid grid-cols-2 md:flex w-full gap-2 md:gap-6">
              <button className="text-xs  w-full text-primary border border-[#003EFF33] bg-[#e5eafc33] rounded-full uppercase py-2 md:py-4 font-semibold">
                Download as pdf
              </button>
              <button className="text-xs  w-full rounded-full uppercase bg-primary text-white py-2 md:py-4 font-semibold">
                Send Invoice
              </button>
              <div className="md:w-[200px] relative">
                <button onClick={toggleMore} className="text-xs  w-full text-darkGray border border-[#88888833] bg-[#eef0f833] rounded-full uppercase py-2 md:py-4 font-semibold">
                  More
                </button>
                {
                    more &&
                <div className={"bg-white p-4 text-sm shadow flex gap-2 rounded-xl flex-col  justify-start absolute z-30 w-full font-semibold text-accent"}>
                  <button className="uppercase">Duplicate Invoice</button>
                  <button className="uppercase">get sharable link</button>
                </div>
                }
              </div>
            </div>
          </div>

          <div className="border rounded-3xl flex justify-between md:items-center flex-col md:flex-row mt-8 p-4 md:py-6 text-xs font-semibold gap-2">
            <p className="uppercase text-accent">Reminders</p>
            <p className="bg-[#B6FDD3]  text-center py-2 px-6 rounded-full font-semibold">
              14 days before due date
            </p>
            <p className="bg-[#B6FDD3]  text-center py-2 px-6 rounded-full font-semibold">
              7 days before due date
            </p>
            <p className="border-gray-200 border text-center py-2 px-6 rounded-full font-semibold">
              3 days before due date
            </p>
            <p className="border-gray-200 border text-center py-2 px-6 rounded-full font-semibold">
              24 hrs before due date
            </p>
            <p className="border-gray-200 border text-center py-2 px-6 rounded-full font-semibold">
              On the due date
            </p>
          </div>

          <div className="border rounded-3xl mt-8 p-4 md:p-8 grid md:grid-cols-5 md:gap-8">
            <div className="col-span-3 w-full">
              <div className="bg-[#FCDDEC] p-4 md:p-8 rounded-3xl ">
                <div className="flex flex-col md:flex-row gap-10 justify-between">
                  <div>
                    <h5 className="uppercase text-accent font-semibold">
                      Sender
                    </h5>
                    <div className="md:flex gap-4 items-start mt-4">
                      <img src={LogoFrame} alt="" />
                      <div className="grid gap-2">
                        <h3 className="font-bold text-xl">
                          {data.data.senderName}
                        </h3>
                        <p className="text-sm text-accent">
                          {data.data.senderPhone}
                        </p>
                        <p className="text-sm text-accent">
                          {data.data.senderAddress}{" "}
                        </p>
                        <p className="text-sm text-accent">
                          {data.data.senderEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="uppercase text-accent font-semibold">
                      customer
                    </h5>
                    <div className="md:flex gap-4 items-start mt-4">
                      <div className="grid gap-2">
                        <h3 className="font-bold text-xl">
                          {data.data.customerName}
                        </h3>
                        <p className="text-sm text-accent">
                          {data.data.customerPhone}
                        </p>
                        <p className="text-sm text-accent">
                          {data.data.customerEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h5 className="uppercase text-accent font-semibold pb-2">
                    Invoice details
                  </h5>
                  <div className="flex justify-between flex-col md:flex-row gap-4">
                    <div>
                      <h5 className="uppercase font-thin text-accent">
                        invoice no
                      </h5>
                      <h2 className="font-bold">{data.data.invoiceNo}</h2>
                    </div>
                    <div>
                      <h5 className="uppercase font-thin text-accent">
                        Issue date
                      </h5>
                      <h2 className="font-bold text-sm">
                        {formatDate(data.data.issueDate)}
                      </h2>
                    </div>
                    <div>
                      <h5 className="uppercase font-thin text-accent">
                        due date
                      </h5>
                      <h2 className="font-bold text-sm">
                        {formatDate(data.data.dueDate)}
                      </h2>
                    </div>
                    <div>
                      <h5 className="uppercase font-thin text-accent">
                        Billing currency
                      </h5>
                      <h2 className="font-bold">{data.data.invoiceCurrency}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <InvoiceItems dataItems={data.data.items} />
              </div>
            </div>

            <div className="bg-white rounded-3xl w-full mt-10 md:mt-0  col-span-2">
              <div className=" w-full">
                <h3 className="font-bold text-darkGray md:text-xl ">
                  Invoice Activity
                </h3>
              </div>

              <div className=" w-full">
                <div className="flex gap-4 items-start mt-8">
                  <img src={avata} alt="avater" className="rounded-full" />
                  <div>
                    <h3 className="font-bold">You</h3>
                    <p className="text-sm text-[#697598] pb-2">
                      Yesterday, 12:05 PM
                    </p>
                    <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg w-full">
                      <p className="text-gray-400 text-sm">
                        Created invoice{" "}
                        <span className="font-bold text-darkGray">
                          00239434/Olaniyi Ojo Adewale
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start mt-8">
                  <img src={avata} alt="avater" className="rounded-full" />
                  <div>
                    <h3 className="font-bold">You</h3>
                    <p className="text-sm text-[#697598] pb-2">
                      Yesterday, 12:05 PM
                    </p>
                    <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg w-full">
                      <p className="text-gray-400 text-sm">
                        Sent invoice{" "}
                        <span className="font-bold text-darkGray">
                          00239434/Olaniyi Ojo Adewale
                        </span>{" "}
                        to
                        <span className="font-bold text-darkGray">
                          Olaniyi Ojo Adewale
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start mt-8">
                  <img src={avata} alt="avater" className="rounded-full" />
                  <div>
                    <h3 className="font-bold">Payment Confirmed</h3>
                    <p className="text-sm text-[#697598] pb-2">
                      Yesterday, 12:05 PM
                    </p>
                    <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg w-full">
                      <p className="text-gray-400 text-sm">
                        You manually confirmed a partial payment of{" "}
                        <span className="font-bold text-darkGray">
                          $503,000.00
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start mt-8">
                  <img src={avata} alt="avater" className="rounded-full" />
                  <div>
                    <h3 className="font-bold">Payment Confirmed</h3>
                    <p className="text-sm text-[#697598] pb-2">
                      Yesterday, 12:05 PM
                    </p>
                    <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg w-full">
                      <p className="text-gray-400 text-sm">
                        You manually confirmed a partial payment of{" "}
                        <span className="font-bold text-darkGray">
                          $6,000,000.00
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start mt-8">
                  <img src={avata} alt="avater" className="rounded-full" />
                  <div>
                    <h3 className="font-bold">You</h3>
                    <p className="text-sm text-[#697598] pb-2">
                      Yesterday, 12:05 PM
                    </p>
                    <div className="bg-[#F6F8FA] px-4 py-2 rounded-lg w-full">
                      <p className="text-gray-400 text-sm">
                        Sent invoice{" "}
                        <span className="font-bold text-darkGray">
                          00239434/Olaniyi Ojo Adewale
                        </span>{" "}
                        to
                        <span className="font-bold text-darkGray">
                          Olaniyi Ojo Adewale
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetail;
