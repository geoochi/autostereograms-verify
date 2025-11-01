# Stereo Verify

A captcha demonstration based on Stereograms, used to distinguish humans from LLMs (Large Language Models).

## 📖 Project Introduction

Stereo Verify uses SIRDS technology to generate captcha images. Users need to identify hidden captcha text in stereograms using "cross-eye" or "parallel-eye" techniques. This verification method is extremely difficult for LLMs because it requires special visual techniques to identify, while it's relatively easy for humans.

### Core Features

- 🎨 **SIRDS Stereogram Generation**: Generate stereograms containing hidden text
- 🔐 **JWT Encrypted Verification**: Use JWT tokens to encrypt captcha codes, ensuring security
- 🖼️ **Base64 Image Output**: Captcha images are returned in Base64 format for easy frontend display
- ⏱️ **Time-Limited Verification**: Captcha tokens are set to expire after 1 minute
- 🚀 **Vercel Ready**: Perfect support for Vercel deployment
- 🛠️ **Local Development Friendly**: Supports dotenv for local environment variable management

## 🎯 Captcha Verification Page 👉 https://stereo-verify.vercel.app

Main captcha verification interface, including:

- **Captcha Generation**: Automatically fetches captcha images and encrypted tokens from the API
- **User Input**: Provides an input box for users to enter the identified captcha code
- **Real-time Verification**: Calls the verification API to check if user input is correct
- **Result Feedback**: Clearly displays verification success or failure messages
- **Refresh Function**: Supports fetching new captcha codes

**How to Use**:

1. The page automatically fetches a captcha image when loaded
2. Use "cross-eye" or "parallel-eye" techniques to view the hidden text in the stereogram
3. Enter the identified captcha code in the input box (4 uppercase letters and numbers)
4. Click the "verify" button or press Enter to submit
5. View the verification result

## 🚀 Quick Start

### Requirements

- Node.js 16+
- pnpm 10+

### Local Development

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

### 3. Configure environment variables

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

## 🔬 How to View Stereograms

### Cross-Eye Method

1. Place the image at a distance of about 30-40cm from your eyes
2. Relax your eyes and let your gaze "pass through" the screen to look into the distance
3. When your eyes' focus separates, you will see the hidden text floating above the image

### Parallel-Eye Method

1. Place the image at a slightly farther distance
2. Keep your eyes parallel and look behind the image
3. The hidden text will appear

> 💡 Tip: For beginners, it is recommended to start with larger images or from a greater distance.

## 📖 References

This project is based on the SIRDS (Single Image Random Dot Stereograms) algorithm.

- https://www.ime.usp.br/~otuyama/stereogram/gallery/sirds/sirds.html

**Note**: This project aims to provide an interesting captcha solution, but should not be used as the only security verification method. In practical applications, it is recommended to combine it with other security measures (such as rate limiting, IP checking, etc.).
