import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    // States
    const [name, setName] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    // Image States
    const [profileImage, setProfileImage] = useState(null); // File
    const [previewUrl, setPreviewUrl] = useState('');       // Preview
    const [currentImage, setCurrentImage] = useState('');   // Server Image Name

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/auth/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if(response.data.success) {
                    const emp = response.data.employee;
                    setName(emp.userId.name);
                    setMaritalStatus(emp.maritalStatus);
                    setDesignation(emp.designation);
                    setDepartment(emp.department);
                    setSalary(emp.salary);
                    setAddress(emp.address || '');
                    setPhoneNumber(emp.phoneNumber || '');
                    setCurrentImage(emp.userId.profileImage); // Store existing image
                }
            } catch (error) {
                alert("Error Fetching Data");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            // Append all fields
            formData.append('name', name);
            formData.append('maritalStatus', maritalStatus);
            formData.append('designation', designation);
            formData.append('department', department);
            formData.append('salary', salary);
            formData.append('address', address);
            formData.append('phoneNumber', phoneNumber);
            
            // Append Image if changed
            if(profileImage) {
                formData.append('image', profileImage);
            }

            const response = await axios.put(
                `http://localhost:5000/api/auth/employees/${id}`, 
                formData,
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' 
                    } 
                }
            );
            if(response.data.success) {
                alert("Employee Updated Successfully");
                navigate('/admin/employees');
            }
        } catch (error) {
            alert("Update Failed");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Employee Details</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Image Section */}
                <div className="md:col-span-2 flex flex-col items-center mb-4">
                     <div className="w-24 h-24 rounded-full border overflow-hidden mb-2 bg-gray-100">
                        {previewUrl ? (
                            <img src={previewUrl} className="w-full h-full object-cover" />
                        ) : currentImage ? (
                            <img src={`http://localhost:5000/uploads/${currentImage}`} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 font-bold text-xl">N/A</div>
                        )}
                     </div>
                     <label className="cursor-pointer text-primary hover:underline font-medium text-sm">
                        Change Photo
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                     </label>
                </div>

                <div>
                    <label className="block text-sm text-gray-500">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Department</label>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Designation</label>
                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Salary</label>
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Phone</label>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm text-gray-500">Marital Status</label>
                     <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-indigo-700">Update Employee</button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;