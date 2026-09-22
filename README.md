# Tic-Tac-Toe

A small React Tic-Tac-Toe app built as a Junior Frontend Intern assignment. The project focuses on React state management, reducer-driven logic, game flow, move history, and responsive design.

## Assignment Purpose
This project demonstrates the core skills expected in a frontend assessment:
- React component structure
- state management with `useReducer`
- game logic and win/draw detection
- responsive UI design
- accessible controls
- move history and time-travel interaction

## Technologies Used
- React
- Vite
- JavaScript
- CSS

## Features
- 3x3 Tic-Tac-Toe board
- alternating X and O turns
- occupied-square prevention
- automatic winner detection for rows, columns, and diagonals
- draw detection
- dynamic status text
- restart button
- move history with time-travel navigation
- responsive layout for mobile and desktop
- keyboard-accessible buttons

## State Management Approach
The main game state is managed through a reducer using React `useReducer`. The reducer handles:
- board updates
- current player changes
- winner and draw state
- restart logic
- move history and jumping to earlier moves

## Advanced Feature
The advanced feature is move history with time travel. Users can move backward through the game history and restore the board to a previous turn without breaking the game state.

## Installation
```bash
npm install
```

## Run Locally
```bash
npm run dev
```

## Production Build
```bash
npm run build
```

## Deployment
This app is ready for deployment on Netlify or Vercel as a static React/Vite project.

## GitHub Repository
https://github.com/studentzero68-collab/Tic-Tac-Toe.git

## Lessons Learned
- reducer-based state is cleaner and easier to reason about for game logic
- move history makes UI state easier to debug and restore
- clear status handling reduces edge-case bugs
- responsive CSS keeps the game usable across different screen sizes
