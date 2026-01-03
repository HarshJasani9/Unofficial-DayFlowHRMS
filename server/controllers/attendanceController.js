import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// 1. GET ATTENDANCE (Single Employee or All)
const getAttendance = async (req, res) => {
    try {
        const { date } = req.query;
        let query = {};

        // If date is provided, filter by date (for Admin daily view)
        if(date) {
            query.date = date;
        }

        // If not Admin, force filter by their own ID
        if(req.user.role !== 'admin') {
             const employee = await Employee.findOne({ userId: req.user._id });
             if(!employee) return res.status(404).json({success: false, error: "Employee Data Not Found"});
             query.employeeId = employee._id;
        }

        const attendance = await Attendance.find(query).populate({
            path: 'employeeId',
            populate: { path: 'userId', select: 'name email' }
        }).sort({ date: -1 });

        res.status(200).json({ success: true, attendance });

    } catch(error) {
        res.status(500).json({ success: false, error: "Error fetching attendance" });
    }
};

// 2. CLOCK IN / CLOCK OUT STATUS
const getTodayStatus = async (req, res) => {
    try {
        const employee = await Employee.findOne({ userId: req.user._id });
        const today = new Date().toISOString().split('T')[0];

        const attendance = await Attendance.findOne({ employeeId: employee._id, date: today });
        res.status(200).json({ success: true, attendance });
    } catch(error) {
        res.status(500).json({ success: false, error: "Error checking status" });
    }
}

// 3. MARK ATTENDANCE (Check-in / Check-out)
const updateAttendance = async (req, res) => {
    try {
        const { status } = req.body; // "clock-in" or "clock-out"
        const employee = await Employee.findOne({ userId: req.user._id });
        const today = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toLocaleTimeString();

        let attendance = await Attendance.findOne({ employeeId: employee._id, date: today });

        if(status === "clock-in") {
            if(attendance) {
                return res.status(400).json({ success: false, error: "Already Clocked In" });
            }
            // Create New Record
            attendance = new Attendance({
                employeeId: employee._id,
                date: today,
                status: "Present",
                loginTime: currentTime
            });
        } else if (status === "clock-out") {
            if(!attendance) {
                return res.status(400).json({ success: false, error: "You haven't clocked in yet!" });
            }
            // Update Logout Time
            attendance.logoutTime = currentTime;
        }

        await attendance.save();
        res.status(200).json({ success: true, message: "Attendance Updated" });

    } catch (error) {
        res.status(500).json({ success: false, error: "Update Failed" });
    }
};

export { getAttendance, getTodayStatus, updateAttendance };