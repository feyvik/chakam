/** @format */

import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ChakamCard from "./pages/ChakamCard";
import SinglePost from "./components/SinglePost";
import ProtectedRoute from "./ProtectedRoute";
import { DarkModeProvider } from "./provider/DarkModeProvider";

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/feeds"
          element={
            <ProtectedRoute>
              <ChakamCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/single-feed/:id"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </DarkModeProvider>
  );
}

export default App;
