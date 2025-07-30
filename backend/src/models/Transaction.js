// models/transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Virtual property to format date
transactionSchema.virtual("formattedDate").get(function () {
  return new Date(this.date).toLocaleDateString();
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
