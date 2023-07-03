const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true },
  department: {
    type: String,
    enum: ["Tech", "Marketing", "Operations"],
    default: "Tech",
    require: true,
  },
  salary: { type: Number, require: true },
  userId: { type: String, required: true },
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = { EmployeeModel };
