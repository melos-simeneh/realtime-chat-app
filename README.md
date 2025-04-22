
# 💬 Real-Time Chat App

A full-stack real-time chat application built using **React**, **Node.js**, **Express**, **Socket.io**, and **MongoDB**. Users can register, log in, and chat in real-time.

## 🚀 Features

- User Authentication (Register & Login)

- Real-time messaging using Socket.IO

- Persistent chat history stored in MongoDB

- Online/offline user status

- Responsive UI with React

## 🛠️ Tech Stack

- **Frontend**: React, Socket.IO Client

- **Backend**: Node.js, Express, Socket.IO

- **Database**: MongoDB

- **Authentication**: JWT, bcrypt

## 📁 Project Structure

```bash
/frontend        # React client
/backend        # Node.js server
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/melos-simeneh/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a .env file inside the server directory:

```ini
NODE_ENV=development #for production set it to production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

The backend server  will be available at [http://localhost:5000](http://localhost:5000)

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Start the React app:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)
