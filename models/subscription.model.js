import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required' ],
        trim: true,
        minLength: [2, 'Subscription Name must be at least 2 characters long' ],
        maxlength: [100, 'Subscription Name cannot exceed 100 characters' ],
    },
    price: {
        type: Number,
        required: [true, 'Price is required' ],
        min: [0, 'Price cannot be negative' ],
    },
    currency: {
        type: String,
        enum: ['PHP', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'],
        default: 'PHP',
        required: [true, 'Currency is required' ],
    },
    frequency: {
        type: String,
        enum: ['monthly', 'yearly', 'weekly', 'daily'],
        required: [true, 'Frequency is required' ],
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'Category is required' ],
        enum: ['Entertainment', 'Productivity', 'Health', 'Education', 'Utilities', 'Other'],
    },
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, 'Payment Method is required' ],
        enum: ['Credit Card', 'Debit Card', 'Gcash', 'PayPal', 'Bank Transfer', 'Cash', 'Other'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'canceled', 'paused', 'expired', 'trial'],
        default: 'active',
        required: [true, 'Status is required' ],
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required' ],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start Date cannot be in the future',
        }
    },
    renewalDate: {
    type: Date,
    validate: {
        validator: function (value) {
        return value > this.startDate;
        },
        message: 'Renewal Date must be after Start Date',
    },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required' ],
        index: true, 
    },
}, {
    timestamps: true,
});

//auto calculate renewalDate before saving
subscriptionSchema.pre('save', async function() {
    if(!this.renewalDate){
        const renewalPeriods = {
            'daily': 1,
            'weekly': 7,
            'monthly': 30,
            'yearly': 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;