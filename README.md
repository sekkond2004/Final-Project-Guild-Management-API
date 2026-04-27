# Guild Management API
A RESTful backend API built with Node.js, Express, and Sequelize that allows users to manage gaming guilds, groups, and members. The API includes JWT authentication, role-based authorization (RBAC), and relational database support.

This project demonstrates backend development concepts including secure authentication, role permissions, structured API design, database relationships, and production deployment.

# Features
- RESTful API using Express
- Relational database using Sequelize ORM
- SQLite database for development
- JWT authentication (register + login)
- Role-based authorization (RBAC)
- Guild join request system
- CRUD operations for multiple resources
- Error handling and request logging
- Unit testing with Jest/Supertest
- Production deployment support (Render)
- Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- Jest & Supertest (testing)

# Project Structure
Final-Project-Guild-Management-API
│
├── config
│   └── database.js
│
├── models
│   ├── guild.js
│   ├── user.js
│   ├── group.js
│   └── joinRequest.js
│
├── routes
│   ├── authRoutes.js
│   ├── guildRoutes.js
│   ├── userRoutes.js
│   ├── groupRoutes.js
│   └── requestRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── asyncHandler.js
│   └── logger.js
│
├── tests
│   └── api.test.js
│
├── database/
│   └── seed.js
│
├── .env
├── package-lock.json
├── package.json
├── server.js
└── README.md

