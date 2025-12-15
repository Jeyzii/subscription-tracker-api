import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'User Name is required' ],
        trim: true,
        minLength: [2, 'Name must be at least 2 characters long' ],
        maxLength: [50, 'Name cannot exceed 50 characters' ],
    },
    email: { 
        type: String, 
        required: [true, 'Email is required' ],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address' ],
        minLength: [5, 'Email must be at least 5 characters long' ],
        maxLength: [255, 'Email cannot exceed 255 characters' ],
    },
    password: { 
        type: String, 
        required: [true, 'Password is required' ],
        minLength: [8, 'Password must be at least 8 characters long' ],
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;