// Only load dotenv in local development environment
// Vercel will automatically inject environment variables, no need to load dotenv

// Check if in local development environment (not on Vercel)
const isLocalDev = process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1'

// If in local development, synchronously load dotenv
if (isLocalDev) {
  try {
    // Use dotenv to load .env file
    const dotenv = await import('dotenv')
    dotenv.default.config()
  } catch (error) {
    // Silently handle dotenv loading failure (may not be needed in some environments)
    // In production or on Vercel, environment variables should already be available via process.env
  }
}

