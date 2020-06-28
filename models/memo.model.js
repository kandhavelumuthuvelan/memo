const mongoose = require("mongoose");
const Memo = mongoose.model(
    "Memo",
    new mongoose.Schema({
        taskName: {
            type: String,
            required: 'This field is required!'
            },
            memoId:{
                type: String,
                unique: true,
                required: true,
                index:true
            },
            status: {
                type: String
                },
    },
    { timestamps: { createdAt: 'created_at',updatedAt: 'updated_at' } }
    )
  );
  
  module.exports = Memo;