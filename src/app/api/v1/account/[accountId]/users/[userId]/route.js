import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import User from '@db/models/user'
import encryptPw from '@lib/encrypt/encryptPw'

import fs from 'fs'
import path from 'path'

const MAX_FILE_SIZE = 100 * 1024 // 100 KB (adjust the size as needed)
const ALLOWED_IMAGE_TYPES = [ 'image/jpeg', 'image/png', 'image/webp' ]

const getUserInAccount = async (req, { params }) =>
{
  const { accountId, userId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('users')
    const user = account.users.find(user => user._id == userId)

    if (!user) throw new Error('User not found in account')

    return Response.json({ success: user }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// const updateUserInAccount = async (req, { params }) =>
// {
//   const { accountId, userId } = params
//   const { firstname, lastname, email, password, role, phone, image, bio } = await req.json()

//   const hashPw = password && await encryptPw(password)

//   try
//   {
//     await connectDB()
//     const account = await CompanyAccount.findById(accountId)
//     const user = await User.findById(userId)

//     if (!account || !user) throw new Error('Account or User not found')

//     const userInAccount = account.users.find(user => user._id == userId)
//     const userIsOwner = account.owner == userId

//     if (!userInAccount && !userIsOwner) throw new Error('User not found in account')

//     user.firstname = firstname ?? user.firstname
//     user.lastname = lastname ?? user.lastname
//     user.email = email ?? user.email
//     user.password = hashPw ?? user.password
//     user.role = role ?? user.role
//     user.phone = phone ?? user.phone
//     user.image = image ?? user.image
//     user.bio = bio ?? user.bio

//     await user.save()

//     console.log(user)

//     return Response.json({ success: 'User updated' }, { status: 200 })

//   } catch (error)
//   {
//     return Response.json({ error: error.message }, { status: 500 })
//   }
// }

// const updateUserInAccount = async (req, { params }) =>
// {
//   const { accountId, userId } = params
//   const { firstname, lastname, email, password, role, phone, image, bio } = await req.json()

//   const hashPw = password && await encryptPw(password)

//   try
//   {
//     await connectDB()
//     const account = await CompanyAccount.findById(accountId)
//     const user = await User.findById(userId)

//     if (!account || !user) throw new Error('Account or User not found')

//     const userInAccount = account.users.find(user => user._id == userId)
//     const userIsOwner = account.owner == userId

//     if (!userInAccount && !userIsOwner) throw new Error('User not found in account')

//     // Update fields
//     user.firstname = firstname ?? user.firstname
//     user.lastname = lastname ?? user.lastname
//     user.email = email ?? user.email
//     user.password = hashPw ?? user.password
//     user.role = role ?? user.role
//     user.phone = phone ?? user.phone
//     user.bio = bio ?? user.bio

//     // If image data is provided (data:image format), validate and save it to the /uploads folder
//     if (image && image.startsWith('data:image'))
//     {
//       // Extract the content type and base64 data
//       const [ header, base64Data ] = image.split(';base64,')
//       const fileType = header.split(':')[ 1 ] // Extract file type, e.g., "image/jpeg"

//       // Check if the file type is allowed
//       if (!ALLOWED_IMAGE_TYPES.includes(fileType))
//       {
//         throw new Error('Invalid image type. Only JPEG, PNG, and WebP are allowed.')
//       }

//       // Check the file size (since base64 encoding inflates the size by ~33%, we calculate accordingly)
//       const imageBuffer = Buffer.from(base64Data, 'base64')
//       const fileSize = imageBuffer.length
//       if (fileSize > MAX_FILE_SIZE)
//       {
//         throw new Error('Image size too large. Maximum allowed size is 100KB.')
//       }

//       // Define the file extension
//       const fileExtension = fileType.split('/')[ 1 ] // Extract file extension (e.g., jpeg, png, webp)
//       const fileName = `${ userId }.${ fileExtension }` // Define the file name
//       const filePath = path.join(process.cwd(), 'public/uploads', fileName)

//       // Save the image file to the /public/uploads folder
//       fs.writeFileSync(filePath, base64Data, { encoding: 'base64' })

//       // Update the image URL in the user object
//       user.image = `/uploads/${ fileName }`
//     }

//     await user.save()

//     console.log(user)

//     return Response.json({ success: 'User updated' }, { status: 200 })
//   } catch (error)
//   {
//     console.error(error)
//     return Response.json({ error: error.message }, { status: 500 })
//   }
// }


const updateUserInAccount = async (req, { params }) =>
{
  const { accountId, userId } = params

  const {
    firstname,
    lastname,
    email,
    password,
    role,
    hasLoggedIn,
    phone,
    image,
    bio,
    theme,
    pushNotifications,
    notifications
  } = await req.json()

  const hashPw = password && await encryptPw(password)

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)
    const user = await User.findById(userId)

    if (!account || !user) throw new Error('Account or User not found')

    const userInAccount = account.users.find(user => user._id == userId)
    const userIsOwner = account.owner == userId

    if (!userInAccount && !userIsOwner) throw new Error('User not found in account')

    // Update fields
    user.firstname = firstname ?? user.firstname
    user.lastname = lastname ?? user.lastname
    user.email = email ?? user.email
    user.password = hashPw ?? user.password
    user.role = role ?? user.role
    user.hasLoggedIn = hasLoggedIn ?? user.hasLoggedIn
    user.phone = phone ?? user.phone
    user.bio = bio ?? user.bio
    user.theme = theme ?? user.theme
    user.pushNotifications = pushNotifications ?? user.pushNotifications
    user.notifications = notifications ?? user.notifications

    // If image data is provided (data:image format), validate and save it to the /uploads folder
    if (image && image.startsWith('data:image'))
    {
      const [ header, base64Data ] = image.split(';base64,')
      const fileType = header.split(':')[ 1 ] // Extract file type, e.g., "image/jpeg"

      // Check if the file type is allowed
      if (!ALLOWED_IMAGE_TYPES.includes(fileType))
      {
        throw new Error('Invalid image type. Only JPEG, PNG, and WebP are allowed.')
      }

      // Check the file size (since base64 encoding inflates the size by ~33%, we calculate accordingly)
      const imageBuffer = Buffer.from(base64Data, 'base64')
      const fileSize = imageBuffer.length
      if (fileSize > MAX_FILE_SIZE)
      {
        throw new Error('Image size too large. Maximum allowed size is 100KB.')
      }

      // Define the file extension
      const fileExtension = fileType.split('/')[ 1 ] // Extract file extension (e.g., jpeg, png, webp)
      const fileName = `${ userId }.${ fileExtension }` // Define the new file name
      const filePath = path.join(process.cwd(), 'public/uploads', fileName)

      // Check if there's an existing image and delete it
      if (user.image)
      {
        const oldImagePath = path.join(process.cwd(), 'public/uploads', path.basename(user.image))
        if (fs.existsSync(oldImagePath))
        {
          fs.unlinkSync(oldImagePath) // Delete the old image
        }
      }

      // Save the new image file to the /public/uploads folder
      fs.writeFileSync(filePath, base64Data, { encoding: 'base64' })

      // Update the image URL in the user object
      user.image = `/uploads/${ fileName }`
    }

    await user.save()

    return Response.json({ success: 'User updated' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const deleteUserInAccount = async (req, { params }) =>
{
  const { accountId, userId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)
    const user = await User.findById(userId)

    if (!account || !user) throw new Error('Account or User not found')

    const userInAccount = account.users.find(user => user._id == userId)

    if (!userInAccount) throw new Error('User not found in account')

    await User.findByIdAndDelete(userId)

    return Response.json({ success: 'User deleted' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getUserInAccount as GET, updateUserInAccount as PUT, deleteUserInAccount as DELETE }