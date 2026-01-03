import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD (to prevent multiple entries per day)
  status: { type: String, enum: ["Present", "Absent", "Half Day", "Leave"], default: "Absent" },
  loginTime: { type: String, default: null }, // Store as "09:30 AM"
  logoutTime: { type: String, default: null }, // Store as "06:00 PM"
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;