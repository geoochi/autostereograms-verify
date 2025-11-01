# Stereo Verify

一个基于自动立体图（SIRDS - Single Image Random Dot Stereograms）的验证码系统，用于区分人类和 LLM（大语言模型）。

## 📖 项目简介

Stereo Verify 使用 SIRDS 技术生成验证码图片。用户需要通过"交叉眼"（cross-eye）或"平行眼"（parallel-eye）技巧，在立体图中识别隐藏的验证码文字。这种验证方式对 LLM 来说极其困难，因为需要特殊的视觉技巧才能识别，而对人类来说相对容易。

### 核心特性

- 🎨 **SIRDS 立体图生成**：生成包含隐藏文字的随机点立体图
- 🔐 **JWT 加密验证**：使用 JWT token 加密验证码，确保安全性
- 🖼️ **Base64 图片输出**：验证码图片以 Base64 格式返回，方便前端展示
- ⏱️ **时效性验证**：验证码 token 设置 5 分钟过期时间
- 🚀 **Vercel 就绪**：完美支持 Vercel 部署
- 🛠️ **本地开发友好**：支持 dotenv 本地环境变量管理

## 🎯 功能页面

### 1. 验证码验证页面 (`/verify.html`)

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

### 2. 测试演示页面 (`/index.html`)

用于测试和演示 SIRDS 生成功能的页面：

- 可以输入任意文本生成对应的立体图
- 实时预览生成的立体图效果
- 用于调试和测试立体图生成算法

## 📁 项目结构

```
stereo-verify/
├── api/                    # API 端点
│   ├── config.js          # 环境变量配置（dotenv 加载）
│   ├── generate.js        # 生成验证码图片和 JWT token
│   └── verify.js          # 验证用户输入的验证码
├── public/                 # 静态文件
│   ├── index.html         # 测试演示页面
│   ├── verify.html        # 验证码验证页面
│   └── SIRDS.js           # 客户端立体图生成脚本
├── fonts/                  # 字体文件
│   ├── msyh.ttf           # 中文字体（用于生成验证码）
│   └── CascadiaCode.ttf   # 等宽字体
├── package.json
├── .env.example           # 环境变量示例文件
└── README.md
```

## 🚀 快速开始

### 环境要求

- Node.js 16+ 
- pnpm 10+ （或 npm/yarn）

### 本地开发

1. **克隆项目**

   ```bash
   git clone <repository-url>
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

   根据你使用的框架/服务器启动项目（例如 Vercel CLI）：

   ```bash
   vercel dev
   ```

   或者使用其他 Node.js 服务器（如 Express、Fastify 等）

5. **访问页面**

   - 验证码验证页面：`http://localhost:3000/verify.html`
   - 测试演示页面：`http://localhost:3000/index.html`

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

**方法一：通过 Dashboard**

1. 进入项目 **Settings** → **Environment Variables**
2. 添加环境变量：
   - **Name**: `JWT_SECRET`
   - **Value**: 你的 JWT 密钥（建议使用强密码）
   - **Environment**: 选择需要应用的环境
     - ✅ Production（生产环境）
     - ✅ Preview（预览环境）
     - ✅ Development（开发环境）
3. 点击 **Save**

**方法二：使用 Vercel CLI**

```bash
vercel env add JWT_SECRET
```

然后输入密钥值并选择应用环境。

### 4. 重新部署

配置环境变量后，重新部署项目：

```bash
vercel --prod
```

或在 Dashboard 中点击 **Redeploy**

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
- `token`: JWT 加密的 token，包含验证码信息（5 分钟过期）
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
- `验证码已过期`：token 已超过 5 分钟有效期
- `无效的 token`：token 格式错误或已被篡改

## 🔒 安全说明

- **JWT 密钥**：生产环境请务必使用强密码作为 `JWT_SECRET`，建议至少 32 个字符
- **Token 过期**：验证码 token 默认 5 分钟过期，防止重放攻击
- **环境变量**：`.env` 文件已添加到 `.gitignore`，不会被提交到版本控制
- **验证码字符集**：使用易混淆字符较少的字符集 `23456789ABCDEFGHJKMNPQRSTUVWXYZ`（排除 0、1、I、L、O）

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

## 📚 技术栈

- **Canvas 处理**: `@napi-rs/canvas` - 服务器端 Canvas API
- **JWT 加密**: `jsonwebtoken` - JSON Web Token 生成和验证
- **环境变量**: `dotenv` - 本地开发环境变量管理
- **字体支持**: 支持中文字体（msyh.ttf）生成中文验证码

## 📖 参考文献

本项目基于 SIRDS（Single Image Random Dot Stereograms）算法实现。

**源代码参考**：
- https://www.ime.usp.br/~otuyama/stereogram/gallery/sirds/

## 📝 许可证

请查看项目根目录的 LICENSE 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：本项目旨在提供一种有趣的验证码解决方案，但不应作为唯一的安全验证手段。在实际应用中，建议与其他安全措施（如速率限制、IP 检查等）结合使用。
