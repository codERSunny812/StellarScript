# StellarScript

## Overview
StellarScript is an advanced coding platform that allows users to practice and enhance their problem-solving skills by writing and executing code within a structured environment. The frontend of StellarScript is built using **React.js**, offering an interactive and user-friendly interface.

## Features
- **User Authentication**: Users can sign up and log in securely.
- **Project Management**: Users can create, edit (name only), and delete projects.
- **Home Page**: Displays all created projects.
- **Single Project Page**: View project details and execute code.
- **Code Editor**: A powerful editor with syntax highlighting and auto-suggestions.
- **Language Selection**: Users can select a programming language from available runtimes.
- **Test Cases Execution**: Users can submit their code and check against predefined test cases.
- **Run Code**: Execute code using the Piston API.
- **Logout Feature**: Users can securely log out.
- **Protected Routes**: Ensures only authenticated users can access certain pages.

## Tech Stack
- **React.js** - Frontend library
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side navigation
- **Redux/Zustand** - State management
- **Monaco Editor** - Code editor
- **jswebtoken** - Authentication
- **bcryptjs** - Password hashing
- **Axios/Fetch API** - API calls
- **React Select** - Language selection dropdown

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (>= 16.x)
- npm or yarn

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/codERSunny812/StellarScript.git
   cd stellarscript-frontend
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   REACT_APP_API_BASE_URL=your_backend_url
   ```
4. Start the development server:
   ```bash
   npm start  # or yarn start
   ```

## Project Structure
```
stellarscript-frontend/
│── public/             # Static assets
│── src/
│   ├── components/     # Reusable components
│   ├── images/         # Image assets
│   ├── pages/
│   │   ├── Signup.jsx  # Sign up page
│   │   ├── Login.jsx   # Login page
│   │   ├── Home.jsx    # Home page (list projects)
│   │   ├── Editor.jsx  # Code editor page
│   │   ├── Project.jsx # Single project page
│   ├── App.css         # Global styles
│   ├── App.jsx         # Main application component
│   ├── helper.js       # Utility functions
│   ├── index.css       # Global styles
│   ├── main.jsx        # Entry file
│── .gitignore          # Git ignore file
│── eslint.config.js    # Linting configuration
│── index.html          # Root HTML file
│── package-lock.json   # Dependency lock file
│── package.json        # Dependencies and scripts
│── postcss.config.js   # PostCSS configuration
│── README.md           # Project documentation
│── tailwind.config.js  # Tailwind CSS configuration
│── vite.config.js      # Vite configuration
```

## Implementation Steps

1. **User Authentication**
   - Implement sign-up and login using Clerk or Firebase.
   - Protect routes to ensure only logged-in users can access them.
   - Implement logout functionality.

2. **Project Management**
   - Implement **Create Project** feature.
   - Fetch all runtimes from API: `https://emkc.org/api/v2/piston/runtimes`.
   - Display language options (Python, JavaScript, C, C++, Java, etc.) using React Select.
   - Save project details.

3. **Home Page**
   - Fetch all projects and display them.
   - Implement Edit (only name) and Delete features.

4. **Single Project Page**
   - Display project details.
   - Implement code execution using API: `https://emkc.org/api/v2/piston/execute`.

5. **Code Editor**
   - Integrate Monaco Editor for writing code.
   - Implement **Run Code** feature to execute user code.

6. **Protected Routes**
   - Ensure users can only access certain pages if authenticated.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a pull request.

## License
This project is licensed under the **MIT License**.

## Contact
For any inquiries or contributions, contact:
- **Developer:** Sushil Pandey
- **Email:** your-email@example.com
- **GitHub:** [Your GitHub Profile](https://github.com/yourusername)

