import connectDB from '@db/connectDB'
import User from '@db/models/user'
import CompanyAccount from '@db/models/account'

import { logger } from '@lib/helpers/winston/logger'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const setDefaultPaymentMethod = async (req, res) =>
{
  const { paymentMethodId, customerId } = await req.json()

  try
  {
    // Attach the payment method to the customer (if it's not already attached)
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    })

    // Set the payment method as the default for invoices and subscriptions
    const customer = await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
      expand: [ 'invoice_settings.default_payment_method.card' ],
    })

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId, {
      expand: [ 'card' ],
    })

    // Calculate the future billing cycle anchor (14 days from now)
    const billingCycleAnchor = Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60 // Current time + 14 days

    // Create a subscription for the customer with a delayed start
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [ { price: 'price_1Q4TMDFZOYn0L7bTGqMXLJw2' } ], // Your price ID
      default_payment_method: paymentMethodId, // Set the default payment method
      billing_cycle_anchor: billingCycleAnchor, // Delay start by 14 days
      proration_behavior: 'none', // Do not prorate for the first invoice
    })

    // Update CompanyAccount with the new payment method
    await connectDB()
    const user = await User.findOne({ 'stripe.id': customerId })
    const account = await CompanyAccount.findOne({ owner: user._id })

    if (!account)
    {
      throw new Error('Account not found')
    } else
    {
      const cardInfo = {
        id: paymentMethodId,
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year,
        country: paymentMethod.card.country,
      }
      account.stripe.subscriptionId = subscription.id
      account.stripe.paymentMethod = cardInfo
      await account.save()
    }

    return Response.json(
      { success: 'Default payment method set and subscription created successfully, starting in 14 days.', subscription },
      { status: 200 }
    )

  } catch (error)
  {
    logger.error(error.message)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { setDefaultPaymentMethod as POST }
