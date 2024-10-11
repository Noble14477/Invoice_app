import React, { useContext, useEffect, useState } from "react";
import InvoiceDetail from "../pages/Dashboard/InvoiceDetail";
import { AppContext } from "../context/AppContext";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const RecentInvoice = () => {
  const { isModalOpen, toggleModal, setSubTotal } = useContext(AppContext);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceTotals, setInvoiceTotals] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleInvoice = async (invoiceId, invoiceTotal, discount) => {
    const data = { invoiceTotal, discount };
    console.log("the",data);
    
    setSubTotal(data);

    try {
      const invoiceDocRef = doc(db, "invoices", invoiceId);
      const invoiceDoc = await getDoc(invoiceDocRef);

      // Check if the document exists
      if (invoiceDoc && invoiceDoc.exists()) {
        const invoiceData = { id: invoiceDoc.id, ...invoiceDoc.data() };
        console.log("Fetched Invoice Data:", invoiceData);
        setSelectedInvoice(invoiceData);
        toggleModal();
      } else {
        console.error("No such invoice!");
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInvoicesQuery = query(
          collection(db, "invoices"),
          where("userId", "==", user.uid)
        );

        const unsubscribeInvoices = onSnapshot(
          userInvoicesQuery,
          (snapshot) => {
            const invoiceData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setInvoices(invoiceData);

            const totals = invoiceData.map((invoice) => {
              const invoiceItems = invoice.data?.items || []; // Access items safely

              if (Array.isArray(invoiceItems)) {
                const itemTotal = invoiceItems.reduce((sum, item) => {
                  const itemTotalValue = Number(item.itemTotal) || 0; // Ensure itemTotal is a number
                  return sum + itemTotalValue;
                }, 0);
                return { id: invoice.id, total: itemTotal };
              }
              return { id: invoice.id, total: 0 }; // Default to zero if no items
            });

            setInvoiceTotals(totals);
            console.log(totals);

            setLoading(false); // Data fetched
          }
        );

        // Clean up the listener on unmount
        return () => {
          unsubscribeInvoices();
        };
      } else {
        setLoading(false); // User not logged in
      }
    });

    // Clean up auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const day = date.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isModalOpen && <InvoiceDetail data={selectedInvoice} />}
      <div className="bg-white rounded-3xl p-4 md:p-8">
        <div className="md:flex justify-between items-center">
          <h3 className="font-bold text-darkGray md:text-xl w-full">
            Recent Invoice
          </h3>
          <button className="text-sm w-full my-4 text-primary rounded-full border border-gray-200 px-4 py-2 uppercase font-bold">
            View all invoices
          </button>
        </div>

        <div>
          <div className="grid gap-12 cursor-pointer">
          <h3 className="uppercase font-bold pt-6 -tracking-tighter">
                      today - {formatDate(new Date().toISOString())}
                    </h3>
            {invoices.length > 0 ? (
              invoices.map((invoice) => {
                const invoiceTotal =
                  invoiceTotals.find((total) => total.id === invoice.id)
                    ?.total || 0;

                return (
                  <div
                    key={invoice.id}
                    onClick={() =>
                      handleInvoice(invoice.id, invoiceTotal, invoice.data?.discount)
                    }
                  >
                    
                    <div className="flex justify-between items-center gap-4 hover:border duration-150 hover:p-2 hover:rounded-full hover:border-gray-100">
                      <h4 className="text-sm font-bold">
                        Invoice- {invoice.data?.invoiceNo || "No Data"}
                      </h4>
                      <p className="text-xs text-gray-600">
                        DUE DATE <br />
                        <span className="font-bold text-md">
                          {formatDate(invoice.data?.dueDate || "No Data")}
                        </span>
                      </p>
                      <h2 className="flex justify-end flex-col items-end font-bold text-sm gap-2">
                        {formatCurrency(invoiceTotal)} <br />
                        <span className="uppercase text-xs bg-[#dbfde9] border border-[#97fac0] rounded-full p-2 font-semibold">
                          paid
                        </span>
                      </h2>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-6 text-darkGray text-center">
                No Invoice Created
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentInvoice;
