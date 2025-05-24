/** @format */
import ChakamaGallery from "../components/ChakamaGallery";
import ChakamCommunity from "../components/ChakamCommunity";
import HomeHero from "../components/HomeHero";
import JoinChakam from "../components/JoinChakam";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HomeHero />
      <ChakamCommunity />
      <ChakamaGallery />
      <JoinChakam />
      <Footer />
    </>
  );
}

export default Home;
