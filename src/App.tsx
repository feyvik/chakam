/** @format */

import "./index.css";
import Home from "./pages/Home";
import ChakamaGallery from "./components/ChakamaGallery";
import ChakamCommunity from "./components/ChakamCommunity";
import Footer from "./components/Footer";
// import ChakamCard from "./components/ChakamCard";

function App() {
  return (
    <>
      <Home />
      <ChakamCommunity />
      <ChakamaGallery />
      <Footer />
    </>
  );
}

export default App;
