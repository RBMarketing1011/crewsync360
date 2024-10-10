import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import User from '@db/models/user'

import { logger } from '@lib/helpers/winston/logger'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createCustomerAndSetupIntent = async (req) =>
{
  const { email, name } = await req.json() // collect necessary info from the request

  try
  {

    await connectDB()
    const user = await User.findOne({ email })
    const account = await CompanyAccount.findOne({ owner: user._id })
    let customer

    if (!account)
    {
      throw new Error('Account not found')
    } else
    {
      if (account?.stripe?.id)
      {
        customer = await stripe.customers.retrieve(account.stripe.customerId)
      } else
      {
        // Step 3: If no customer exists, create a new one
        customer = await stripe.customers.create({
          email,
          name,
        })

        account.stripe.customerId = customer.id
        await account.save()
      }
    }

    // Create a setup intent to save their payment method for future use
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: [ 'card' ],
    })

    return Response.json(
      {
        clientSecret: setupIntent.client_secret,
        customerId: customer.id
      },
      { status: 200 }
    )

  } catch (error)
  {
    logger.error(error.message)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { createCustomerAndSetupIntent as POST }
