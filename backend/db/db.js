import mongoose from "mongoose";
import colors from "colors"

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_CONNECT)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log("mongoDB connection failed", error)
        process.exit(1)
    }
}

export default connectToDb;