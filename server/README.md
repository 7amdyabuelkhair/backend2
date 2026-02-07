# STEMify Auth Server

Authentication backend using **Node.js**, **Express**, **MongoDB**, and **MongoDB Atlas** (free tier).

## Setup MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (choose **M0 FREE** tier)
3. Click **Database Access** → **Add New Database User**
   - Create a username and password (save these!)
4. Click **Network Access** → **Add IP Address**
   - Add `0.0.0.0/0` to allow from anywhere (or your IP for security)
5. Click **Database** → **Connect** → **Connect your application**
   - Copy the connection string (looks like: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/`)

## Install & Run

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file** (copy from .env.example):
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env`** and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/stemify?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-change-this
   ```
   - Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your Atlas user
   - Replace `YOUR_CLUSTER` with your cluster address
   - If password has special chars, URL-encode them (e.g. `@` → `%40`)

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open in browser:** http://localhost:3000
   - Sign in page: http://localhost:3000/signin.html

## API Endpoints

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/auth/signup` | name, number, parentName, parentNumber, email, password, school |
| POST | `/api/auth/signin` | email, password |

## Notes

- **Important:** Run the server before using sign in/sign up. Opening HTML files directly (file://) will not work with the API.
- JWT tokens are stored in `localStorage` as `stemify_token`
- User data is stored in `localStorage` as `stemify_user`
