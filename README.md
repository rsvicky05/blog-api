# Blog API (Node.js + MySQL)

A RESTful Blog API built using Node.js, Express, and MySQL with JWT
Authentication and Role-Based Authorization.

------------------------------------------------------------------------

## 🚀 Features

-   User Registration & Login
-   JWT Authentication
-   Role-based access control (User / Admin)
-   CRUD Operations for Posts
-   CRUD Operations for Comments
-   Ownership-based authorization
-   Centralized error handling
-   Validation middleware
-   Clean layered architecture (Route → Controller → Service → Model)

------------------------------------------------------------------------

## 📂 Project Structure

blog-api/ │ ├── config/ │ └── db.js │ ├── controllers/ │ ├──
authController.js │ ├── postController.js │ └── commentController.js │
├── services/ │ ├── authService.js │ ├── postService.js │ └──
commentService.js │ ├── models/ │ ├── userModel.js │ ├── postModel.js │
└── commentModel.js │ ├── middleware/ │ ├── authMiddleware.js │ ├──
roleMiddleware.js │ ├── errorMiddleware.js │ └── validateMiddleware.js │
├── routes/ │ ├── authRoutes.js │ ├── postRoutes.js │ ├──
commentRoutes.js │ └── adminRoutes.js │ ├── utils/ │ ├──
generateToken.js │ └── AppError.js │ ├── .env ├── app.js ├── server.js
└── package.json

------------------------------------------------------------------------

## ⚙️ Installation

### 1. Clone Repository

git clone `<your-repo-url>`{=html} cd blog-api

### 2. Install Dependencies

npm install

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

PORT=5000 DB_HOST=localhost DB_USER=root DB_PASSWORD=yourpassword
DB_NAME=blogdb JWT_SECRET=supersecretkey JWT_EXPIRES_IN=1h

### 4. Run the Server

npm run dev

------------------------------------------------------------------------

## 🗄 Database Schema

### Users

-   id (INT UNSIGNED, Primary Key)
-   first_name
-   last_name
-   email (UNIQUE)
-   password (hashed)
-   role (user/admin)
-   created_at

### Posts

-   id
-   user_id (Foreign Key → users.id)
-   title
-   content
-   created_at
-   updated_at

### Comments

-   id
-   post_id (Foreign Key → posts.id)
-   user_id (Foreign Key → users.id)
-   comment
-   created_at

------------------------------------------------------------------------

## 🔐 Authentication

All protected routes require:

Authorization: Bearer `<token>`{=html}

------------------------------------------------------------------------

## 📌 API Endpoints

### Auth

POST /api/auth/register POST /api/auth/login

### Posts

POST /api/posts GET /api/posts GET /api/posts/:id PUT /api/posts/:id
DELETE /api/posts/:id

### Comments

POST /api/posts/:postId/comments GET /api/posts/:postId/comments PUT
/api/comments/:id DELETE /api/comments/:id

### Admin (Role: admin)

GET /api/admin/users DELETE /api/admin/posts/:id DELETE
/api/admin/comments/:id

------------------------------------------------------------------------

## 🛡 Security

-   Passwords hashed using bcrypt
-   JWT authentication
-   Role-based authorization
-   Ownership validation
-   Parameterized SQL queries (prevents SQL injection)
-   Centralized error handling

------------------------------------------------------------------------

## 📦 Tech Stack

-   Node.js
-   Express
-   MySQL
-   mysql2
-   bcryptjs
-   jsonwebtoken
-   dotenv

------------------------------------------------------------------------

## 📄 License

MIT
