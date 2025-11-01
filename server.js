import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import generateHandler from './api/generate.js'
import verifyHandler from './api/verify.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// 解析 JSON 请求体
app.use(express.json())

// 提供静态文件服务（public 目录）
app.use(express.static(join(__dirname, 'public')))

// API 路由 - 生成验证码
app.get('/api/generate', async (req, res) => {
  try {
    await generateHandler(req, res)
  } catch (error) {
    console.error('Error in generate handler:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

// API 路由 - 验证验证码
app.post('/api/verify', async (req, res) => {
  try {
    await verifyHandler(req, res)
  } catch (error) {
    console.error('Error in verify handler:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`)
  console.log(`📄 Verify page: http://localhost:${PORT}/verify.html`)
  console.log(`🧪 Test page: http://localhost:${PORT}/index.html`)
})

