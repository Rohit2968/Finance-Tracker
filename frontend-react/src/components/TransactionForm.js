import React, { useState } from "react";
import "./TransactionForm.css";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const [errors, setErrors] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "amount":
        if (!value) {
          error = "Amount is required";
        } else if (isNaN(value) || value <= 0) {
          error = "Please enter a valid positive number";
        }
        break;
      case "category":
        if (!value) {
          error = "Category is required";
        }
        break;
      case "description":
        if (!value) {
          error = "Description is required";
        }
        break;
      case "date":
        if (!value) {
          error = "Date is required";
        } else if (!isValidDate(value)) {
          error = "Please enter a valid date";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please fill in all required fields correctly");
      return;
    }
    console.log("Form submitted:", formData);
    // reset form
    setFormData({ amount: "", category: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleFormSubmit} className="transaction-form">
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className={errors.amount ? "error" : ""}
        />
        {errors.amount && <span className="error-message">{errors.amount}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={errors.category ? "error" : ""}
        />
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={errors.description ? "error" : ""}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className={errors.date ? "error" : ""}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <button type="submit" className="submit-button">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
