# DreamCatcher Frontend

This is the frontend service for the **DreamCatcher** platform, built with Vite and React. It provides a responsive and interactive user interface for managing dreams, exploring others' dreams, analyzing data, and interacting with the community. The backend repository can be found [here](https://github.com/FabulousDreams/Backend) .

![DreamCatcher UI](./src/assets/images/Screenshot%202024-11-29%20at%2011.44.47.png 'DreamCatcher UI Screenshot')

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- **Authentication**: Role-based authentication using `useContext` for managing admin and user sessions.
- **Dream Management**:
  - Create and view your own dreams.
  - See the deatil delet or update your dreams
  - Explore public dreams from other users.
  - Add tags, emotions, and upload images to your dreams.
- **Comments**: Comment on your dreams or others' dreams.
- **Analysis**:
  - Visualize dream trends with pie and bar charts.
  - Analyze tags and emotional patterns.
- **Reusable Components**:
  - Custom cards, forms, and analysis widgets.
  - Scalable and modular design for future enhancements.
- **Styling**:
  - Built with SCSS for modular and reusable styling.
  - Material UI icons for a polished and modern interface.

## Technologies

- **Framework**: React with Vite for fast builds and development.
- **State Management**: `useContext` for managing authentication, dreams, and user state.
- **Styling**: SCSS for component-based styling, having general files.
- **UI Components**: Material UI icons.
- **Charting**: Libraries for creating pie and bar charts for dream analysis.

## Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables)).

4. **Run the application**:

   ```bash
   npm run dev
   ```

   This will start the development server. You can access the app at `http://localhost:5173`.

## Project Structure

```plaintext
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable components (Cards, Forms, Charts, etc.)
├── context/        # Authentication and state context
├── pages/          # Page-level components (Home, Profile, DreamManagement, etc.)
├── services/       # API service handlers
├── styles/         # SCSS stylesheets
└── utils/          # Utility functions
```

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
VITE_API_URL=<Backend API Base URL>
VITE_CLOUDINARY_NAME=<Cloudinary Upload URL>
VITE_UNSIGNED_UPLOAD_PRESET=<Your Cloudinary Upload Preset>
```

## Demo

backend repository can be found [here](https://dreamscatcher.netlify.app/)
