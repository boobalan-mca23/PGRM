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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_SERVER_URL } from "../../Config/Config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import './MasterBullion.css'
function MasterBullion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bullionName, setBullionName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bullions, setBullions] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedBullion, setSelectedBullion] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });


  // Validation states
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [submitted, setSubmitted] = useState(false);

  // Refs for focus control
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => {
    const fetchBullions = async () => {
      try {
        const response = await fetch(`${BACKEND_SERVER_URL}/api/master-bullion`);
        if (response.ok) {
          const data = await response.json();
          setBullions(data);
        } else {
          console.error("Failed to fetch bullion data");
        }
      } catch (error) {
        console.error("Error fetching bullion data:", error);
      }
    };

    fetchBullions();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setBullionName("");
    setPhoneNumber("");
    setAddress("");
    setErrors({ name: "", phone: "" });
    setTouched({ name: false, phone: false });
    setSubmitted(false);
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const closeModal = () => setIsModalOpen(false);

  const validateField = (field, value) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) error = "Bullion name is required.";
      else if (!/^[a-zA-Z\s]+$/.test(value)) error = "Name should contain only letters.";
    }
    if (field === "phone") {
      const v = value.trim();
      if (!v) error = "Phone number is required.";
      else if (!/^\d{10}$/.test(v)) error = "Phone number must be 10 digits.";
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const validateForm = () => {
    const nameValid = validateField("name", bullionName);
    const phoneValid = validateField("phone", phoneNumber);
    return nameValid && phoneValid;
  };

  const handleSaveBullion = async () => {
    setSubmitted(true);

    const nameOk = bullionName.trim() && /^[a-zA-Z\s]+$/.test(bullionName);
    const phoneOk = /^\d{10}$/.test(phoneNumber.trim());

    if (!validateForm()) {
      if (!nameOk) {
        nameRef.current?.focus();
      } else if (!phoneOk) {
        phoneRef.current?.focus();
      }
      return;
    }

    const bullionData = {
      name: bullionName.trim(),
      phone: phoneNumber.trim(),
      address: address.trim() || null,
    };

    try {
      const response = await fetch(
        `${BACKEND_SERVER_URL}/api/master-bullion/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bullionData),
        }
      );

      if (response.ok) {
        const newBullion = await response.json();
        setBullions((prev) => [...prev, newBullion]);
        toast.success("Bullion added successfully!");
        closeModal();
      } else {
        const err = await response.json();
        toast.error("Error: " + err.message);
      }
    } catch (error) {
      console.error("Error saving bullion:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleEditClick = (bullion) => {
    setSelectedBullion(bullion);
    setFormData({
      name: bullion.name,
      phone: bullion.phone,
      address: bullion.address || "",
    });
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_SERVER_URL}/api/master-bullion/${selectedBullion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Bullion updated successfully");
        setBullions((prev) =>
          prev.map((b) =>
            b.id === selectedBullion.id ? { ...b, ...formData } : b
          )
        );
        setOpenEditDialog(false);
      } else {
        toast.error("Failed to update bullion");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating bullion");
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this bullion?")) {
      try {
        const response = await fetch(`${BACKEND_SERVER_URL}/api/master-bullion/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Bullion deleted successfully");
          setBullions((prev) => prev.filter((b) => b.id !== id));
        } else {
          toast.error("Failed to delete bullion");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Error deleting bullion");
      }
    }
  };


  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <div className="bullion-container">
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
          Add Bullion
        </Button>

        <Dialog open={isModalOpen} onClose={closeModal} disableAutoFocus>
          <DialogTitle>Add New Bullion</DialogTitle>
          <DialogContent>
            {/* Bullion Name */}
            <TextField
              inputRef={nameRef}
              margin="dense"
              label="Bullion Name"
              type="text"
              fullWidth
              value={bullionName}
              onChange={(e) => {
                setBullionName(e.target.value);
                if (touched.name || submitted) validateField("name", e.target.value);
              }}
              onBlur={(e) => handleBlur("name", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  phoneRef.current?.focus();
                }
              }}
              error={(touched.name || submitted) && !!errors.name}
              helperText={(touched.name || submitted) ? errors.name : ""}
              autoComplete="off"
            />

            {/* Phone Number */}
            <TextField
              inputRef={phoneRef}
              autoComplete="off"
              margin="dense"
              label="Phone Number"
              type="tel"
              fullWidth
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (touched.phone || submitted) validateField("phone", e.target.value);
              }}
              onBlur={(e) => handleBlur("phone", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addressRef.current?.focus();
                }
              }}
              error={(touched.phone || submitted) && !!errors.phone}
              helperText={(touched.phone || submitted) ? errors.phone : ""}
            />

            {/* Address */}
            <TextField
              inputRef={addressRef}
              autoComplete="off"
              margin="dense"
              label="Address (Optional)"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSaveBullion();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveBullion} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {bullions.length > 0 && (
          <Paper >
            <table className="bullion-table" width="100%">
              <thead>
                <tr className="bullion-tablehead">
                  <th>S.no</th>
                  <th>Bullion Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bullion-tablebody">
                {bullions.map((b, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{b.name}</td>
                    <td>{b.phone}</td>
                    <td>{b.address || "-"}</td>
                    <td>
                      <EditIcon
                        style={{ cursor: "pointer", marginRight: "10px", color: "#388e3c" }}
                        onClick={() => handleEditClick(b)}
                      />
                      <DeleteIcon
                        style={{ cursor: "pointer", color: "#d32f2f" }}
                        onClick={() => handleDeleteClick(b.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        )}

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Edit Bullion</DialogTitle>
  <DialogContent>
    <TextField
      label="Name"
      fullWidth
      margin="normal"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    <TextField
      label="Phone"
      fullWidth
      margin="normal"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    />
    <TextField
      label="Address"
      fullWidth
      margin="normal"
      value={formData.address}
      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
    <Button onClick={handleEditSubmit} variant="contained" color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

      </div>
    </>
  );
}

export default MasterBullion;
