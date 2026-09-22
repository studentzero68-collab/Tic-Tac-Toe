# Tic-Tac-Toe

A small React Tic-Tac-Toe app built as a Junior Frontend Intern assignment. The project focuses on React state management, reducer-driven logic, game flow, move history, and responsive design.

## Assignment Purpose
This project demonstrates the key skills expected in a frontend assessment:
- React component structure
- state management with `useReducer`
- reusable game logic utilities
- win and draw detection
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
- blocked occupied squares
- automatic winner detection for rows, columns, and diagonals
- draw detection
- live status updates
- restart button
- move history with time-travel navigation
- responsive layout for mobile and desktop
- keyboard-friendly buttons and clear labels

## Manual Feature
The manual feature is the Restart button. It resets the board, current player, and move history in one action so the game can start again without reloading the page.

## Advanced Feature
The advanced feature is the move history and time-travel flow. Users can jump back to any earlier move and restore the board exactly as it appeared at that point in the game.

## State Management Approach
The main game state is managed through a reducer using React `useReducer`. The reducer handles:
- board updates
- current player changes
- winner and draw state
- restart logic
- move history and previous-state jumps

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

## Assignment Checklist Coverage
- Base game logic implemented
- Winner detection for rows, columns, and diagonals
- Draw detection included
- Restart feature implemented
- `useReducer` state management used
- Move history and time travel included
- Responsive layout and accessibility considered

## Lessons Learned
- reducer-based state is easier to reason about for interactive game logic
- move history makes debugging and state restoration much simpler
- clean status handling reduces edge-case bugs
- responsive CSS keeps gameplay usable across screen sizes
