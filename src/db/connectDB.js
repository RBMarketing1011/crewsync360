import mongoose from 'mongoose'

let connected = false

const connectDB = async () =>
{
  mongoose.set('strictQuery', true)

  // If DB is already connected, don't connect again
  if (connected)
  {
    console.log('Previous DB Connected')
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
    console.log('DB Connected')
  } catch (error)
  {
    console.log('DB Connection Error:', error)
  }
}

export default connectDB