import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import User from '@db/models/user'
import Customer from '@db/models/customer'
import Job from '@db/models/job'

const getAccount = async (req, { params }) =>
{
  const { accountId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)

    if (!account) throw new Error('Account not found')

    return Response.json({ success: account }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const updateAccount = async (req, { params }) =>
{
  const { accountId } = params
  const {
    companyName, email, phone, companyAddress,
    website, description, billing
  } = await req.json()

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)

    if (!account)
    {
      return Response.json({ error: 'Account not found' }, { status: 404 })
    }

    const updateAccount = await CompanyAccount.findByIdAndUpdate(accountId, {
      companyName,
      email,
      phone,
      companyAddress,
      website,
      description,
      billing
    }, { new: true })

    if (!updateAccount)
    {
      return Response.json({ error: 'Account not updated' }, { status: 400 })
    }

    return Response.json({ success: 'Account updated' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const deleteAccount = async (req, { params }) =>
{
  const { accountId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)
    // Delete owner and all users, customers, and jobs associated with the account
    await User.findByIdAndDelete(account.owner._id)
    await User.deleteMany({ _id: { $in: account.users } }).catch((error) =>
    {
      throw new Error(error.message)
    })

    await Customer.deleteMany({ _id: { $in: account.customers } }).catch((error) =>
    {
      throw new Error(error.message)

    })

    await Job.deleteMany({ _id: { $in: account.jobs } }).catch((error) =>
    {
      throw new Error(error.message)
    })

    await CompanyAccount.findByIdAndDelete(accountId)

    if (!account) throw new Error('Account not found')

    return Response.json({ success: 'Account deleted successfully' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getAccount as GET, updateAccount as PUT, deleteAccount as DELETE }