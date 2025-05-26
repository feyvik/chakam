/** @format */
import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";
import bg from "../assets/bg.jpg";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  .page_header {
    min-height: 40vh;
    padding: 60px 60px;
    text-align: center;
  }
  h1 {
    font-size: 2.5rem;
    font-family: "Luckiest Guy", cursive;
  }
`;

const ContentWrapper = styled.div`
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

  @media (max-width: 768px) {
    .heroCard {
      padding: 60px 20px;
    }
  }
`;

const InfoCard = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card_top {
    color: #1a1a1a;
    width: 400px;
    min-height: 200px;
    padding: 12px 18px;
    border: 4px solid #1a1a1a;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    background: #fff8f0;
    h2 {
      font-size: 1.5rem;
      font-family: "Luckiest Guy", cursive;
      span {
        color: #ff4d00;
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const AnimatedCard = styled.div`
  width: 400px;
  background-color: #fff8f0;
  color: #1a1a1a;
  min-height: 200px;
  padding: 12px 18px;
  border: 4px solid #1a1a1a;
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

  @media (max-width: 576px) {
    width: 100%;
  }
`;

function HomeHero() {
  return (
    <PageWrapper>
      <FadeInOnScroll direction="up" delay={0.4}>
        <div className="page_header">
          <h1>
            Unleash Your Wit, <br className="hidden md:block" /> Embrace the
            Savage Fun
          </h1>
          <p>
            Join Chakam, the social app where humor meets reality.
            <br className="hidden md:block" /> Post your most outrageous lines
            and watch as the truth comes crashing in with hilarious responses!
          </p>
        </div>
      </FadeInOnScroll>

      <ContentWrapper>
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
          <div className="content_one mb-12">
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
                  Join the <span>CHAKAM</span> Movement and Make Your Voice
                  Heard
                </p>
              </AnimatedCard>
            </FadeInOnScroll>
          </div>
        </div>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default HomeHero;
