import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const InvoiceItems = ({ dataItems }) => {
  const { subTotal } = useContext(AppContext);
  const [discountRate, setDiscountRate] = useState('');
  const [finalPrice, setFinalPrice] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(null);  

  useEffect(() => {
    const calculateDiscount = () => {
      const originalPrice = parseFloat(subTotal.invoiceTotal);
      // Check if originalPrice is a valid number
      if (isNaN(originalPrice)) {
        setFinalPrice(null);
        setDiscountAmount(null);
        return;
      }

      const discountPercentage = parseFloat(subTotal.discount) / 100;
      const discountAmount = originalPrice * discountPercentage;
      const discountedPrice = originalPrice - discountAmount;

      setFinalPrice(discountedPrice.toFixed(2)); // Keep two decimal places
      setDiscountAmount(discountAmount.toFixed(2)); // Keep two decimal places
    };

    calculateDiscount();
  }, [subTotal.invoiceTotal, subTotal.discount]);
  

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex gap-4 items-center">
          <h3 className="flex font-bold text-xl">Items</h3>{" "}
          <div className="w-full border-t" />
        </div>

        <div className="mt-8 grid gap-8 overflow-hidden pr-6">
          {dataItems.map((item) => (
            <div className="flex flex-col lg:flex-row " key={item.product}>
              <div className="md:w-[450px]">
                <h4 className="font-medium text-sm">{item.product}</h4>
                <p className="text-xs text-darkGray">
                {item.discription}
                </p>
              </div>
              <div className="grid grid-cols-3 mt-2 md:mt-0 w-full">
                <p className="font-medium text-sm ">{item.quantity}</p>
                <p className="font-medium text-sm  ">{item.amount}</p>
                <p className="font-medium text-sm">${item.itemTotal}</p>
              </div>
            </div>
          ))}

          <div className="flex flex-col lg:flex-row ">
            <div className="md:w-[450px]"></div>
            <div className="flex justify-between w-full">
              <div className="grid gap-2">
                <p className="font-medium text-xs text-accent uppercase">
                  Subtotal
                </p>
                <p className="font-medium text-xs text-accent uppercase">
                  Discount {subTotal.discount}%
                </p>
                <p className="font-bold text-sm text-darkGray uppercase mt-2">
                  Total amount due
                </p>
              </div>
              <div className="grid gap-2">
                <p className="font-medium text-sm">
                  {formatCurrency(subTotal.invoiceTotal)}
                </p>
                <p className="font-medium text-sm">
                  {formatCurrency(discountAmount)}
                </p>
                <p className="font-bold text-md mt-2 lg:text-[16px]">
                  {formatCurrency(finalPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-3xl flex justify-between md:items-center flex-col md:flex-row mt-8 p-4 md:py-6 text-xs font-semibold gap-2">
          <div className="w-full">
            <h5 className="uppercase text-accent font-semibold pb-4">
              Payment information
            </h5>
            <div className="flex justify-start flex-wrap gap-4">
              <div className="w-[132px]">
                <h5 className="uppercase font-thin text-accent">
                  Account name
                </h5>
                <h2 className="font-bold">1023902390</h2>
              </div>
              <div className="w-[132px]">
                <h5 className="uppercase font-thin text-accent">
                  account number
                </h5>
                <h2 className="font-bold">March 30th, 2023</h2>
              </div>
              <div className="w-[132px]">
                <h5 className="uppercase font-thin text-accent">
                  Ach routing no
                </h5>
                <h2 className="font-bold">May 19th, 2023</h2>
              </div>
              <div className="w-[132px]">
                <h5 className="uppercase font-thin text-accent">Bank Name</h5>
                <h2 className="font-bold">USD ($)</h2>
              </div>
              <div className="w-[132px]">
                <h5 className="uppercase font-thin text-accent">
                  bank address
                </h5>
                <h2 className="font-bold">1023902390</h2>
              </div>
              <div className="w-[132px]">
                <h5 className="uppercase font-thin text-accent">
                  Account name
                </h5>
                <h2 className="font-bold">1023902390</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gray-100 mt-8 p-4">
          <p className="text-xs font-thin text-accent">NOTE</p>
          <p className="text-sm text-darkGray pt-1 font-medium">
            Thank you for your patronage
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceItems;
