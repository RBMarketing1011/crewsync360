export const formatPhoneNumber = (input) =>
{
  // Regex to extract only digits
  const digitsOnly = input.replace(/\D/g, '')

  // Check if the phone number has 10 digits
  if (digitsOnly.length === 10)
  {
    return `+1${ digitsOnly }`
  } else
  {
    return null // Invalid if it doesn't contain exactly 10 digits
  }
}