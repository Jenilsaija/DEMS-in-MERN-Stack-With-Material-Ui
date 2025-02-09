# Expense Management App (MERN Stack + Material UI)

## Overview

This is a simple Expense Management application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with Material UI for styling. The app allows users to track their expenses, manage categories, and view spending.

## Features

- User Authentication (Login/Signup)
- Add, Edit, and Delete Expenses
- Categorize Expenses
- Monthly Expense Summary
- Responsive UI with Material UI
- Secure Backend with JWT Authentication

## Tech Stack

### Frontend:

- React.js
- Material UI
- Axios
- Redux (if used for state management)

### Backend:

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js (for password hashing)

## Installation & Setup

### Prerequisites:

Ensure you have the following installed on your system:

- Node.js
- MongoDB

### Steps to Run Locally:

#### Clone the Repository:

```sh
git clone https://github.com/yourusername/expense-management.git
cd expense-management
```

#### Install Dependencies:

##### Backend:

```sh
cd backend
npm install
```

##### Frontend:

```sh
npm install
```

#### Configure Environment Variables:

add mongodb uri in the backend\db.js

#### Start the Application:

##### Start Backend Server:

```sh
cd server
npm start
```

##### Start Frontend:

```sh
npm start
```

The application will run on `http://localhost:3000`.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.
