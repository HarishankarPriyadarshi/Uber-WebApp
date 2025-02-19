import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10368000 // 120 days in seconds
    }
});
const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema)
export default BlacklistToken