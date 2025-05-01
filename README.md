# 📱 Online Mobile Store (MERN Stack)

A full-stack e-commerce application for selling mobile phones, built using the MERN stack (MongoDB, Express, React, Node.js). It features user authentication, role-based access (admin/customer), and CRUD operations for products.

---
## Hosted Link - https://mobile-website-1.onrender.com/login
## 🚀 Features

### 👤 Authentication
- User Signup & Login (JWT based)
- Role-based access control (Admin vs Customer)

### 🛒 Admin Features
- Create, read, update, and delete products
- Admin-only dashboard
- View all products

### 🛍️ Customer Features
- View all available products
- View individual product details
- Search for product

---

## 🧰 Tech Stack

| Frontend  | Backend     | Database |
|-----------|-------------|----------|
| React     | Express.js  | MongoDB  |
| Redux     | Node.js     | Mongoose |
| React Router | JWT Auth |          |

---

## 📂 Folder Structure


---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Pruthviraj3196/online-mobile-store.git

## for Frontend
cd client
npm install
npm run dev

## For Backend
cd server
npm install
npm start

``` 
## Create a .env file in /server with the following:
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

