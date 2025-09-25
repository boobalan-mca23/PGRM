
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customertrans.css";
import { useSearchParams } from "react-router-dom";
import { BACKEND_SERVER_URL } from "../../Config/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customertrans = () => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // "2025-09-16"

  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("id");
  const customerName = searchParams.get("name");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [goldRate, setGoldRate] = useState("");
  const [masterTouch,setMasterTouch]=useState([])
  const [newTransaction, setNewTransaction] = useState({
    date: formattedToday ,
    gold: "",
    type: "Select",
    amount: "",
    goldRate: "",
    touch: "",
    purity: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (customerId) {
          const response = await axios.get(
            `${BACKEND_SERVER_URL}/api/transactions/${customerId}`
          );
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to load transactions");
      }
    };

     const fetchTouch = async () => {
      try {
        const res = await axios.get(`${BACKEND_SERVER_URL}/api/master-touch`);
        console.log('masterTouch',res.data)
        setMasterTouch(res.data);
      } catch (err) {
        console.error("Failed to fetch touch values", err);
      }
    };
    fetchTouch();
    fetchTransactions();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedTransaction = { ...newTransaction, [name]: value };

    if (name === "amount" && updatedTransaction.type === "Cash") {
      updatedTransaction.value = value;
      if (goldRate) {
        const cash = parseFloat(value);
        const rate = parseFloat(goldRate);
        if (!isNaN(cash) && !isNaN(rate) && rate > 0) {
          updatedTransaction.purity = (cash / rate).toFixed(3);
        }
      }
    } else if (name === "gold" && updatedTransaction.type === "Gold") {
      updatedTransaction.value = value;
      const touch = parseFloat(updatedTransaction.touch);
      const gold = parseFloat(value);
      if (!isNaN(gold) && !isNaN(touch)) {
        updatedTransaction.purity = ((gold * touch) / 100).toFixed(3);
      }
    } else if (name === "touch" && updatedTransaction.type === "Gold") {
      const gold = parseFloat(updatedTransaction.gold);
      const touch = parseFloat(value);
      if (!isNaN(gold) && !isNaN(touch)) {
        updatedTransaction.purity = ((gold * touch) / 100).toFixed(3);
      }
    }

    setNewTransaction(updatedTransaction);
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!newTransaction.date || newTransaction.type === "Select") {
        throw new Error("Date and transaction type are required");
      }
      if(newTransaction.type==="Cash"){
        if(!newTransaction.amount || !goldRate){
          throw new Error("Cash value and goldRate are required");
        }
      }

       if(newTransaction.type==="Gold"){
        if(!newTransaction.gold || !newTransaction.touch){
          throw new Error("gold value and touch are required");
        }
      }

      if (!customerId) {
        throw new Error("Customer ID is missing");
      }

      const transactionData = {
        date: newTransaction.date,
        type: newTransaction.type,
        amount:parseFloat(newTransaction.amount)||0,
        gold: parseFloat(newTransaction.gold)||0,
        purity: parseFloat(newTransaction.purity),
        customerId: parseInt(customerId),
        goldRate: newTransaction.type === "Cash" ? parseFloat(goldRate) : 0,
        touch:
          newTransaction.type === "Gold"
            ? parseFloat(newTransaction.touch)
            : 0,
      };
      console.log('customer transacation payload',transactionData)
      const response = await axios.post(
        `${BACKEND_SERVER_URL}/api/transactions`,
        transactionData
      );

      setTransactions([...transactions, response.data]);
      resetForm();
      setShowPopup(false);
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error(error.message || "Error adding transaction");
    }
  };

  const resetForm = () => {
    setNewTransaction({
      date: formattedToday ,
    gold: "",
    type: "Select",
    amount: "",
    goldRate: "",
    touch: "",
    purity: "",
    });
    setError("");
    setGoldRate("");
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (!from || transactionDate >= from) && (!to || transactionDate <= to);
  });

  const totals = filteredTransactions.reduce(
    (acc, transaction) => {
      acc.totalPurity += parseFloat(transaction.purity) || 0;
      return acc;
    },
    { totalPurity: 0 }
  );

  return (
    <div className="customer-transactions">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>
        Customer Transactions{" "}
        {customerName && `for ${decodeURIComponent(customerName)}`}
      </h2>
      <br />
      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
      </div>

      <button onClick={() => setShowPopup(true)} className="add-btn">
        Add Transaction
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span
              className="popup-close"
              onClick={() => {
                resetForm();
                setShowPopup(false);
              }}
            >
              ×
            </span>

            <h3>Add Transaction</h3>
            <form>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={newTransaction.date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Type:
                <select
                  name="type"
                  value={newTransaction.type}
                  onChange={handleChange}
                  required
                >
                  <option value="Select">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Gold">Gold</option>
                </select>
              </label>

              {newTransaction.type === "Cash" && (
                <>
                  <label>
                    Cash Amount (₹):
                    <input
                      type="number"
                      name="amount"
                      value={newTransaction.amount}
                      onChange={handleChange}
                      step="0.01"
                      required
                    />
                  </label>
                  <label>
                    Gold Rate (₹/gram):
                    <input
                      type="number"
                      value={goldRate}
                      onChange={(e) => {
                        setGoldRate(e.target.value);
                        if (newTransaction.amount) {
                          const cash = parseFloat(newTransaction.amount);
                          const rate = parseFloat(e.target.value);
                          if (!isNaN(cash) && !isNaN(rate) && rate > 0) {
                            const updatedTransaction = { ...newTransaction };
                            updatedTransaction.purity = (cash / rate).toFixed(
                              3
                            );
                            setNewTransaction(updatedTransaction);
                          }
                        }
                      }}
                      step="0.01"
                      required
                    />
                  </label>
                  <label>
                    Purity (grams):
                    <input
                      type="number"
                      name="purity"
                      value={newTransaction.purity || ""}
                      readOnly
                    />
                  </label>
                </>
              )}

              {newTransaction.type === "Gold" && (
                <>
                  <label>
                    Gold Value (grams):
                    <input
                      type="number"
                      name="gold"
                      value={newTransaction.gold}
                      onChange={handleChange}
                      step="0.001"
                      required
                    />
                  </label>
                  <label>
                    Touch (%):
                    <select
                      value={newTransaction.touch}
                      onChange={handleChange}
                      name="touch"
                     >
                      <option value="">Select</option>
                      
                      {masterTouch.map((option)=>(
                        <option key={option.id} value={option.touch}>
                          {option.touch}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Purity (grams):
                    <input
                      type="number"
                      name="purity"
                      value={newTransaction.purity}
                      readOnly
                    />
                  </label>
                </>
              )}

              <div className="form-actions">
                <button type="button" className="save-btn" onClick={addTransaction}>
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    resetForm();
                    setShowPopup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="customerTrantable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Gold Rate</th>
            <th>Gold</th>
            <th>Purity (grams)</th>
            <th>Amount</th>
            <th>Touch</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString("en-GB")}</td>
              <td>{transaction.type}</td>
              <td>
                {transaction.goldRate}
              </td>
              <td>
                {transaction.gold}gr
              </td>
              <td>{transaction.purity.toFixed(3)}</td>
              <td> {transaction.amount}</td>
              <td>
                {transaction.type === "Gold" ? `${transaction.touch}%` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totals.totalPurity > 0 && (
        <div className="transaction-totals">
          <h3>Transaction Totals</h3>
          <div className="total-row">
            <span>Total Purity:</span>
            <span>{totals.totalPurity.toFixed(3)} g</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customertrans;