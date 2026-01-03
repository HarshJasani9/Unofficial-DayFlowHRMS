import User from '../models/User.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "Wrong Password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "10d" }
        );

        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role },
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            password,
            role: role || "employee",
            profileImage: ""
        });

        await newUser.save();
        res.status(201).json({ success: true, message: "Account Created Successfully" });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. VERIFY
const verify = (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
};

// 4. ADD EMPLOYEE
const addEmployee = async (req, res) => {
    try {
        const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        const newUser = new User({
            name,
            email,
            password: password || "123456",
            role: role || "employee",
            profileImage: ""
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });
        await newEmployee.save();

        res.status(201).json({ success: true, message: "Employee Created Successfully" });

    } catch (error) {
        console.error("Add Employee Error:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

// 5. GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', 'name email role profileImage');
        res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(500).json({ success: false, error: "Fetch Failed" });
    }
};

// 6. GET SINGLE EMPLOYEE
const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        let employee;

        if(id === "me") {
             employee = await Employee.findOne({ userId: req.user._id }).populate('userId', 'name email role profileImage');
        } else {
             employee = await Employee.findById(id).populate('userId', 'name email role profileImage');
        }
        
        if(!employee) return res.status(404).json({ success: false, error: "Employee Not Found" });
        res.status(200).json({ success: true, employee });

    } catch (error) {
        console.error("Get Employee Error:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

// 7. UPDATE EMPLOYEE
// ... existing imports

// Find the updateEmployee function and REPLACE it with this:
// ... existing imports

// ... existing imports

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maritalStatus, designation, department, salary, address, phoneNumber } = req.body;

        let employee;
        if(id === "me") {
             employee = await Employee.findOne({ userId: req.user._id });
        } else {
             employee = await Employee.findById(id);
        }

        if(!employee) return res.status(404).json({ success: false, error: "Employee Not Found" });

        // 1. UPDATE USER (Name & Profile Image)
        const user = await User.findById(employee.userId);
        if(user) {
            user.name = name || user.name;
            
            // IF FILE UPLOADED -> Update profileImage field
            if(req.file) {
                user.profileImage = req.file.filename; 
            }
            
            await user.save();
        }

        // 2. UPDATE EMPLOYEE DETAILS
        if(req.user.role === 'admin') {
            employee.maritalStatus = maritalStatus || employee.maritalStatus;
            employee.designation = designation || employee.designation;
            employee.department = department || employee.department;
            employee.salary = salary || employee.salary;
        }

        employee.address = address || employee.address;
        employee.phoneNumber = phoneNumber || employee.phoneNumber;

        await employee.save();
        res.status(200).json({ success: true, message: "Profile Updated Successfully" });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, error: "Update Failed" });
    }
};

// ... keep exports
export { login, register, verify, addEmployee, getEmployees, getEmployee, updateEmployee };