import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import User from '@db/models/user'
import encryptPw from '@lib/encrypt/encryptPw'
import { uploadUserImage } from '@lib/helpers/fs/images/uploadUserImage'

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

    await user.save()

    // If image data is provided (data:image format), validate and save it to the /uploads folder

    if (image && image.startsWith('data:image'))
    {
      const upload = await uploadUserImage(accountId, userId, image)

      if (!upload) throw new Error('Error uploading image')
    }

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