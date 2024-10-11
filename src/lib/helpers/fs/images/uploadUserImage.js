export const uploadUserImage = async (accountId, userId, image) =>
{
  try
  {
    const req = await fetch(`${ process.env.NEXTAUTH_URL }/api/v1/account/${ accountId }/users/${ userId }/upload-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }), // Sending the image data as JSON
    })

    const res = await req.json()

    if (res.error)
    {
      throw new Error(res.error)
    } else if (res.success)
    {
      return true
    }

  } catch (error)
  {
    console.error('Failed to update user image:', error.message) // Log error message
    return false // Return false in case of error
  }
}