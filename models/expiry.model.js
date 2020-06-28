const mongoose = require("mongoose");
const Expiry = mongoose.model(
    "Expiry",
    new mongoose.Schema({
        expiryat: {
            type: Date
            },
        memoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Memo"
        }
    })
  );
  module.exports = Expiry;