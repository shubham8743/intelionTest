import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import RoutesList from "./RouteList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css"

const App = () => {
  return (
    <div>
    <Header />
      <Router>
        <RoutesList />
      </Router>
    <Footer />
    </div>
  );
}

export default App;
