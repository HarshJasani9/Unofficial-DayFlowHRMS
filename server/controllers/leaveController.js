import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

// 1. ADD LEAVE (Employee)
const addLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;
        
        // Find Employee ID
        const employee = await Employee.findOne({ userId: req.user._id });

        // --- NEW: DATE VALIDATION LOGIC ---
        const today = new Date();
        today.setHours(0,0,0,0); // Ignore time, compare dates only
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start < today) {
            return res.status(400).json({ success: false, error: "Cannot apply for leave in the past." });
        }
        if (end < start) {
             return res.status(400).json({ success: false, error: "End date cannot be before start date." });
        }
        // ----------------------------------

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await newLeave.save();
        res.status(200).json({ success: true, message: "Leave Applied Successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: "Leave Application Failed" });
    }
};

// 2. GET LEAVES
const getLeaves = async (req, res) => {
    try {
        let leaves;
        if(req.user.role === 'admin') {
             leaves = await Leave.find().populate({
                path: 'employeeId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
             });
        } else {
             const employee = await Employee.findOne({ userId: req.user._id });
             leaves = await Leave.find({ employeeId: employee._id });
        }
        res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: "Fetch Failed" });
    }
};

// 3. GET SINGLE LEAVE DETAIL
const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id).populate({
            path: 'employeeId',
            populate: {
                path: 'userId',
                select: 'name profileImage'
            }
        });
        res.status(200).json({ success: true, leave });
    } catch (error) {
         res.status(500).json({ success: false, error: "Fetch Failed" });
    }
}

// 4. UPDATE LEAVE STATUS
const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminComment } = req.body; // Extract comment
        
        const leave = await Leave.findByIdAndUpdate(
            id, 
            { status, adminComment }, // Save comment
            { new: true }
        );
        
        if(!leave) {
            return res.status(404).json({ success: false, error: "Leave Not Found" });
        }
        res.status(200).json({ success: true, leave });

    } catch (error) {
        res.status(500).json({ success: false, error: "Update Failed" });
    }
}

// ... keep other exports
export { addLeave, getLeaves, getLeaveDetail, updateLeaveStatus };