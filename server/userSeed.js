import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const userRegister = async () => {
    // Hardcoded URI to ensure connection works immediately
    const MONGO_URI = "mongodb+srv://dayflow_admin:dayflow-admin%401234@cluster0.vhlg87a.mongodb.net/?appName=Cluster0";

    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ DB Connected");

        // 1. DELETE EXISTING DATA (Clear the double-hashed user)
        await User.deleteMany({});
        console.log("🗑️ Old Users Deleted");

        // 2. CREATE NEW ADMIN (PASS PLAIN TEXT PASSWORD)
        // The User.js model will handle the hashing automatically!
        const newUser = new User({
            name: "Admin",
            email: "admin@dayflow.com",
            password: "admin", // <--- SENT AS PLAIN TEXT
            role: "admin",
            profileImage: ""
        });
        
        await newUser.save();
        console.log("✅ SUCCESS: Admin Account Created");
        console.log("🔑 Password is now correctly hashed once.");

    } catch (error) {
        console.log("❌ Error:", error);
    } finally {
        mongoose.connection.close();
    }
};

userRegister();