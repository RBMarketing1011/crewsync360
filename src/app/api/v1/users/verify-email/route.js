import connectDB from '@db/connectDB'
import VerificationToken from '@db/models/verification_tokens'
import User from '@db/models/user'
import { logger } from '@lib/helpers/winston/logger'

const verifyEmail = async (req) =>
{
  const { email, token } = await req.json()

  try
  {
    await connectDB()

    const user = await User.findOne({ email })
    const verifyToken = await VerificationToken.findOne({ identifier: email, token })

    if (!user)
    {
      return Response.json({ error: 'User not found.' }, { status: 404 })
    }

    if (!verifyToken)
    {
      return Response.json({ error: 'Invalid token.' }, { status: 400 })
    }

    if (new Date(verifyToken.expires) < new Date(Date.now()))
    {
      return Response.json({ error: 'Token expired.' }, { status: 400 })
    }

    await User.findByIdAndUpdate(user._id, { isEmailVerified: true })

    await VerificationToken.findByIdAndDelete(verifyToken._id)

    return Response.json({ success: 'Email Verified' }, { status: 200 })

  } catch (error)
  {
    logger.error(error)
    return Response.json({ error: 'An error occurred. Please try again later.' }, { status: 500 })
  }
}

export { verifyEmail as POST }