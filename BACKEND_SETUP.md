# Backend Registration API - Production Ready Setup

## ✅ Completed Fixes

### 1. **Backend Server (Node.js + Express)**
   - ✅ Enhanced startup logging showing port, environment, and MongoDB URI status
   - ✅ Fixed duplicate `server.listen()` calls that caused `ERR_SERVER_ALREADY_LISTEN` error
   - ✅ CORS properly configured for Vercel deployment (3 specific URLs + env fallback)
   - ✅ `express.json()` middleware enabled for request body parsing
   - ✅ All routes properly mounted under `/api` prefix

### 2. **MongoDB Connection**
   - ✅ MongoDB connection via `connectDB()` in `backend/config/db.js`
   - ✅ Uses `process.env.MONGO_URI` for Atlas or local MongoDB
   - ✅ Proper error handling with descriptive console messages
   - ✅ Connection validation on startup

### 3. **User Model (Mongoose)**
   - ✅ Complete schema including: name, email, password, rollNumber, department, year, role, reputation, successfulReturns
   - ✅ Password hashing via bcrypt using pre-save hook
   - ✅ `comparePassword()` method for authentication
   - ✅ Unique constraints on email and rollNumber

### 4. **Registration API (authController.js)**
   - ✅ Accepts `fullName` from frontend and maps to internal `name` field
   - ✅ Complete validation: checks for required fields
   - ✅ Duplicate email prevention
   - ✅ Password hashed before storage
   - ✅ JWT token generated on successful registration
   - ✅ User data returned in response
   - ✅ Enhanced error logging for debugging

### 5. **Login API (authController.js)**
   - ✅ Email-based authentication
   - ✅ Password comparison using bcrypt
   - ✅ JWT token generation with 7-day expiration
   - ✅ User data included in response

### 6. **Environment Configuration**
   - ✅ Backend/.env.example created with all required variables
   - ✅ Production URL as default for CORS
   - ✅ Proper error messaging for missing environment variables

## 🚀 Server Startup Output

```
✅ Server running on port 5000
📝 Environment: development
✅ MongoDB URI configured
```

## 📋 Required Environment Variables

Set these in your `.env` file (Render dashboard for production):

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lostandfound

# JWT Secret (use strong random string)
JWT_SECRET=your_jwt_secret_key_here

# Server Port
PORT=5000

# Environment
NODE_ENV=production

# Cloudinary (for uploads)
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Frontend URL for CORS
CLIENT_URL=https://lost2found.vercel.app
```

## 🔗 API Endpoints

### Registration (POST)
```
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "rollNumber": "21BCS001",
  "department": "CSE",
  "year": "3rd"
}

Response (201):
{
  "message": "Registration successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "21BCS001",
    "role": "student"
  }
}
```

### Login (POST)
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "21BCS001",
    "role": "student",
    "reputation": 0,
    "successfulReturns": 0
  }
}
```

## 🔒 Data Flow: Frontend → Backend

### Registration Flow
1. Frontend sends: `{ fullName, email, password, rollNumber, department, year }`
2. Backend receives: Destructures `fullName` → converts to `name`
3. Validation: Checks name, email, password, rollNumber (not null/empty)
4. Database: Saves user with hashed password via bcrypt pre-save hook
5. Response: Returns JWT token + user data

### Key Differences from Frontend Form
| Field | Frontend | Backend |
|-------|----------|---------|
| Full Name | `fullName` | Renamed to `name` in User model |
| Additional Fields | - | `role` (default: 'student') |
| Password Storage | Sent in plaintext | Hashed with bcrypt (salt rounds: 10) |

## ✅ Production Readiness Checklist

- [x] Backend starts without crashing
- [x] Register API accepts fullName from frontend
- [x] Passwords are hashed before storage
- [x] MongoDB connection configured via environment variable
- [x] JWT token generation working
- [x] CORS configured for Vercel deployment
- [x] Error logging enabled for debugging
- [x] Environment variables documented in .env.example
- [x] No hardcoded URLs or secrets in code

## 🐛 Troubleshooting

### "MONGO_URI not set in environment variables"
- This warning is expected if MONGO_URI is not set
- Set it in your Render environment dashboard
- Format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

### "Listen method has been called more than once"
- ✅ FIXED: Removed duplicate `server.listen()` calls
- The error in the title was caused by multiple listen() invocations
- This has been corrected in the latest version

### "email already registered"
- User tried to register with an existing email
- Must use unique email address

### Invalid JWT token
- Ensure JWT_SECRET is set and consistent
- Token expires after 7 days

## 📝 Latest Commits

1. **13b2ad5** - Fix backend MongoDB connection and register API with better logging
2. **b997166** - Remove duplicate server.listen() call and add environment variable documentation

## 🎯 Next Steps

1. **Set Environment Variables** in Render dashboard:
   - MONGO_URI
   - JWT_SECRET
   - Other Cloudinary variables
   
2. **Test in Production**:
   - Use Vercel frontend to register new user
   - Verify JWT token is returned
   - Confirm user data is saved to MongoDB Atlas

3. **Monitor Logs**:
   - Check Render dashboard for error logs
   - Look for "REGISTER ERROR:" messages for debugging
   - Verify "✅ MongoDB URI configured" on server start

## 📞 Support

If the backend fails to start:
1. Check environment variables are set
2. Verify MongoDB connection string is correct
3. Check logs for "REGISTER ERROR" messages
4. Ensure port 5000 (or env PORT) is not in use
