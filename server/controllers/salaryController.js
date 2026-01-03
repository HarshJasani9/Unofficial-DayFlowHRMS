import Salary from '../models/Salary.js';
import Employee from '../models/Employee.js';

// 1. ADD SALARY (Admin Only)
const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        // Calculate Net Salary
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();
        res.status(200).json({ success: true, message: "Salary Added Successfully" });

    } catch (error) {
        res.status(500).json({ success: false, error: "Salary Addition Failed" });
    }
};

// 2. GET SALARY (Admin: All / Employee: Own)
const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        let salary;

        // If 'id' is passed in URL (Admin viewing specific employee)
        if (req.params.id) {
             salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
        } 
        // Admin viewing ALL records (Dashboard)
        else {
             salary = await Salary.find().populate({
                path: 'employeeId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
             });
        }
        
        res.status(200).json({ success: true, salary });
    } catch (error) {
        res.status(500).json({ success: false, error: "Fetch Failed" });
    }
};

// 3. GET SALARY FOR LOGGED IN EMPLOYEE
const getEmployeeSalary = async (req, res) => {
    try {
        const employee = await Employee.findOne({ userId: req.user._id });
        const salary = await Salary.find({ employeeId: employee._id }).sort({ payDate: -1 });
        res.status(200).json({ success: true, salary });
    } catch (error) {
        res.status(500).json({ success: false, error: "Fetch Failed" });
    }
}

export { addSalary, getSalary, getEmployeeSalary };