# Deploy STEMify to the Cloud

Everything runs in the cloud: **MongoDB Atlas** (database) + **Render.com** (app server) — both have free tiers.

## Step 1: MongoDB Atlas (Database in Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Create free account
2. Create a **M0 FREE** cluster
3. **Database Access** → Add user (username + password) — save these
4. **Network Access** → Add IP Address → Add `0.0.0.0/0` (allow from anywhere)
5. **Database** → Connect → **Connect your application** → Copy connection string
   - Example: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Add database name: `stemify` before the `?`  
   - Result: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/stemify?retryWrites=true&w=majority`
   - If password has special characters, URL-encode them (e.g. `@` → `%40`)

## Step 2: Deploy to Render.com (Free)

1. Push your project to **GitHub**
2. Go to [Render.com](https://render.com) → Sign up (free)
3. **New** → **Web Service**
4. Connect your GitHub repo
5. Configure:
   - **Name:** stemify
   - **Runtime:** Node
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && node server.js`
   - **Instance Type:** Free
6. **Environment Variables** (Add):
   - `MONGODB_URI` = your Atlas connection string
   - `JWT_SECRET` = any random secret (e.g. `my-super-secret-key-123`)
7. Click **Create Web Service**

After deployment, you’ll get a URL like: **https://stemify-xxxx.onrender.com**

## Step 3: Use Your Cloud App

- **Home:** `https://your-app.onrender.com`
- **Sign In:** `https://your-app.onrender.com/signin.html`

The sign-in page uses your deployed URL, so the API calls work from the cloud.

---

## Alternative: Railway.app (Free Tier)

1. Go to [Railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub** → select your repo
3. Add variables: `MONGODB_URI`, `JWT_SECRET`
4. Set **Start Command:** `cd server && node server.js`
5. Deploy — Railway provides a public URL

---

## Notes

- **Render free tier:** App may sleep after 15 min of no traffic; first request can take 30–60 seconds to wake.
- **MongoDB Atlas free tier:** 512MB storage — enough for many users.
- Your app and database both run in the cloud; no local server needed.
