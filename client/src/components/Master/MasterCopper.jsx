import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MasterCopper.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { BACKEND_SERVER_URL } from "../../Config/Config";

const MasterCopper = () => {
  const [copper, setCopper] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newCopper,setNewCopper]=useState("")
   // Regex:numbers, spaces allowed
  const validName = /^[0-9\s]+$/;

  useEffect(() => {
    fetchCopper();
  }, []);

  const fetchCopper = async () => {
    try {
      const res = await axios.get(`${BACKEND_SERVER_URL}/api/copper`);
      setCopper(res.data.copper);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  const handleAddCopper = async () => {
    if (newCopper.trim()) {

      if (!validName.test(newCopper.trim())) {
        toast.warn("Only positive Numbers", { autoClose: 2000 });
        return;
      }

      try {
        const response=await axios.post(`${BACKEND_SERVER_URL}/api/copper`, {
          copper: newCopper,
        });
        setNewCopper("");
        fetchCopper();
        toast.success(response.data.message);
      } catch (err) {
        console.error("Failed to add copper", err);
        toast.error(err.response?.data?.msg || "Something went wrong", {
          autoClose: 2000,
        });
      }
    } else {
      toast.warn("Please enter Copper Value.");
    }
  };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       try {
//         await axios.delete(`${BACKEND_SERVER_URL}/api/master-items/${id}`);
//         toast.success("Item deleted successfully!");
//         fetchItems();
//       } catch (err) {
//         console.error("Failed to delete item", err);
//         toast.error("Failed to delete item. Please try again.");
//       }
//     }
//   };

  const handleEdit = (id, currentName) => {
    setEditItemId(id);
    setEditValue(currentName);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditValue("");
  };

  const handleSaveEdit = async (id) => {
    if (!editValue.trim()) {
      toast.warn("Copper value cannot be empty.");
      return;
    }
     if (!validName.test(editValue.trim())) {
        toast.warn("Only positive Numbers.", { autoClose: 2000 });
        return;
      }
    try {
      const response=await axios.put(`${BACKEND_SERVER_URL}/api/copper/${id}`, {
        copper:editValue.trim(),
      });
      toast.success(response.data.message);
      setEditItemId(null);
      setEditValue("");
      fetchCopper();
    } catch (err) {
      console.error("Failed to update item", err);
      toast.error(err.response?.data?.msg || "Something went wrong", {
          autoClose: 2000,
        });
    }
  };

  return (
    <>
      <div className="mastercopper-container">
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

        {/* Add Item Form */}
        <div className="add-copper-form">
          <h2 style={{ textAlign: "center" }}>Add Copper</h2>
          <label>Copper Value:</label>
          <input
            type="text"
            value={newCopper}
            onChange={(e) => setNewCopper(e.target.value)}
            placeholder="Enter Copper Value"
          />
          <button onClick={handleAddCopper}>Add Copper</button>
        </div>

        {/* Item List */}
        <div className="copper-list">
          <h2 style={{ textAlign: "center" }}>Copper Total Stock</h2>
          {copper.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>SI.No</th>
                  <th>Copper Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {copper.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editItemId === item.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          style={{ width: "90%", padding: "4px" }}
                        />
                      ) : (
                        item.copperTotal
                      )}
                    </td>
                    <td>
                    {editItemId === item.id ? (
                      <>
                        <button
                          style={{
                            marginRight: "5px",
                            background: "#4CAF50",
                            color: "#fff",
                            padding: "4px 8px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSaveEdit(item.id)}
                        >
                          Save
                        </button>
                        <button
                          style={{
                            background: "#f44336",
                            color: "#fff",
                            padding: "4px 8px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <EditIcon
                          style={{ cursor: "pointer", marginRight: "10px", color: "#388e3c" }}
                          onClick={() => handleEdit(item.id, item.copperTotal)}
                        />
                        {/* <DeleteIcon
                          style={{ cursor: "pointer", color: "#d32f2f" }}
                          onClick={() => handleDelete(item.id)}
                        /> */}
                      </>
                    )}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Copper added</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MasterCopper;
