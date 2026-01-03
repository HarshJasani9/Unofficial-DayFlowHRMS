import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Briefcase, MapPin, Phone, Save, X, Edit2, Camera } from 'lucide-react';

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null); // The File
  const [previewUrl, setPreviewUrl] = useState('');       // The Preview

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/employees/me', {
          headers: { Authorization: `Bearer ${token}` }
      });
      if(response.data.success) {
          const emp = response.data.employee;
          setEmployee(emp);
          setPhoneNumber(emp.phoneNumber || '');
          setAddress(emp.address || '');
      }
    } catch (error) {
      console.error("Fetch Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  // Handle File Selection
  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if(file) {
          setProfileImage(file);
          setPreviewUrl(URL.createObjectURL(file)); // Create local preview URL
      }
  };

  const handleUpdate = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // USE FORMDATA (Required for Files)
        const formData = new FormData();
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        if(profileImage) {
            formData.append('image', profileImage);
        }

        await axios.put('http://localhost:5000/api/auth/employees/me', formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' // Crucial Header
            }
        });
        
        setIsEditing(false);
        fetchProfile(); // Refresh to see server changes
        alert("Profile Updated!");
      } catch (error) {
        alert("Update Failed");
      }
  };

  if(loading) return <div>Loading...</div>;
  if(!employee) return <div>Profile Not Found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
       <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h1>
           {!isEditing ? (
             <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg text-gray-600 hover:text-primary shadow-sm">
                <Edit2 size={16} /> Edit Profile
             </button>
           ) : (
             <div className="flex gap-2">
                <button onClick={handleUpdate} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-sm"><Save size={16} /> Save</button>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg"><X size={16} /> Cancel</button>
             </div>
           )}
       </div>
       
       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-indigo-400"></div>
          <div className="px-8 pb-8">
             <div className="relative -mt-12 mb-6 flex items-end gap-6">
                 
                 {/* PROFILE IMAGE & EDIT OVERLAY */}
                 <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : employee.userId.profileImage ? (
                            <img src={`http://localhost:5000/uploads/${employee.userId.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                                {employee.userId.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    
                    {/* Camera Icon - Only visible when editing */}
                    {isEditing && (
                        <label className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50 text-primary">
                            <Camera size={20} />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    )}
                 </div>

                 <div className="mb-2">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{employee.userId.name}</h2>
                    <p className="text-gray-500">{employee.designation}</p>
                 </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <h3 className="font-bold border-b pb-2">Employment Details</h3>
                   <div className="flex gap-3 text-gray-600"><User size={18}/> Emp ID: {employee.employeeId}</div>
                   <div className="flex gap-3 text-gray-600"><Briefcase size={18}/> Dept: {employee.department}</div>
                   <div className="flex gap-3 text-gray-600"><Mail size={18}/> {employee.userId.email}</div>
                </div>

                <div className="space-y-4">
                   <h3 className="font-bold border-b pb-2">Contact Details</h3>
                   <div>
                       <div className="flex gap-3 text-gray-600 mb-1"><Phone size={18}/> <span>Phone</span></div>
                       {isEditing ? (
                           <input type="text" className="w-full p-2 border rounded" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                       ) : ( <p className="ml-8 font-medium">{phoneNumber || "Not Set"}</p> )}
                   </div>
                   <div>
                       <div className="flex gap-3 text-gray-600 mb-1"><MapPin size={18}/> <span>Address</span></div>
                       {isEditing ? (
                           <input type="text" className="w-full p-2 border rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
                       ) : ( <p className="ml-8 font-medium">{address || "Not Set"}</p> )}
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default EmployeeProfile;