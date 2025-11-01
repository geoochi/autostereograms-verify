import './config.js'
import jwt from 'jsonwebtoken'

// JWT secret key, read from environment variables (use .env locally, use Secrets on Vercel)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, code } = req.body

  if (!token || !code) {
    res.setHeader('Content-Type', 'application/json')
    return res.status(400).json({ error: 'Token and code are required' })
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Compare user input code with code in token
    if (decoded.code === code) {
      res.setHeader('Content-Type', 'application/json')
      return res.json({ success: true, message: 'Verification successful' })
    } else {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ success: false, error: 'Incorrect verification code' })
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ success: false, error: 'Verification code expired' })
    } else if (error.name === 'JsonWebTokenError') {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ success: false, error: 'Invalid token' })
    } else {
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ success: false, error: 'Verification failed' })
    }
  }
}

