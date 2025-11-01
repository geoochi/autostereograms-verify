import express from 'express'
import generateHandler from './api/generate.js'
import verifyHandler from './api/verify.js'

const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(express.static('public'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Referrer-Policy', 'no-referrer-when-downgrade')
  next()
})

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

app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: 'public' })
})

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`)
})
