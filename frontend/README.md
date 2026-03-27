# 🎨 AI ClipArt Generator

---

## Overview
AI ClipArt Generator is a mobile app built with Expo React Native that converts normal images into AI-generated clipart styles using a Cloudflare image-to-image model through a Node.js backend deployed on Vercel. Users can select styles, preview AI images, save them to a gallery, and share them via multiple channels like WhatsApp or system share.


## 📱 APK
| Resource | Link |
|---|---|
| 📦 **APK Download** | [Download from Google Drive](https://drive.google.com/your-apk-link) |
| 🎥 **Screen Recording** | [Watch Demo on Google Drive](https://drive.google.com/your-demo-link) |

> ⚠️ To install the APK: enable **"Install from unknown sources"** in your Android settings before installing.

---

## ✨ Features

- **AI Style Transfer** — Convert any photo into 5 distinct art styles:
  - 🎌 Anime / Studio Ghibli
  - 🖼️ Flat Illustration
  - 🕹️ Pixel Art
  - ✏️ Sketch / Outline
  - 🎨 Cartoon

- **Image Picker** — Pick any photo from your device gallery
- **AI Generation** — Cloudflare Workers AI processes style transfer in real-time
- **App Gallery** — Save and manage generated images with persistent AsyncStorage
- **Device Save** — Download images directly to your phone gallery in an "AI Clipart" album
- **Delete Management** — Remove unwanted images from your gallery with confirmation

---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| **Frontend** | Expo React Native (TypeScript) | Cross-platform, fast dev cycle |
| **State Management** | React Context API + AsyncStorage | Lightweight, no Redux overhead needed |
| **AI Model** | Cloudflare Workers AI (`stable-diffusion-v1-5-img2img`) | Free tier, reliable, no GPU setup |
| **Backend** | Node.js + Express (Vercel Serverless) | Proxy to bypass CORS, minimal code |
| **Deployment** | Vercel | Free hosting, zero config, instant deploys |
| **Image Handling** | expo-image-picker, expo-media-library, expo-file-system | Official Expo libraries, stable APIs |
| **Build** | EAS Build (Expo Application Services) | Cloud APK builds, no Android Studio needed |

---

## 🚀 Setup Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-clipart-generator.git
cd ai-clipart-generator
```

### 2. Install Frontend Dependencies
```bash
npm install
npx expo install expo-image-picker expo-media-library expo-file-system
```

### 3. Get Cloudflare Credentials

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Go to **dash.cloudflare.com → AI** — copy your **Account ID**
3. Go to **dash.cloudflare.com/profile/api-tokens** → Create Token → Use **"Workers AI"** template → copy the token

### 4. Setup Backend
```bash
cd backend
```

Create `.env`:
```env
CF_ACCOUNT_ID=your_cloudflare_account_id
CF_API_TOKEN=your_cloudflare_api_token
```

### 5. Deploy Backend to Vercel
```bash
npm install -g vercel
vercel --prod
```

Add environment variables in Vercel dashboard:
- `CF_ACCOUNT_ID`
- `CF_API_TOKEN`

Copy your deployed URL e.g. `https://your-project.vercel.app`

### 6. Update Frontend API URL

In `app/(tabs)/create.tsx`:
```typescript
const BASE_URL = "https://your-project.vercel.app"; // ← your Vercel URL
```

### 7. Run the App
```bash
# Start Expo dev server
npx expo start

# Scan QR code with Expo Go app on your phone
# OR press 'a' for Android emulator
```

---

## 📦 Build APK
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure (first time only)
eas build:configure

# Build APK
eas build -p android --profile preview
```

> Build takes ~15–30 mins on the free tier. Download link is emailed when done and visible at [expo.dev/builds](https://expo.dev/builds).

---

## 🔑 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `CF_ACCOUNT_ID` | Vercel + `.env` | Cloudflare Account ID |
| `CF_API_TOKEN` | Vercel + `.env` | Cloudflare API Token |

> ⚠️ Never commit `.env` to git. It's in `.gitignore` by default.

---

## ⚖️ Tech Decisions & Tradeoffs

### ✅ Cloudflare Workers AI for Image Generation
**Decision:** Use `@cf/runwayml/stable-diffusion-v1-5-img2img` via Cloudflare AI API.

**Why:** Free tier with no credit card required, reliable uptime, and no GPU infrastructure to manage.

**Tradeoff:** Limited model selection compared to paid services like Replicate or Stability AI. Image quality is good but not state-of-the-art. No fine-tuning options.

---

### ✅ Node.js Backend as CORS Proxy on Vercel
**Decision:** Thin Express serverless function deployed on Vercel instead of calling Cloudflare AI directly from the app.

**Why:** Cloudflare AI API blocks direct browser/app calls due to CORS policy. A backend proxy solves this while also keeping the API token secure on the server side.

**Tradeoff:** Adds a network hop (app → Vercel → Cloudflare). Cold starts on Vercel free tier can add 1–2 seconds latency on first request.

---

### ✅ React Context API + AsyncStorage over Redux
**Decision:** Simple Context API for global state with AsyncStorage for persistence.

**Why:** The app has minimal shared state (selected style, gallery images, generated image). Redux would add unnecessary boilerplate and bundle size.

**Tradeoff:** Context re-renders the entire tree on state changes. At scale with hundreds of gallery images this could cause performance issues — at which point zustand or Redux Toolkit would be a better fit.

---
