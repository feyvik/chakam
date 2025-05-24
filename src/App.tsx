/** @format */

import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ChakamCard from "./pages/ChakamCard";
import SinglePost from "./components/SinglePost";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
