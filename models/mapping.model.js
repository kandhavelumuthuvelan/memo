const mongoose = require("mongoose");

const Mapping = mongoose.model(
  "Mapping",
  new mongoose.Schema({
    username: String,
    memoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Memo"
      }
  })
);

module.exports = Mapping;