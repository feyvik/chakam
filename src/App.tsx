/** @format */

import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ChakamCard from "./components/ChakamCard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feeds" element={<ChakamCard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
