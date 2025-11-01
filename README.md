# Stereo Verify

A captcha demonstration based on Stereograms, used to distinguish humans from LLMs (Large Language Models).

## 📖 Project Introduction

Stereo Verify uses SIRDS technology to generate captcha images. Users need to identify hidden captcha text in stereograms using "cross-eye" or "parallel-eye" techniques. This verification method is extremely difficult for LLMs because it requires special visual techniques to identify, while it's relatively easy for humans.

## 🔬 How to View Stereograms

1. Place the image at a distance of about 30-40cm from your eyes
2. Relax your eyes and let your gaze "pass through" the screen to look into the distance
3. When your eyes' focus separates, you will see the hidden text floating above the image

> 💡 Tip: For beginners, it is recommended to start with larger images or from a greater distance.

Verification Page 👉 https://stereo-verify.vercel.app

## 🚀 Local Development

1. **Clone the project**

   ```bash
   git clone https://github.com/geoochi/stereo-verify
   cd stereo-verify
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and set the JWT secret key:

   ```
   JWT_SECRET=your-strong-secret-key-here
   ```

   > 💡 It is recommended to use a strong password with at least 32 characters

4. **Start the development server**

   **Using Express development server (recommended)**:

   ```bash
   pnpm dev
   ```

5. **Access the page**

   - Captcha verification page: `http://localhost:3001`

## 🌐 Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/geoochi/stereo-verify)

### Configure environment variables

Add environment variables in Vercel project settings:

1. Go to project **Settings** → **Environment Variables**
2. Add environment variable:
   - **Name**: `JWT_SECRET`
   - **Value**: Your JWT secret key (recommend using a strong password)
3. Click **Save**

## 📡 API Documentation

### `GET /api/generate`

Generate captcha image and encrypted token.

**Response Example**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "dataURL": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

**Field Description**:

- `token`: JWT encrypted token containing captcha information (expires in 1 minute)
- `dataURL`: Base64 encoded captcha image (PNG format)

### `POST /api/verify`

Verify the user's input captcha code.

**Request Body**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "code": "A3B7"
}
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "Verification successful"
}
```

**Failure Response** (400):

```json
{
  "success": false,
  "error": "Incorrect verification code"
}
```

**Error Types**:

- `Incorrect verification code`: The user's input code does not match the code in the token
- `Verification code expired`: The token has exceeded the 1-minute validity period
- `Invalid token`: The token format is incorrect or has been tampered with

## 📖 References

This project is based on the SIRDS (Single Image Random Dot Stereograms) algorithm.

https://www.ime.usp.br/~otuyama/stereogram/gallery/sirds/sirds.html

**Note**: This project aims to provide an interesting captcha solution, but should not be used as the only security verification method. In practical applications, it is recommended to combine it with other security measures (such as rate limiting, IP checking, etc.).
