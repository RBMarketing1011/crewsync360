import { Schema, models, model } from 'mongoose'
import User from './user'
import Job from './job'
import Customer from './customer'

const companyAccountSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, 'Account owner is required' ]
  },
  users: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ],
  jobs: [ {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  } ],
  customers: [ {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  } ],
  companyName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  companyAddress: {
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    }
  },
  website: {
    type: String,
  },
  description: {
    type: String
  },
  stripe: {
    customerId: {
      type: String
    },
    subscriptionId: {
      type: String
    },
    paymentMethod: {
      id: {
        type: String
      },
      brand: {
        type: String
      },
      country: {
        type: String
      },
      last4: {
        type: String
      },
      expMonth: {
        type: Number
      },
      expYear: {
        type: Number
      }
    }
  },

}, { timestamps: true })

const CompanyAccount = models.CompanyAccount || model('CompanyAccount', companyAccountSchema)
export default CompanyAccount