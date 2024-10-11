import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { menuClose } from "../../assets";
import Loader from "../../components/Loader";
import { ErrorMessage, SuccessMessage } from "../../components/PopupMessage";

const CreateInvoice = ({ isOpen }) => {
  const [totalItem, setTotalItem] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [itemsData, setItemsData] = useState({
    product: "",
    discription: "",
    quantity: "",
    amount: "",
  });
  const [invoiceData, setInvoiceData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    senderEmail: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    invoiceNo: "",
    invoiceCurrency: "",
    issueDate: "",
    dueDate: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setItemsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    const totalItemUnit = itemsData.quantity * itemsData.amount;

    const updatedItemData = {
      ...itemsData,
      itemTotal: totalItemUnit,
    };

    const existingItems = JSON.parse(localStorage.getItem("itemList")) || [];
    const updatedItems = [...existingItems, updatedItemData];
    localStorage.setItem("itemList", JSON.stringify(updatedItems));
    setTotalItem(updatedItems.length);
    setItemsData({
      product: "",
      discription: "",
      quantity: "",
      amount: "", // Reset itemTotal as well
    });
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);
    const itemsList = JSON.parse(localStorage.getItem("itemList"));

    if (itemsList) {
      const data = {
        ...invoiceData,
        items: itemsList,
      };
      console.log(data);

      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        console.log("Logged-in user ID:", userId);
        try {
          await addDoc(collection(db, "invoices"), {
            data,
            date: new Date().toISOString(),
            userId: userId,
          });
          setLoading(false);
          setSuccess("Invoice created successfully!");
          localStorage.removeItem("itemList");
          setInvoiceData({
            senderName: "",
            senderPhone: "",
            senderAddress: "",
            senderEmail: "",
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            invoiceNo: "",
            invoiceCurrency: "",
            issueDate: "",
            dueDate: "",
            discount: "",
          });
        } catch (error) {
          console.error("Error adding document: ", error);
          setError("Server Error");
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-full overflow-hidden">
      {loading && <Loader />}
      {success && <SuccessMessage message={success} />}
      {error && <ErrorMessage message={error} />}
      <div className="bg-[#8f8f8f42] h-full w-full" />
      <div
        className="absolute right-4 md:right-16 top-4 cursor-pointer bg-white p-2 rounded-full"
        onClick={isOpen}
      >
        <img src={menuClose} alt="menu" />
      </div>
      <div className="bg-white w-[90%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto rounded-3xl p-4 lg:p-10 overflow-y-auto">
        <h2 className="text-lg font-bold pb-6">Create Invoice</h2>

        <form action="">
          <div className="grid md:grid-cols-2 gap-8 place-items-start">
            {/* sender */}
            <div className="w-full border rounded-2xl p-2 grid gap-4">
              <h4 className="uppercase text-xm  ">Sender</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={invoiceData.senderName}
                  onChange={handleChange}
                  name="senderName"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={invoiceData.senderPhone}
                  name="senderPhone"
                  onChange={handleChange}
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Address"
                  value={invoiceData.senderAddress}
                  onChange={handleChange}
                  name="senderAddress"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={invoiceData.senderEmail}
                  onChange={handleChange}
                  name="senderEmail"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
              </div>
            </div>

            {/* customer */}
            <div className="w-full border rounded-2xl p-2 grid gap-4">
              <h4 className="uppercase text-xm  ">Customer</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={invoiceData.customerName}
                  onChange={handleChange}
                  name="customerName"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={invoiceData.customerPhone}
                  onChange={handleChange}
                  name="customerPhone"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={invoiceData.customerEmail}
                  onChange={handleChange}
                  name="customerEmail"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="w-full border rounded-2xl p-2 grid gap-4">
              <h4 className="uppercase text-xm  ">Invoice Details</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Invoice No"
                  value={invoiceData.invoiceNo}
                  onChange={handleChange}
                  name="invoiceNo"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
                <input
                  type="text"
                  placeholder="Billing currency (USD $)"
                  value={invoiceData.invoiceCurrency}
                  onChange={handleChange}
                  name="invoiceCurrency"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />

                <div className="w-full">
                  Issue Date
                  <input
                    type="date"
                    placeholder=""
                    value={invoiceData.issueDate}
                    onChange={handleChange}
                    name="issueDate"
                    className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                  />
                </div>
                <div className="w-full">
                  Due Date
                  <input
                    type="date"
                    placeholder="Due Date"
                    value={invoiceData.dueDate}
                    onChange={handleChange}
                    name="dueDate"
                    className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                  />
                </div>
                <div className="mt-4 col-span-2">
                  <p className="text-sm pb-2 font-medium text-accent">
                    Input the discount as shown below
                  </p>
                  <input
                    type="number"
                    placeholder="Discount eg. 2.5"
                    value={invoiceData.discount}
                    onChange={handleChange}
                    name="discount"
                    className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="w-full border rounded-2xl p-2 grid gap-4">
              <div className="flex justify-between">
                <h4 className="uppercase text-xm">Items</h4>
                <span className="bg-blue-400 border border-blue-800 size-8 rounded-full flex justify-center items-center text-white">
                  {totalItem}
                </span>
              </div>
              <div className="grid  gap-4">
                <input
                  type="text"
                  placeholder="Product"
                  value={itemsData.product}
                  onChange={handleItemChange}
                  name="product"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
                <input
                  type="text"
                  placeholder="Discription"
                  value={itemsData.discription}
                  onChange={handleItemChange}
                  name="discription"
                  className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={itemsData.quantity}
                    onChange={handleItemChange}
                    name="quantity"
                    className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={itemsData.amount}
                    onChange={handleItemChange}
                    name="amount"
                    className="p-2 rounded-lg w-full placeholder:text-sm text-sm"
                  />
                  <p className="p-2 rounded-lg border border-primary w-full placeholder:text-sm text-sm h-10 flex justify-start items-center">
                    {itemsData.quantity * itemsData.amount}
                  </p>
                </div>
              </div>
              <button
                className="bg-darkGray text-white text-sm p-4 rounded-full"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={handleCreateInvoice}
              className="bg-primary text-white p-4 rounded-full px-20"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
