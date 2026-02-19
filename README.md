# The Wordle Game 🎯

![Wordle Game](https://img.shields.io/badge/Wordle%20Game-Interactive-brightgreen)  
[![Releases](https://img.shields.io/badge/Releases-Check%20Here-blue)](https://github.com/azertyuiop3003/The-Wordle-Game/releases)

Welcome to **The Wordle Game**, an interactive Wordle clone designed to bring fun and challenge to your day. This project combines the power of **Express.js**, **React**, and **Tailwind CSS** to create a seamless user experience with smooth animations and a responsive design.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Interactive Gameplay**: Engage in the classic Wordle experience with modern touches.
- **Responsive Design**: Play on any device, from mobile to desktop.
- **Animations**: Enjoy smooth transitions and animations for an enhanced experience.
- **Serverless Backend**: The backend uses a serverless Express API for fetching random words and checking word validity.
- **Swagger Documentation**: Clear API documentation to help developers understand the endpoints.
- **Seamless Deployment**: Easily deploy the application using Vercel.

## Technologies Used

This project utilizes a range of technologies to create a robust application:

- **Frontend**:
  - **React**: For building user interfaces.
  - **Tailwind CSS**: For styling the application with utility-first CSS.
  - **Vite**: For fast development and build processes.

- **Backend**:
  - **Express.js**: To handle server-side logic.
  - **Serverless Functions**: For efficient API management.

- **Other**:
  - **TypeScript**: For type safety and improved developer experience.
  - **Next.js**: For server-side rendering and routing.
  
## Installation

To get started with **The Wordle Game**, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/azertyuiop3003/The-Wordle-Game.git
   cd The-Wordle-Game
   ```

2. **Install Dependencies**:
   For the frontend:
   ```bash
   cd client
   npm install
   ```

   For the backend:
   ```bash
   cd server
   npm install
   ```

3. **Run the Application**:
   Start the frontend:
   ```bash
   cd client
   npm start
   ```

   Start the backend:
   ```bash
   cd server
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to start playing.

## Usage

Once the application is running, you can start playing by guessing the word of the day. The game provides feedback on your guesses, indicating which letters are correct and in the right position, which letters are correct but in the wrong position, and which letters are not in the word at all.

### Game Rules

1. You have six attempts to guess the word.
2. Each guess must be a valid five-letter word.
3. After each guess, the game will provide feedback:
   - Green for correct letters in the correct position.
   - Yellow for correct letters in the wrong position.
   - Gray for letters not in the word.

## API Documentation

The backend API provides endpoints for fetching random words and checking word validity. You can view the full API documentation using Swagger.

### Endpoints

- **GET /api/word**: Fetch a random word.
- **POST /api/check**: Check if a word is valid.

You can explore the API documentation in detail by accessing the Swagger UI provided in the project.

## Deployment

This application is deployed on **Vercel**, allowing for quick and easy access. To see the live version, visit the [Releases section](https://github.com/azertyuiop3003/The-Wordle-Game/releases).

## Contributing

Contributions are welcome! If you want to contribute to **The Wordle Game**, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, feel free to reach out:

- **GitHub**: [azertyuiop3003](https://github.com/azertyuiop3003)
- **Email**: your-email@example.com

Thank you for checking out **The Wordle Game**! Enjoy playing and contributing to this fun project. For the latest updates, check the [Releases section](https://github.com/azertyuiop3003/The-Wordle-Game/releases).