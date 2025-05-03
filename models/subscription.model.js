import mongoose from "mongoose";

const Subscriptionschema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Subscription is required"],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: String,
        required: [true, "Price is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\d+(\.\d{1,2})?$/, "Enter a valid price"], // For numbers like 10 or 10.99
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBS"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sport", "news", "entertainment"],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"]
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past"
        },
    },
    renewalDate: {
        type: Date,
        // required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: "Renewal date must be after start date"
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }
}, { timestamps: true });


//Auto-calculate renewal date if missing
Subscriptionschema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();

})

//Auto-update the stustus if renewal date has passed
// if (this.renewalDate < new Date()) {
//     this.status = "expired";

//     next();
// }

const Subscription = mongoose.model("Subscription", Subscriptionschema)

export default Subscription;
