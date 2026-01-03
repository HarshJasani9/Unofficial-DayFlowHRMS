import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import { 
  User, Briefcase, DollarSign, FileText, Mail, Phone, MapPin, 
  Camera, Save, X, Edit3, UploadCloud, CheckCircle, ArrowLeft
} from 'lucide-react';

const EmployeeProfile = () => {
  const { state } = useLocation(); // Retrieve passed data
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 
  
  // DETERMINE ROLE: 
  // If navigated from Admin List, role is 'admin'. Otherwise default to 'employee' (My Profile view)
  const viewerRole = state?.viewerRole || 'employee'; 
  const isViewedByAdmin = viewerRole === 'admin';

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Default Mock Data (Fallback)
  const defaultProfile = {
    firstName: 'Johnathon', lastName: 'Doe', email: 'john.doe@dayflow.com',
    phone: '+1 234 567 890', address: '1234 Broadway St, New York, NY',
    dob: '1990-08-15', gender: 'Male', nationality: 'American', maritalStatus: 'Single',
    employeeId: 'EMP-2023-001', department: 'Engineering', designation: 'Senior Developer',
    joiningDate: '2022-01-12', status: 'Full-Time', location: 'New York HQ', manager: 'Sarah Connor',
    basicSalary: 5000, hra: 2000, allowance: 1000, tax: 800, pf: 200, profileImage: null
  };

  // Initialize Profile State
  // If data was passed from EmployeeList, merge it. Otherwise use default.
  const [profile, setProfile] = useState(() => {
    if (state?.employeeData) {
      const emp = state.employeeData;
      // Split name for demo purposes
      const [first, ...last] = emp.name.split(' ');
      return {
        ...defaultProfile,
        firstName: first,
        lastName: last.join(' '),
        email: emp.email,
        employeeId: emp.id,
        department: emp.dept,
        designation: emp.role,
        status: emp.status,
        // Merge salary if exists in mock data
        ...(emp.salary || {}),
        // Merge other fields if they exist
        ...(emp.phone ? { phone: emp.phone } : {}),
        ...(emp.location ? { location: emp.location } : {}),
      };
    }
    return defaultProfile;
  });

  const netSalary = parseInt(profile.basicSalary) + parseInt(profile.hra) + parseInt(profile.allowance) - parseInt(profile.tax) - parseInt(profile.pf);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification({ ...notification, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    if (isFieldEditable('profilePic')) fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfile({ ...profile, profileImage: URL.createObjectURL(file) });
  };

  const handleSave = () => {
    setIsEditing(false);
    setNotification({ show: true, message: 'Profile updated successfully!' });
  };

  // --- STRICT REQUIREMENT LOGIC ---
  const isFieldEditable = (fieldName) => {
    // If Admin is viewing, they can edit EVERYTHING.
    if (isViewedByAdmin) return true; 
    
    // If Employee is viewing, restricted fields only.
    const allowedFieldsForEmployee = ['phone', 'address', 'profilePic'];
    return allowedFieldsForEmployee.includes(fieldName);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: <User size={18} /> },
    { id: 'job', label: 'Job Details', icon: <Briefcase size={18} /> },
    { id: 'salary', label: 'Salary Structure', icon: <DollarSign size={18} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={18} /> },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

      {/* Admin Navigation Header */}
      {isViewedByAdmin && (
        <button 
          onClick={() => navigate('/admin/employees')}
          className="flex items-center gap-2 text-gray-500 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Employee List
        </button>
      )}

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-24 right-6 z-50 animate-bounce-in">
          <div className="bg-gray-800 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]">
            <CheckCircle size={16} className="text-green-400" />
            <div>
              <h4 className="font-bold text-sm">Success</h4>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-8 relative">
        
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <Edit3 size={16} /> 
            {isViewedByAdmin ? 'Edit Employee' : 'Edit Profile'}
          </button>
        ) : (
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
              <X size={16} /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-indigo-700 rounded-lg shadow-lg">
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}

        {/* Profile Image */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
               {profile.profileImage ? (
                 <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover"/>
               ) : (
                 <span className="text-4xl font-bold text-gray-800 dark:text-white">
                   {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                 </span>
               )}
            </div>
          </div>
          
          {isEditing && isFieldEditable('profilePic') && (
            <div onClick={handleImageClick} className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Camera className="text-white" size={24} />
            </div>
          )}
        </div>
        
        <div className="text-center md:text-left space-y-2 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {profile.firstName} {profile.lastName}
            {isViewedByAdmin && <span className="ml-3 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full align-middle">Admin View</span>}
          </h1>
          <p className="text-lg text-primary font-medium">{profile.designation}</p>
          <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 mt-2">
            <span className="flex items-center gap-1 text-sm"><Mail size={16} /> {profile.email}</span>
            <span className="flex items-center gap-1 text-sm"><Phone size={16} /> {profile.phone}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-4 border-b border-gray-200 dark:border-gray-700 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm whitespace-nowrap relative
              ${activeTab === tab.id ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}
            `}
          >
            {tab.icon} {tab.label}
            {activeTab === tab.id && <span className="absolute bottom-[-5px] left-0 w-full h-1 bg-primary rounded-t-full"></span>}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[400px]">
        
        {/* --- PERSONAL DETAILS --- */}
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fade-in">
             <FormField label="First Name" name="firstName" value={profile.firstName} isEditing={isEditing} editable={isFieldEditable('firstName')} onChange={handleChange} />
             <FormField label="Last Name" name="lastName" value={profile.lastName} isEditing={isEditing} editable={isFieldEditable('lastName')} onChange={handleChange} />
             <FormField label="Date of Birth" name="dob" value={profile.dob} type="date" isEditing={isEditing} editable={isFieldEditable('dob')} onChange={handleChange} />
             <FormField label="Gender" name="gender" value={profile.gender} isEditing={isEditing} editable={isFieldEditable('gender')} onChange={handleChange} />
             <FormField label="Nationality" name="nationality" value={profile.nationality} isEditing={isEditing} editable={isFieldEditable('nationality')} onChange={handleChange} />
             <FormField label="Marital Status" name="maritalStatus" value={profile.maritalStatus} isEditing={isEditing} editable={isFieldEditable('maritalStatus')} onChange={handleChange} />
             <FormField label="Phone Number" name="phone" value={profile.phone} isEditing={isEditing} editable={isFieldEditable('phone')} onChange={handleChange} highlight={isEditing && isFieldEditable('phone')} />
             <FormField label="Current Address" name="address" value={profile.address} fullWidth isEditing={isEditing} editable={isFieldEditable('address')} onChange={handleChange} highlight={isEditing && isFieldEditable('address')} />
          </div>
        )}

        {/* --- JOB DETAILS --- */}
        {activeTab === 'job' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fade-in">
             <FormField label="Employee ID" name="employeeId" value={profile.employeeId} isEditing={isEditing} editable={isFieldEditable('employeeId')} onChange={handleChange} />
             <FormField label="Department" name="department" value={profile.department} isEditing={isEditing} editable={isFieldEditable('department')} onChange={handleChange} />
             <FormField label="Designation" name="designation" value={profile.designation} isEditing={isEditing} editable={isFieldEditable('designation')} onChange={handleChange} />
             <FormField label="Date of Joining" name="joiningDate" value={profile.joiningDate} type="date" isEditing={isEditing} editable={isFieldEditable('joiningDate')} onChange={handleChange} />
             <FormField label="Employment Status" name="status" value={profile.status} isEditing={isEditing} editable={isFieldEditable('status')} onChange={handleChange} />
             <FormField label="Work Location" name="location" value={profile.location} isEditing={isEditing} editable={isFieldEditable('location')} onChange={handleChange} />
             <FormField label="Reporting Manager" name="manager" value={profile.manager} isEditing={isEditing} editable={isFieldEditable('manager')} onChange={handleChange} />
          </div>
        )}

        {/* --- SALARY --- */}
        {activeTab === 'salary' && (
          <div className="animate-fade-in space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                   <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 tracking-wider">Earnings</h3>
                   <div className="space-y-3">
                      <FormField label="Basic Salary" name="basicSalary" value={profile.basicSalary} type="number" isEditing={isEditing} editable={isFieldEditable('basicSalary')} onChange={handleChange} compact />
                      <FormField label="HRA" name="hra" value={profile.hra} type="number" isEditing={isEditing} editable={isFieldEditable('hra')} onChange={handleChange} compact />
                      <FormField label="Allowance" name="allowance" value={profile.allowance} type="number" isEditing={isEditing} editable={isFieldEditable('allowance')} onChange={handleChange} compact />
                   </div>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                   <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 tracking-wider">Deductions</h3>
                   <div className="space-y-3">
                      <FormField label="Tax (TDS)" name="tax" value={profile.tax} type="number" isEditing={isEditing} editable={isFieldEditable('tax')} onChange={handleChange} compact />
                      <FormField label="Provident Fund" name="pf" value={profile.pf} type="number" isEditing={isEditing} editable={isFieldEditable('pf')} onChange={handleChange} compact />
                   </div>
                </div>
             </div>
             <div className="flex justify-between items-center p-6 bg-primary/10 border border-primary/20 rounded-xl">
                <span className="font-bold text-primary text-lg">Net Salary (Calculated)</span>
                <span className="font-bold text-primary text-2xl">${netSalary}</span>
             </div>
          </div>
        )}

        {/* --- DOCUMENTS --- */}
        {activeTab === 'documents' && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
             <DocumentCard title="Employment Contract.pdf" date="Jan 12, 2022" size="2.4 MB" />
             <DocumentCard title="Offer Letter.pdf" date="Jan 10, 2022" size="1.2 MB" />
             
             {isFieldEditable('documents') && (
               <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary cursor-pointer transition-colors h-24">
                 <UploadCloud size={24} />
                 <span className="text-xs font-medium mt-1">Upload New Document</span>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Reusable Components (Same as before) ---
const FormField = ({ label, name, value, type = "text", isEditing, editable, onChange, fullWidth, highlight, compact }) => (
  <div className={`${fullWidth ? 'col-span-1 md:col-span-2' : ''} ${compact ? 'flex justify-between items-center' : ''}`}>
    <label className={`block text-sm font-medium text-gray-500 dark:text-gray-400 ${compact ? 'mb-0' : 'mb-1.5'}`}>{label}</label>
    
    {isEditing && editable ? (
      <div className={`relative ${compact ? 'w-32' : 'w-full'}`}>
        <input 
          type={type} name={name} value={value} onChange={onChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all shadow-sm
            ${highlight ? 'border-primary ring-1 ring-primary/20' : 'border-gray-300 dark:border-gray-600'}
          `}
        />
        {highlight && !compact && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary opacity-50"><Edit3 size={14}/></span>}
      </div>
    ) : (
      <p className={`font-medium text-gray-800 dark:text-white ${compact ? '' : 'py-2 text-lg'} ${isEditing ? 'opacity-40 select-none' : ''}`}>
        {type === 'number' ? `$${value}` : value}
      </p>
    )}
  </div>
);

const DocumentCard = ({ title, date, size }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="p-2.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg"><FileText size={20} /></div>
        <div><p className="font-medium text-gray-800 dark:text-white">{title}</p><p className="text-xs text-gray-500 dark:text-gray-400">{date} • {size}</p></div>
     </div>
  </div>
);

export default EmployeeProfile;