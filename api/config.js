// 仅在本地开发环境加载 dotenv
// Vercel 会自动注入环境变量，无需加载 dotenv

// 检查是否在本地开发环境（不在 Vercel）
const isLocalDev = process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1'

// 如果是本地开发，同步加载 dotenv
if (isLocalDev) {
  try {
    // 使用 dotenv 加载 .env 文件
    const dotenv = await import('dotenv')
    dotenv.default.config()
  } catch (error) {
    // dotenv 加载失败时静默处理（可能在某些环境下不需要）
    // 在生产环境或 Vercel 上，环境变量应该已经通过 process.env 可用
  }
}

