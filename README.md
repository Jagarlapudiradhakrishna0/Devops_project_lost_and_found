# 🎓 Lost & Found Management System

> A modern, full-stack web application for managing lost and found items in educational institutions

[![Node.js](https://img.shields.io/badge/Node.js-v18.0+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.0+-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.0+-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3.3+-38B2AC)](https://tailwindcss.com/)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7)](https://render.com/)

---

## 🌐 Live Application

**Production URL:** https://lostandfound-1vzs.onrender.com/

- ✅ **Frontend:** Deployed on Render (React)
- ✅ **Backend API:** https://lostandfound-1vzs.onrender.com (Express)
- ✅ **Database:** MongoDB Atlas (Cloud)
- ✅ **Real-time:** Socket.io enabled
- ✅ **Storage:** Cloudinary integration for images

---

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
- 🔔 **Socket.io** - Real-time messaging and notifications
- 🌍 **Full-Stack MERN** - MongoDB, Express, React, Node.js
- 📸 **Image Upload** - Cloudinary integration for item photos
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Production Ready** - Deployed on Render with MongoDB Atlas

---

## 🏗️ Project Structure

```
lost-and-found/
├── backend/                    # Node.js/Express API
│   ├── config/                # Database & service configs
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth, CORS, error handling
│   ├── models/                # MongoDB schemas (User, Item, Match)
│   ├── routes/                # REST API endpoints
│   ├── server.js              # Express server
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components (Home, Register, etc)
│   │   ├── hooks/             # Auth context & custom hooks
│   │   ├── utils/             # API client & animations
│   │   ├── App.jsx            # Main app component
│   │   └── index.jsx          # React entry point
│   ├── .env.development       # Local development config
│   ├── .env.production        # Production config (Render)
│   └── package.json
│
├── package.json               # Root build scripts
├── Procfile                   # Render deployment config
├── render.yaml                # Render service definition
└── README.md                  # This file
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB Atlas (free tier): https://www.mongodb.com/cloud/atlas

### Installation

**1. Clone repository:**
```bash
git clone https://github.com/Jagarlapudiradhakrishna0/Devops_project_lost_and_found.git
cd Devops_project_lost_and_found
```

**2. Install dependencies:**
```bash
npm run install-all
```

**3. Set up environment variables:**

**Backend** (`backend/.env`):
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lost-and-found
JWT_SECRET=your_secret_key_here
NODE_ENV=production
PORT=5000
```

**Frontend** (`frontend/.env.development`):
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

**4. Start development servers:**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

Access at: **http://localhost:3000**

---

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Items
- `POST /api/lost-items` - Report lost item
- `GET /api/lost-items` - Get all lost items
- `POST /api/found-items` - Report found item
- `GET /api/found-items` - Get all found items

### Matches & Messaging
- `POST /api/matches` - Create item match
- `GET /api/matches` - Get user's matches
- `POST /api/messages` - Send message
- `GET /api/notifications` - Get notifications

---

## 🛠️ Tech Stack

---

## 🚀 Deployment (Render)

The application is **fully deployed and live** at:
### 🌐 https://lostandfound-1vzs.onrender.com/

**Architecture:**
- **Frontend:** React served from backend
- **Backend:** Express.js on Render
- **Database:** MongoDB Atlas
- **Real-time:** Socket.io enabled
- **Storage:** Cloudinary

**Environment Variables Required:**
```bash
# Backend (.env)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lost-and-found
JWT_SECRET=your_secret_key
NODE_ENV=production

# Frontend (.env.production)
REACT_APP_API_URL=https://lostandfound-1vzs.onrender.com/api
REACT_APP_SOCKET_URL=https://lostandfound-1vzs.onrender.com
```

---

## 📧 Contact & Support

**Project Repository:** https://github.com/Jagarlapudiradhakrishna0/Devops_project_lost_and_found

**Issues & Contributions:** Feel free to open issues or submit pull requests on GitHub.

---

## 📄 License

This project is open source and available under the ISC License.
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
