import { Schema, models, model } from 'mongoose'

const verificationTokenSchema = new Schema({
  identifier: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
    default: Date.now() + (1000 * 60 * 60 * 1),
  }
})

const VerificationToken = models.VerificationToken || model('VerificationToken', verificationTokenSchema)

export default VerificationToken