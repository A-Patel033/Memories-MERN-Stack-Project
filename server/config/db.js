import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoConnection = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`Mongodb Connected successfully 👌:${mongoConnection.connection.host} `);
    } catch (error) {
        console.log(`Error ${error}`, error.message);
        process.exit(1);
    }
}

export default connectDB;