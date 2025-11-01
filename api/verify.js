import '../config.js'
import jwt from 'jsonwebtoken'

// JWT 密钥，从环境变量读取（本地使用 .env，Vercel 使用 Secrets）
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
    // 验证 JWT token
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // 比较用户输入的 code 与 token 中的 code
    if (decoded.code === code) {
      res.setHeader('Content-Type', 'application/json')
      return res.json({ success: true, message: '验证成功' })
    } else {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ success: false, error: '验证码不正确' })
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ success: false, error: '验证码已过期' })
    } else if (error.name === 'JsonWebTokenError') {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ success: false, error: '无效的 token' })
    } else {
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ success: false, error: '验证失败' })
    }
  }
}

