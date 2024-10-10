'use server'

import { transporter } from '@lib/nodemailer/Transporter'
import connectDB from '@db/connectDB'
import VerificationToken from '@db/models/verification_tokens'
import { v4 } from 'uuid'

export const verifyToken = async (email) =>
{
    const id = v4()
    const token = id.slice(0, 6)

    console.log(id)

    await connectDB()

    const tokenFound = await VerificationToken.findOne({ identifier: email })

    if (tokenFound && new Date(tokenFound.expires) > new Date(Date.now()))
    {
        return
    }

    const newToken = await VerificationToken.create({
        identifier: email,
        token,
        expires: new Date(Date.now() + (1000 * 60 * 60)),
    })

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Please Verify Your Email`,
        text: "Your verification code is:",
        html: `
            <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Arial', sans-serif;">
                <div style="max-width: 450px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden; text-align: center;">
                    <div style="background-color: rgb(79, 70, 229); color: white; padding: 40px;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Verify Your Email</h1>
                        <p style="margin: 10px 0; font-size: 16px;">
                        Here is your verification code.
                        </p>
                    </div>
                    <div style="padding: 30px;">
                        <p style="display: inline-block; margin: 20px 0; padding: 15px 30px; background-color: rgb(79, 70, 229); color: white; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold;">
                            ${ newToken.token }
                        </p>
                        <p style="font-size: 16px; line-height: 1.5; color: #374151;">
                            Please enter this code in the verification form to complete your registration.
                        </p>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 30px;">
                        <div style="margin-bottom: 20px;">
                            <a href="https://facebook.com" style="margin: 0 10px;">
                                <img src="https://img.icons8.com/color/facebook-new.png" alt="Facebook" width="24" />
                            </a>
                            <a href="https://twitter.com" style="margin: 0 10px;">
                                <img src="https://img.icons8.com/color/twitter-squared.png" alt="Twitter" width="24" />
                            </a>
                            <a href="https://instagram.com" style="margin: 0 10px;">
                                <img src="https://img.icons8.com/color/instagram-new.png" alt="Instagram" width="24" />
                            </a>
                        </div>
                        <p style="font-size: 12px; color: #6b7280;">
                            &copy; 2024 Your Company. All rights reserved.
                        </p>
                        <p style="font-size: 12px; color: #6b7280;">
                            <a href="#" style="color: rgb(79, 70, 229); text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: rgb(79, 70, 229); text-decoration: none;">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </body>
        `,
    })
}