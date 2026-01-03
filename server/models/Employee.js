import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  
  // Personal Details
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: { type: String },
  salary: { type: Number, required: true },
  
  // NEW FIELDS (For Editable Profile)
  phoneNumber: { type: String, default: "" },
  address: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;