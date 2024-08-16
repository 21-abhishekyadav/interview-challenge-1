// WindowWidthContext.js
import React, { createContext, useContext } from 'react';
import useWindowWidth from '../hooks/useWindowWidth'; // Import the custom hook

// Create a Context
const WindowWidthContext = createContext();

// Create a Context Provider Component
export function WindowWidthProvider({ children }) {
  const windowWidth = useWindowWidth(); // Use the custom hook

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
}

// Custom hook to use the context
export function useWindowWidthContext() {
  return useContext(WindowWidthContext);
}
