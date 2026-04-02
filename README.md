# 🎓 Lost & Found Management System

> A modern, full-stack web application for managing lost and found items in educational institutions

[![Node.js](https://img.shields.io/badge/Node.js-v18.0+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.0+-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.0+-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3.3+-38B2AC)](https://tailwindcss.com/)

## 🌟 Features

### Core Functionality
- ✅ **Report Lost Items** - Users can report items they've lost with detailed information and photos
- ✅ **Report Found Items** - Community members can report discovered items
- ✅ **Smart Matching** - Intelligent algorithm automatically matches lost and found items
- ✅ **Direct Messaging** - Real-time communication with item reporters and finders
- ✅ **Real-time Notifications** - Instant updates on matches and messages
- ✅ **User Profiles** - Manage profile, track item history, and view past matches
- ✅ **Admin Dashboard** - Monitor and manage all items and users

### Technical Features
- 🔐 **JWT Authentication** - Secure token-based authentication
- 🔔 **Socket.io** - Real-time messaging and live notifications
- 📸 **Image Upload** - Cloudinary integration for item photos
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- 🎨 **Modern UI** - Beautiful dark theme with Tailwind CSS and animations
- ⚡ **Optimized Performance** - Fast load times with efficient data handling

---

## 🏗️ Project Structure

```
lost-and-found/
├── backend/                    # Node.js/Express API
│   ├── config/                # Configurations (DB, Cloudinary)
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth, error handling
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API endpoints
│   ├── utils/                 # Helper functions
│   ├── server.js              # Entry point
│   ├── Dockerfile             # Docker configuration
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # API and utility functions
│   │   ├── App.jsx            # Main app component
│   │   └── index.jsx          # Entry point
│   ├── Dockerfile             # Docker configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json
│
├── package.json               # Root dependencies
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- npm or yarn
- MongoDB Atlas account (free tier: https://www.mongodb.com/cloud/atlas)
- Cloudinary account (optional, for image uploads): https://cloudinary.com

### Local Development

**1. Clone the repository:**
```bash
git clone https://github.com/Jagarlapudiradhakrishna0/Devops_project_lost_and_found.git
cd Devops_project_lost_and_found
```

**2. Install dependencies:**
```bash
# Root directory
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**3. Configure environment variables:**

Create `.env` file in `backend/` directory:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lost-and-found
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Cloudinary (optional)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

Create `.env` file in `frontend/` directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**4. Start development servers:**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

Access the app at: **http://localhost:3000**

---

## 📦 Deployment

### Option 1: Deploy to Heroku (Recommended)

**Prerequisites:**
- Heroku account: https://www.heroku.com
- Heroku CLI installed

**Steps:**

1. **Login to Heroku:**
```bash
heroku login
```

2. **Create Heroku app:**
```bash
heroku create your-app-name
```

3. **Set environment variables:**
```bash
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_secret_key
heroku config:set CLOUDINARY_NAME=your_name
heroku config:set CLOUDINARY_KEY=your_key
heroku config:set CLOUDINARY_SECRET=your_secret
heroku config:set CLIENT_URL=https://your-app-name.herokuapp.com
```

4. **Deploy:**
```bash
git push heroku main
```

5. **View app:**
```bash
heroku open
```

---

### Option 2: Deploy to Railway

**Steps:**

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub**
4. Select your repository
5. Railway will automatically:
   - Install dependencies
   - Build the backend
   - Deploy your app
6. Add environment variables in Railway dashboard
7. Get your live URL and update frontend API endpoint

---

### Option 3: Deploy to AWS

**Using EC2 + RDS:**

1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install Node.js and npm
4. Clone repository
5. Configure `.env` with RDS MongoDB URI
6. Run `npm install && npm start`
7. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start backend/server.js --name "lost-found-api"
pm2 startup
pm2 save
```

**Deploy Frontend to S3 + CloudFront:**

1. Build frontend: `npm run build`
2. Upload `build/` folder to S3
3. Create CloudFront distribution
4. Update API URL in environment variables

---

### Option 4: Docker Deployment

**Build and run with Docker:**

```bash
# Backend
docker build -t lost-found-backend ./backend
docker run -p 5000:5000 --env-file backend/.env lost-found-backend

# Frontend
docker build -t lost-found-frontend ./frontend
docker run -p 3000:3000 lost-found-frontend
```

---

## 🔐 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key-123` |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `production` or `development` |
| `CLIENT_URL` | Frontend application URL | `https://app.example.com` |
| `CLOUDINARY_NAME` | Cloudinary account name | `your-account` |
| `CLOUDINARY_KEY` | Cloudinary API key | `xxxxx` |
| `CLOUDINARY_SECRET` | Cloudinary API secret | `xxxxx` |
| `REACT_APP_API_URL` | Backend API endpoint (frontend) | `https://api.example.com` |

---

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Lost Items
- `GET /api/lost-items` - Get all lost items
- `POST /api/lost-items` - Create lost item
- `GET /api/lost-items/:id` - Get lost item details
- `PUT /api/lost-items/:id` - Update lost item
- `DELETE /api/lost-items/:id` - Delete lost item

### Found Items
- `GET /api/found-items` - Get all found items
- `POST /api/found-items` - Create found item
- `GET /api/found-items/:id` - Get found item details

### Matches
- `GET /api/matches` - Get matched items
- `POST /api/matches` - Create match

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send message
- `GET /api/direct-messages` - Get direct messages

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Real-time:** Socket.io
- **Image Upload:** Cloudinary
- **Validation:** Joi, Express Validator

### Frontend
- **Library:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Real-time:** Socket.io Client
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit Pull Requests.

**Steps to contribute:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Support

For support, email the maintainers or open an issue on GitHub.

---

## 🎉 Acknowledgments

- Built with ❤️ for educational institutions
- Special thanks to all contributors
- Icons by Lucide React
- Styling by Tailwind CSS
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Helper functions and API calls
│   │   ├── App.jsx      # Main application component
│   │   └── index.jsx    # React entry point
│   ├── public/          # Static assets
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance)
- **Cloudinary Account** (for image hosting - optional)

### Setup & Installation

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/lost-and-found.git
cd lost-and-found
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in the `backend` folder:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lost-and-found
JWT_SECRET=your_secure_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:3000
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
```

#### 4. Start Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

✅ Open your browser and navigate to **http://localhost:3000**

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Lost Items
- `GET /api/lost-items` - Get all lost items
- `GET /api/lost-items/:id` - Get specific lost item
- `POST /api/lost-items` - Report lost item
- `PUT /api/lost-items/:id/mark-received` - Mark item as received

### Found Items
- `GET /api/found-items` - Get all found items
- `GET /api/found-items/:id` - Get specific found item
- `POST /api/found-items` - Report found item
- `PUT /api/found-items/:id/mark-received` - Mark item as received

### Matches
- `GET /api/matches` - Get user's matches
- `POST /api/matches` - Create match
- `PUT /api/matches/:id/accept` - Accept match
- `PUT /api/matches/:id/confirm-return` - Confirm item return
- `PUT /api/matches/:id/reject` - Reject match

### Messages & Notifications
- `POST /api/messages` - Send message
- `GET /api/messages/:matchId` - Get conversation
- `GET /api/notifications` - Get notifications
- `POST /api/direct-messages` - Send direct message

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  rollNumber: String,
  department: String,
  year: String,
  profileImage: String,
  successfulReturns: Number,
  successfulMatches: Number,
  createdAt: Date
}
```

### Item Models (Lost/Found)
```javascript
{
  itemName: String,
  description: String,
  category: String,
  color: String,
  images: [String],
  location: String,
  date: Date,
  time: String,
  reportedBy: ObjectId,
  status: String,
  createdAt: Date
}
```

### Match Model
```javascript
{
  lostItemId: ObjectId,
  foundItemId: ObjectId,
  initiatedBy: ObjectId,
  similarity: Number,
  status: String,
  createdAt: Date
}
```

## 🎨 Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting

## 📱 Features Demonstration

### Reporting Items
1. Users register and create an account
2. Navigate to "Report Lost" or "Report Found"
3. Fill in item details (name, category, color, location, etc.)
4. Upload item images
5. Submit - item is now visible to the community

### Matching System
- Algorithm automatically scores potential matches
- Considers category, color, location, date, and description
- Users receive notifications when matches are found
- Users can accept, confirm, or reject matches

### Communication
- Direct messaging between item reporters and finders
- Real-time notifications via Socket.io
- View conversation history

### Success Tracking
- Profile displays successful returns count
- View all your reported items
- Track item status (Lost, Found, Matched, Received)

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling middleware

## 📄 Environment Configuration

Create `.env` file in backend folder with:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` - Image hosting
- `CLIENT_URL` - Frontend URL
- `PORT` - Server port

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ for educational institutions

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Happy Lost & Found Management! 🎓**

## 📁 All Files in One Place

Everything is now organized in: **`C:\dev\lost-and-found\`**

### File Locations:
- Backend entry: `C:\dev\lost-and-found\backend\server.js`
- Frontend entry: `C:\dev\lost-and-found\frontend\src\App.jsx`
- Environment config: `C:\dev\lost-and-found\backend\.env`

## 🎯 Next Steps

1. ✅ Open `C:\dev\lost-and-found` in VS Code
2. ✅ Create `.env` file in backend folder
3. ✅ Run backend: `cd backend && node server.js`
4. ✅ Run frontend: `cd frontend && npm start`
5. ✅ Visit http://localhost:3002

## 📞 Support

For issues or questions:
- Check SETUP_GUIDE.md for detailed setup
- Review API_DOCUMENTATION.md for API reference
- See DESIGN_GUIDE.md for UI specifications

---

**Ready to launch? Open C:\dev\lost-and-found in VS Code and get started!** 🚀
