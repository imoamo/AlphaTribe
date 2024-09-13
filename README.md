# 🐾 AlphaTribe Backend

Welcome to the **AlphaTribe Backend**! This backend powers AlphaTribe's social platform for stock enthusiasts, featuring user authentication, stock posts, comments, and a like system.

---

## 🛠️ Tech Stack

This project uses a modern backend stack for performance and scalability:

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Fast and flexible API routing.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **JWT**: Secure authentication with JSON Web Tokens.
---

## 🚀 Getting Started

Follow the steps below to get the AlphaTribe backend up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+)
- **MongoDB** (local or cloud)
- **MongoDB credentials** (username/password)

---

## 🛠️ Installation

1. Clone the Repository:
  ```bash
      git clone https://github.com/imoamo/AlphaTribe.git
  ```

2. Navigate to the project directory:
  ```bash
    cd AlphaTribe
  ```  
3. Install the dependencies:
  ```bash
    npm install
  ```

## 🌐 API Endpoints
 The AlphaTribe API is designed for flexibility and ease of use. Below is a breakdown of the key endpoints:

## 🧑‍💻 User Authentication & Management
### Register a User

### Endpoint: POST /api/auth/register

Request Body:

```json
  {
     "username": "johndoe",
     "email": "john@example.com",
     "password": "secret"
  }
```
Sample Response:

```json
  {
     "success": true,
     "message": "User registered successfully",
     "userId": "614b1b2d8f9a4e2a3c8b3e7f"
  }
```

## Login a User

### Endpoint: POST /api/auth/login

Request Body:

```json
  {
     "email": "john@example.com",
     "password": "secret"
  }
```

 Sample Response:
```json
  {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
        "id": "614b1b2d8f9a4e2a3c8b3e7f",
        "username": "johndoe",
        "email": "john@example.com"
     }
  }
```

## Get User Profile

### Endpoint: GET /api/user/profile/:userId

Headers:Authorization: Bearer <token>

Sample Response:

```json
  {
     "id": "614b1b2d8f9a4e2a3c8b3e7f",
     "username": "johndoe",
     "bio": "Stock market enthusiast",
     "profilePicture": "https://yourfirebaseapp.com/profilePic.jpg"
  }
```

## Update User Profile

### Endpoint: PUT /api/user/profile

Headers:Authorization: Bearer <token>
Request Body:

```json
  {
     "username": "john_doe_updated",
     "bio": "Updated bio",
     "profilePicture": "https://yourfirebaseapp.com/newProfilePic.jpg"
  }
```

Sample Response:

```json
  {
     "success": true,
     "message": "Profile updated"
  }
```


## 📈 Stock Posts Management

### Create a Stock Post

Endpoint: POST /api/posts

Headers:Authorization: Bearer <token>

Request Body:

```json
  {
     "stockSymbol": "AAPL",
     "title": "Apple stock hitting new highs",
     "description": "Apple stock is up by 10% today",
     "tags": ["apple", "stock", "technology"]
  }
```

Sample Response:

```json
  {
     "success": true,
     "postId": "614b1e9b8f9a4e2a3c8b4e7f",
     "message": "Post created successfully"
  }
```

## Get All Stock Posts (with filters & sorting)

### Endpoint: GET /api/posts

Query Parameters ::=> stockSymbol=AAPL&tags=technology&sortBy=date

Sample Response:

```json
  [
     {
        "postId": "614b1e9b8f9a4e2a3c8b4e7f",
        "stockSymbol": "AAPL",
        "title": "Apple stock hitting new highs",
        "description": "Apple stock is up by 10% today",
        "likesCount": 50,
        "createdAt": "2024-09-13T12:34:56Z"
     }
  ]
```
## Get a Single Stock Post (with comments)

### Endpoint: GET /api/posts/:postId

Sample Response:

```json
  {
     "postId": "614b1e9b8f9a4e2a3c8b4e7f",
     "stockSymbol": "AAPL",
     "title": "Apple stock hitting new highs",
     "description": "Apple stock is up by 10% today",
     "likesCount": 50,
     "comments": [
        {
           "commentId": "614b1f2d8f9a4e2a3c8b4e8e",
           "userId": "614b1b2d8f9a4e2a3c8b3e7f",
           "comment": "Great news!",
           "createdAt": "2024-09-13T13:45:12Z"
        }
     ]
}
```

## Delete a Stock Post

### Endpoint: DELETE /api/posts/:postId

Headers:Authorization: Bearer <token>
Sample Response:

```json
  {
     "success": true,
     "message": "Post deleted successfully"
  }
```

## 💬 Comments Management
### Add a Comment to a Post

Endpoint: POST /api/posts/:postId/comments

Headers:Authorization: Bearer <token>
Request Body:

```json
  {
     "comment": "This is a very insightful post!"
  }
```
Sample Response:

```json
  {
     "success": true,
     "commentId": "614b20f98f9a4e2a3c8b4e9f",
     "message": "Comment added successfully"
  }
```

## Delete a Comment

### Endpoint: DELETE /api/posts/:postId/comments/:commentId

Headers:Authorization: Bearer <token>
Sample Response:

```json
  {
     "success": true,
     "message": "Comment deleted successfully"
  }
```

## ❤️ Like System
### Like a Post

Endpoint: POST /api/posts/:postId/like

Headers: Authorization: Bearer <token>
Sample Response:

```json
  {
     "success": true,
     "message": "Post liked"
  }
```

## Unlike a Post

### Endpoint: DELETE /api/posts/:postId/like
Headers: Authorization: Bearer <token>
Sample Response:

```json
  {
     "success": true,
     "message": "Post unliked"
  }
```


## 🔧 Troubleshooting

Ensure that MongoDB is running locally or you are using a valid cloud connection string.

Verify that the Firebase credentials are valid for storing profile images.

## 👥 Contributing

We welcome contributions from the community! To contribute:

Fork the repository.

Create a new feature branch (git checkout -b feature/new-feature).

Commit your changes (git commit -am 'Add new feature').

Push to the branch (git push origin feature/new-feature).

Open a pull request.
