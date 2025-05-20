/** @format */

import styled from "styled-components";
import lady from "../assets/4.mp4";
import logo from "../assets/logo.png";

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: #545454;
  color: #fff;

  img {
    width: 100px;
  }
`;

const VideoSection = styled.section`
  width: 100%;
  box-sizing: border-box;

  video {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    video {
      max-height: 50vh;
    }
  }
`;

function Home() {
  return (
    <PageWrapper>
      <Nav>
        <img className="animate-pulse" src={logo} alt="logo" />
        <button className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
          Upload
        </button>
      </Nav>

      <VideoSection>
        <video autoPlay muted className="video-background">
          <source src={lady} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoSection>
    </PageWrapper>
  );
}

export default Home;
