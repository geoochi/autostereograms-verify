# Stereo Verify

一个基于立体图(Stereograms)的验证码演示，用于区分人类和 LLM（大语言模型）。

## 📖 项目简介

Stereo Verify 使用 SIRDS 技术生成验证码图片。用户需要通过"交叉眼"（cross-eye）或"平行眼"（parallel-eye）技巧，在立体图中识别隐藏的验证码文字。这种验证方式对 LLM 来说极其困难，因为需要特殊的视觉技巧才能识别，而对人类来说相对容易。

### 核心特性

- 🎨 **SIRDS 立体图生成**：生成包含隐藏文字的立体图
- 🔐 **JWT 加密验证**：使用 JWT token 加密验证码，确保安全性
- 🖼️ **Base64 图片输出**：验证码图片以 Base64 格式返回，方便前端展示
- ⏱️ **时效性验证**：验证码 token 设置 1 分钟过期时间
- 🚀 **Vercel 就绪**：完美支持 Vercel 部署
- 🛠️ **本地开发友好**：支持 dotenv 本地环境变量管理

## 🎯 验证码验证页面 👉 https://stereo-verify.vercel.app

主要的验证码验证界面，包含：

- **验证码生成**：自动从 API 获取验证码图片和加密 token
- **用户输入**：提供输入框供用户输入识别到的验证码
- **实时验证**：调用验证 API 检查用户输入是否正确
- **结果反馈**：清晰显示验证成功或失败信息
- **刷新功能**：支持重新获取新的验证码

**使用方法**：

1. 页面加载时自动获取验证码图片
2. 使用"交叉眼"或"平行眼"技巧查看立体图中的隐藏文字
3. 在输入框中输入识别到的验证码（4 位大写字母和数字）
4. 点击"验证"按钮或按回车键提交
5. 查看验证结果

## 🚀 快速开始

### 环境要求

- Node.js 16+
- pnpm 10+

### 本地开发

1. **克隆项目**

   ```bash
   git clone https://github.com/geoochi/stereo-verify
   cd stereo-verify
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **配置环境变量**

   ```bash
   cp .env.example .env
   ```

   编辑 `.env` 文件，设置 JWT 密钥：

   ```
   JWT_SECRET=your-strong-secret-key-here
   ```

   > 💡 建议使用至少 32 个字符的强密码

4. **启动开发服务器**

   **使用 Express 开发服务器（推荐）**：

   ```bash
   pnpm dev
   ```

5. **访问页面**

   - 验证码验证页面：`http://localhost:3001`

## 🌐 Vercel 部署

### 1. 准备项目

确保项目已推送到 Git 仓库（GitHub、GitLab 等）

### 2. 部署到 Vercel

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **Add New Project**
3. 导入你的 Git 仓库
4. Vercel 会自动检测项目配置

### 3. 配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目 **Settings** → **Environment Variables**
2. 添加环境变量：
   - **Name**: `JWT_SECRET`
   - **Value**: 你的 JWT 密钥（建议使用强密码）
   - **Environment**: 选择需要应用的环境
     - ✅ Production（生产环境）
     - ✅ Preview（预览环境）
     - ✅ Development（开发环境）
3. 点击 **Save**

## 📡 API 文档

### `GET /api/generate`

生成验证码图片和加密 token。

**响应示例**：

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "dataURL": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

**字段说明**：

- `token`: JWT 加密的 token，包含验证码信息（1 分钟过期）
- `dataURL`: Base64 编码的验证码图片（PNG 格式）

### `POST /api/verify`

验证用户输入的验证码。

**请求体**：

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "code": "A3B7"
}
```

**成功响应**（200）：

```json
{
  "success": true,
  "message": "验证成功"
}
```

**失败响应**（400）：

```json
{
  "success": false,
  "error": "验证码不正确"
}
```

**错误类型**：

- `验证码不正确`：用户输入的验证码与 token 中的不匹配
- `验证码已过期`：token 已超过 1 分钟有效期
- `无效的 token`：token 格式错误或已被篡改

## 🔬 如何查看立体图

### 交叉眼法（Cross-eye）

1. 将图片放在距离眼睛约 30-40cm 的位置
2. 放松眼睛，让视线"穿过"屏幕看向远方
3. 当双眼焦点分离时，你会看到隐藏的文字浮现在图片上

### 平行眼法（Parallel-eye）

1. 将图片放在稍远的距离
2. 保持双眼平行，看向图片后方
3. 隐藏的文字会浮现出来

> 💡 提示：对于初学者，建议从较大的图片或较远的距离开始练习。

## 📖 参考

本项目基于 SIRDS（Single Image Random Dot Stereograms）算法实现。

- https://www.ime.usp.br/~otuyama/stereogram/gallery/sirds/sirds.html

**注意**：本项目旨在提供一种有趣的验证码解决方案，但不应作为唯一的安全验证手段。在实际应用中，建议与其他安全措施（如速率限制、IP 检查等）结合使用。
