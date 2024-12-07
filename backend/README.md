# DreamCatcher Backend

This is the backend for the **DreamCatcher** application, a platform where users can log, analyze, and explore their dreams. The backend is built with **Express.js** and provides a RESTful API for managing user profiles, dreams, comments, and analytics. 

The frontend repository can be found here: [DreamCatcher Frontend](https://github.com/FabulousDreams/Frontend).

![DreamCatcher UI](./image/Screenshot%202024-11-29%20at%2011.44.47.png)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
  - [Dream Routes](#dream-routes)
  - [Comment Routes](#comment-routes)
  - [Analysis Routes](#analysis-routes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User Authentication: sign up, login, and token verification using JWT.
- Dream Management: add, view, edit, and delete dreams.
- Commenting: add, update, and delete comments on dreams.
- Data Analysis: analyze trends, emotions, and tags from dream entries.
- Admin Control: manage users and view public dream data.
- Public and Private Content: manage visibility of dream entries.

---

## Installation

1. Clone the repository:
   ```bash
   git clone 
   cd DreamCatcher-Backend 
   ```

2. Install deoendencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
- Create a .env file in the root directory
- Add the following: 
    ```makefile
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_jwt_secret
   ```
4. Start the Server
    ```bash
    npm start
    ```

---

## Environment Variables

| Variable     | Description | 
| --------- | -----------   |
| PORT	       | Port number for the server |
| MONGO_URI    | MongoDB connection string |
| TOKEN_SECRET | Secret key for JWT generation |

---

## API Documentation

### Authentication Routes

|Method     | Endpoint | Description |
| --------- | -----------   | ------- |
| POST       | /auth/signup | Register a new user |
| POST    | /auth/login | Log in and receive a JWT |
| GET | /auth/verify | Verify the user's JWT |

### User Routes

|Method     | Endpoint | Description |
| --------- | -----------   | ------- |
| GET      | /profile | Get the authenticated user's profile |
| PUT   | /profile | Update the authenticated user's profile |

### Admin Routes

|Method     | Endpoint | Description |
| --------- | -----------   | ------- |
| GET      | /admin/users| Get a list of all users (Admin only) |
| DELETE  | /admin/users/:id | Delete a user by ID (Admin only) |
| GET | /admin/dreams | Get all public dreams (Admin only) |

### Dream Routes

|Method     | Endpoint | Description |
| --------- | -----------   | ------- |
| GET      | /dreams/public | Get all public dreams |
| GET | /dreams/mine | Get the authenticated user's dreams |
| GET | /dreams/:id | Get details of a specific dream |
| POST | /dreams | Create a new dream |
| PUT | /dreams/:id | Update details of an existing dream |
| DELETE | /dreams/:id | Delete a dream by its ID |

### Comment Routes

|Method     | Endpoint | Description |
| --------- | -----------   | ------- |
| GET      | /comments/dream/:dreamId | Get all comments for a specific dream |
| POST | /comments | Add a comment to a dream |
| PUT | /comments/:id | Update a comment by ID |
| DELETE | /comments/:id | Delete a comment by ID |

### Analysis Routes

|Method     | Endpoint | Description |
| --------- | -----------   | ------- |
| GET      | /analysis/emotions	 | Analyze dream emotions |
| GET | /analysis/tags | Analyze dream tags |
| GET | /analysis/trends | Analyze trends in dream logging |

---

## Future Features

- **AI Integration**: using natural language processing (NLP) to analyze dream descriptions for common themes or predict emotions.
- **Dream Sharing**: users can share public dreams via social media or direct links.
- **Advanced Analytics**: Deeper insights into dream patterns, including correlations between emotions and themes.

---

## Contributing 

Contribuitions are welcome! Please, follow these steps:

1. Fork this repository.
2. Create a new branch: git checkout -b feature-name.
3. Commit your changes: git commit -m "Add a new feature".
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

---

## Contact

For questions or support, contact the project maintainers:

- Mona Eslahkonha: [GitHub Profile](https://github.com/monaeslah).
- Mari Victorino: [GitHub Profile](https://github.com/mavictorino).

- Alternatively, open an issue in the repository.