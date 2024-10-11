import fs from 'fs'
import path from 'path'
import connectDB from '@db/connectDB'
import User from '@db/models/user'
import { clientLog } from '@lib/helpers/winston/clientLog'

const uploadImageandSaveToUser = async (req, { params }) =>
{
  try
  {
    // Parse the request body
    const { image } = await req.json() // Use await req.json() to get the image data

    if (!image)
    {
      return Response.json({ error: 'No image provided.' }, { status: 400 })
    }

    // Remove the prefix "data:image/jpeg;base64," (or similar) to get the base64 string
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Get accountId and userId from the URL parameters
    const { accountId, userId } = params

    // Create the base directory path
    const dir = path.join(process.cwd(), 'public', 'uploads', accountId, 'images', 'profilepic')

    // Log the directory path
    console.log(`Directory to be created: ${ dir }`)

    // Create the directory if it does not exist
    if (!fs.existsSync(dir))
    {
      console.log(`Creating directory: ${ dir }`)
      fs.mkdirSync(dir, { recursive: true }) // Create directories recursively
    }

    // Define the filename with .png extension
    const filename = `${ userId }.png`
    const filePath = path.join(dir, filename)

    // Write the image file
    console.log(`Writing file to: ${ filePath }`)
    fs.writeFileSync(filePath, buffer) // Using synchronous method for simplicity

    // Save the image path to the user's profile
    const imagePath = `/uploads/${ accountId }/images/profilepic/${ filename }`
    await connectDB() // Connect to your database
    await User.findByIdAndUpdate(userId, { image: imagePath }) // Update user record in your database

    return Response.json(
      { success: 'Image uploaded and user record updated successfully.' },
      { status: 200 }
    )

  } catch (error)
  {
    clientLog(error) // Log the error
    console.error(`Error: ${ error.message }`) // Log error message to console
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { uploadImageandSaveToUser as POST };

