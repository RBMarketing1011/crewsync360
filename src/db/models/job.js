import { Schema, models, model } from 'mongoose'
import User from './user'
import Customer from './customer'
import CompanyAccount from './account'

const jobSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    enum: [ 'Plumbing', 'Electrical', 'HVAC', 'Cleaning', 'Landscaping', 'General Repair' ],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedEmployees: [ {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isLead: { type: Boolean, default: false }
  } ],
  address: {
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  dateOfJob: {
    type: Date,
    required: true
  },
  timeJobStarted: {
    type: Date,
    default: null
  },
  timeJobCompleted: {
    type: Date,
    default: null
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  numberOfEmployees: {
    type: Number,
    default: null
  },
  estimatedHours: {
    type: Number,
    default: null
  },
  actualHours: {
    type: Number,
    default: null
  },
  safetyConcerns: {
    type: String,
  },
  serviceItemsandMaterials: {
    items: { type: String },
    materials: { type: String }
  },
  pricing: {
    type: {
      type: String,
      enum: [ 'Flat Rate', 'Hourly Rate' ],
      required: true
    },
    estimatedPrice: { type: Number },
    finalPrice: { type: Number }
  },
  customerServices: {
    type: String
  },
  notes: [ {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: { type: String, required: true }
  } ],
  inventory: [ {
    type: { type: String, required: true },
    quantity: { type: Number, required: true }
  } ],
  documents: [ {
    name: { type: String, required: true },
    url: { type: String, required: true },
    sent: { type: Boolean, default: false },
    signed: { type: Boolean, default: false }
  } ],
  photos: [ {
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  } ],
}, { timestamps: true })

const Job = models.Job || model('Job', jobSchema)
export default Job