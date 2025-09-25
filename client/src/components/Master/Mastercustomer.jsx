import React, { useState, useEffect, useRef } from "react";
import "./Mastercustomer.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_SERVER_URL } from "../../Config/Config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MasterCustomer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customers, setCustomers] = useState([]);

  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [submitted, setSubmitted] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
   const validName = /^[a-zA-Z0-9\s]+$/;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${BACKEND_SERVER_URL}/api/customers`);
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setCustomerName("");
    setPhoneNumber("");
    setAddress("");
    setErrors({ name: "", phone: "" });
    setTouched({ name: false, phone: false });
    setSubmitted(false);
    // single, programmatic focus to avoid autoFocus/blur loops
    setTimeout(() => nameRef.current?.focus(), 0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateField = (field, value) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) error = "Customer name is required.";
    }
    if (field === "phone") {
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Phone number must be 10 digits.";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const validateForm = () => {
    const nameValid = validateField("name", customerName);
    const phoneValid = validateField("phone", phoneNumber);
    return nameValid && phoneValid;
  };

  const handleSaveCustomer = async () => {
    setSubmitted(true); // gate showing errors on untouched fields

    // compute validity synchronously for focusing logic
    const nameOk = customerName.trim().length > 0;
    const phoneOk = /^\d{10}$/.test(phoneNumber.trim());

    if (!validateForm()) {
      if (!nameOk) {
        nameRef.current?.focus();
      } else if (!phoneOk) {
        phoneRef.current?.focus();
      }
      return;
    }
   

    if (!validName.test(customerName.trim())) {
      toast.warn("Special characters are not allowed.", { autoClose: 2000 });
      return;
    }

    const customerData = {
      name: customerName.trim(),
      phone: phoneNumber.trim(),
      address: address.trim(),
    };

    try {
      const response = await fetch(
        `${BACKEND_SERVER_URL}/api/customers/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerData),
        }
      );

      if (response.ok) {
        const newCustomer = await response.json();
        setCustomers((prev) => [...prev, newCustomer]);
        toast.success("Customer added successfully!");
        closeModal();
      } else {
        const err = await response.json();
        toast.error(err.message);
      }
    } catch (error) {
      console.error("Error saving customer:", error);
      toast.error(error.response.data.message, { autoClose: 1000 });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(
          `${BACKEND_SERVER_URL}/api/customers/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setCustomers(customers.filter((customer) => customer.id !== id));
          toast.success("Customer deleted successfully!");
        } else {
          const errorData = await response.json();
          console.error("Delete failed:", errorData);
          toast.error("Failed to delete customer.");
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error("Error deleting customer.");
      }
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setEditedData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    });
  };

  const handleUpdate = async () => {
  
    if (!validName.test(editedData.name.trim())) {
      toast.warn("Special characters are not allowed.", { autoClose: 2000 });
      return;
    }
    
    try {
      const response = await fetch(
        `${BACKEND_SERVER_URL}/api/customers/${editCustomer.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
        setEditCustomer(null);
        toast.success("Customer updated successfully!");
      } else {
        console.error("Failed to update customer");
        toast.error("Failed to update customer.");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Error updating customer.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar />

      <div className="customer-container">
        <Button
          style={{
            backgroundColor: "#F5F5F5",
            color: "black",
            borderColor: "#25274D",
            borderStyle: "solid",
            borderWidth: "2px",
          }}
          variant="contained"
          onClick={openModal}
        >
          Add Customer
        </Button>

        {/* Turn off Dialog's auto focus to avoid initial blur shenanigans */}
        <Dialog open={isModalOpen} onClose={closeModal} disableAutoFocus>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogContent>
            {/* Customer Name */}
            <TextField
              inputRef={nameRef}
              margin="dense"
              label="Customer Name"
              autoComplete="off"
              type="text"
              fullWidth
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (touched.name || submitted)
                  validateField("name", e.target.value);
              }}
              onBlur={(e) => handleBlur("name", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  phoneRef.current?.focus();
                }
              }}
              error={(touched.name || submitted) && !!errors.name}
              helperText={touched.name || submitted ? errors.name : ""}
            />

            {/* Phone Number */}
            <TextField
              inputRef={phoneRef}
              margin="dense"
              label="Phone Number"
              type="tel"
              fullWidth
              autoComplete="off"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (touched.phone || submitted)
                  validateField("phone", e.target.value);
              }}
              onBlur={(e) => handleBlur("phone", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addressRef.current?.focus();
                }
              }}
              error={(touched.phone || submitted) && !!errors.phone}
              helperText={touched.phone || submitted ? errors.phone : ""}
            />

            {/* Address (optional) */}
            <TextField
              inputRef={addressRef}
              margin="dense"
              label="Address"
              autoComplete="off"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSaveCustomer();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveCustomer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {customers.length > 0 && (
          <Paper>
            <table width="100%" className="customer-table">
              <thead>
                <tr className="customer-tablehead">
                  <th>S.no</th>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="customer-tablebody">
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address || "-"}</td>
                    <td>
                      <Tooltip title="Edit Customer">
                        <IconButton onClick={() => handleEdit(customer)}>
                          <EditIcon color="secondary" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Customer">
                        <IconButton onClick={() => handleDelete(customer.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        )}
      </div>

      <Dialog open={!!editCustomer} onClose={() => setEditCustomer(null)}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedData.name}
            onChange={(e) =>
              setEditedData({ ...editedData, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={editedData.phone}
            onChange={(e) =>
              setEditedData({ ...editedData, phone: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={editedData.address}
            onChange={(e) =>
              setEditedData({ ...editedData, address: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCustomer(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MasterCustomer;
