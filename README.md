# Social Media App

A fully functional social media application built with the MERN stack (MongoDB, Express, React, Node.js). Users can create accounts, post updates, follow other users, like posts, chat with each others and more.

<!--
## Live Demo

<a href="https://webproject-pied.vercel.app/" target="_blank">Mesa Verde Bank</a>

## Demo Video

Check out the demo video below:

[![Demo Video](https://github.com/jebalirami7/mesa-verde-bank/assets/138411253/2f54ca44-1ca2-4f7d-9dad-181176935ab0)](https://github.com/jebalirami7/mesa-verde-bank/assets/138411253/a5f08b26-c3e7-4254-b9a1-5207f44d318d)
-->

## Key Features

- User Authentication (JWT-based)
- Create, edit, and delete posts
- Like, comment, and follow other users
- Real-time messaging.
- Responsive design
- Profile editing and uploading profile pictures
- Explore posts from other users
- Search functionality
- Backend API using Node.js and Express

## Tech Stack

**Frontend:**

- React
- React Router (for navigation)
- Axios (for HTTP requests)

**Backend:**

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT (for authentication)
- Bcrypt.js (for password hashing)

**Database:**

- MongoDB (NoSQL)

**Tools:**

- Git & GitHub for version control
- Vercel for deployment
- Postman for API testing

## Installation

1. **Clone the Repository**
2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

```bash
# Install backend dependencies
npm run backend-install

# Install frontend dependencies
npm run frontend-install

# Install concurrently
npm install
```

3. **Set Up Environment**: Configure the environment variables required for database connections, API integrations, etc.

```bash
# Enviroment variables template :
PORT = 5000
JWT_KEY = 123456
CLIENT_URL = "http://localhost:5173"
MONGO_URL = "mongodb://127.0.0.1:27017/social_media"
```

4. **Run the Application**

```bash
# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run backend

# Run the React client only
npm run frontend
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Authors

- [Ranim Abker](https://github.com/Abker-Ranim)

