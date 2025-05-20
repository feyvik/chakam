/** @format */

import styled from "styled-components";
// import lady from "../assets/4.mp4";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  position: relative;
  .content_one {
    position: absolute;
    bottom: 10%;
    right: 0;
    margin: 0 2rem;
  }
  .content_two {
    position: absolute;
    top: 280px;
    left: 0;
    margin: 0 2rem;
    p {
      font-size: 1.5rem;
      font-family: "Luckiest Guy", cursive;
      span {
        color: #ffffff;
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }
  }
  .content_three {
    position: absolute;
    bottom: 0px;
    left: 40%;
    margin: 0 2rem;
    span {
      color: #ffffff;
      -webkit-text-stroke: 1px black;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      font-family: "Luckiest Guy", cursive;
      font-size: 1.2rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  color: #fff;

  img {
    width: 100px;
  }
`;

const InfoCard = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5rem;
  .card_top {
    width: 400px;
    height: 200px;
    padding: 12px 18px;
    border: 4px solid #000000;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    h2 {
      font-size: 1.5rem;
      font-family: "Luckiest Guy", cursive;
      span {
        color: #ffa500;
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
// 4d3e39 a05e42

const AnimatedCard = styled.div`
  width: 400px;
  background-color: #ffa500;
  height: 200px;
  padding: 12px 18px;
  border: 4px solid #000000;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  h2 {
    font-size: 1.5rem;
    font-family: "Luckiest Guy", cursive;
    span {
      color: #ffffff;
      -webkit-text-stroke: 1px black;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  p {
    font-size: 1.2rem;
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
      <InfoCard>
        <div className="card_top bg-white animate-pulse-slow">
          <h2>
            Discover the Exciting Rise of the <span>CHAKAM</span> Trend Among
            Nigerian Gen Z
          </h2>
        </div>
      </InfoCard>
      <div className="content_one">
        <AnimatedCard className="animate-fade-in">
          <h2>
            CAPTURE THE <span>CHAKAM</span> MOMENT
          </h2>

          <h2>EVIDENCE CHOKE</h2>
        </AnimatedCard>
      </div>

      <div className="content_two">
        <AnimatedCard className="animate-pulse">
          <p>
            Join the <span>CHAKAM</span> Movement and Make Your Voice Heard
          </p>
        </AnimatedCard>
      </div>
    </PageWrapper>
  );
}

export default Home;
