import React from "react";
import Header from "./components/Header";
import { ThemeProvider } from "./context/DarkModeContext";
import Router from "./Router/Router";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <ThemeProvider>
          <Header />
          <Router />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;
