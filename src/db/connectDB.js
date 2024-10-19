import mongoose from 'mongoose'

let connected = false

const connectDB = async () =>
{
  mongoose.set('strictQuery', true)

  // If DB is already connected, don't connect again
  if (connected)
  {
    return
  }

  // Connect to DB
  try
  {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    connected = true
  } catch (error)
  {
    console.error('DB Connection Error:', error)
  }
}

export default connectDB