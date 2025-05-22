/** @format */

import ChakamaGallery from "../components/ChakamaGallery";
import ChakamCommunity from "../components/ChakamCommunity";
import HomeHero from "../components/HomeHero";
import JoinChakam from "../components/JoinChakam";
function Home() {
  return (
    <>
      <HomeHero />
      <ChakamCommunity />
      <ChakamaGallery />
      <JoinChakam />
    </>
  );
}

export default Home;
