export const parseSingleImageData = async (e) =>
{
  const file = e.target.files[ 0 ]

  if (file)
  {
    const allowedTypes = [ 'image/jpeg', 'image/png', 'image/webp' ]
    const maxSize = 100 * 1024 // 100 KB

    // Check if the file type is valid
    if (!allowedTypes.includes(file.type))
    {
      alert('Invalid file type. Please upload an image in JPEG, PNG, or WebP format.')
      return null // Return null on error
    }

    // Check if the file size is within the limit
    if (file.size > maxSize)
    {
      alert('File is too large. Please upload an image smaller than 100KB.')
      return null // Return null on error
    }

    const reader = new FileReader()

    // Return a promise that resolves with the Base64 string
    return new Promise((resolve, reject) =>
    {
      reader.onloadend = () =>
      {
        resolve(reader.result.toString()) // Resolve with Base64 string
      }

      reader.onerror = (error) =>
      {
        reject(error) // Reject the promise on error
      }

      reader.readAsDataURL(file)
    })
  }

  return null // Return null if no file is selected
}
