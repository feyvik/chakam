/** @format */

import styled from "styled-components";
import logo from "../assets/2.png";
import FadeInOnScroll from "../components/FadeInOnScroll";
import bg from "../assets/bg.jpg";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  .content_two {
    p {
      font-size: 1.5rem;
      font-family: "Luckiest Guy", cursive;
      span {
        color: #ff4d00;
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }
  }
  .heroCard {
    padding: 60px 60px;
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
        color: #ff4d00;
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;

const AnimatedCard = styled.div`
  width: 400px;
  background-color: #000000;
  color: #ffffff;
  height: 200px;
  padding: 12px 18px;
  border: 4px solid #ff4d00;
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
      color: #ff4d00;
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
        <img src={logo} alt="logo" width={200} />
        <button className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
          Create Card
        </button>
      </Nav>
      <div className="heroCard">
        <InfoCard className="mb-12">
          <FadeInOnScroll direction="down" delay={0.4}>
            <div className="card_top bg-white">
              <h2>
                Discover the Exciting Rise of the <span>CHAKAM</span> Trend
                Among Nigerian Gen Z
              </h2>
            </div>
          </FadeInOnScroll>
        </InfoCard>
        <div className="content_one">
          <FadeInOnScroll direction="left" delay={0.4}>
            <AnimatedCard className="ml-auto">
              <h2>
                CAPTURE THE <span>CHAKAM</span> MOMENT
              </h2>
              <h2>EVIDENCE CHOKE</h2>
            </AnimatedCard>
          </FadeInOnScroll>
        </div>
        <div className="content_two">
          <FadeInOnScroll direction="right" delay={0.4}>
            <AnimatedCard className="">
              <p>
                Join the <span>CHAKAM</span> Movement and Make Your Voice Heard
              </p>
            </AnimatedCard>
          </FadeInOnScroll>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;
