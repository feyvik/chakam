/** @format */

import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 60px;
  h1 {
    font-size: 2rem;
    font-family: "Luckiest Guy", cursive;
    text-align: left;
    span {
      color: #ffffff;
      -webkit-text-stroke: 1px black;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  .card {
    background-color: #ffd600;
    width: 100%;
    padding: 12px 18px;
    border: 4px solid #000000;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    min-height: 200px;
    h2 {
      font-size: 1.5rem;
      font-family: "Luckiest Guy", cursive;
      span {
        color: #ffffff;
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;

function ChakamCommunity() {
  return (
    <PageWrapper>
      <div className="mb-12 text-left">
        <h1 className="mb-4">
          Unleash your boldness with <br /> <span>CHAKAM!</span>
        </h1>
        <p>
          Capture and share your boldest moment with chakam. <br /> Join the
          community of chakam enthusiasts and showcase your creativity.
        </p>
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="up" delay={0.4}>
              <h2 className="mb-4">
                Upload Your Boldest Statement Effortlessly
              </h2>
              <p>
                Share your boldest moments with the world. Upload your
                screenshots, memes, and gotchas in just a few clicks.
              </p>
            </FadeInOnScroll>
          </div>
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="down" delay={0.4}>
              <h2 className="mb-4">
                Engage with the Community Through Reaction
              </h2>
              <p>
                React to your favorite chakam moments and connect with fellow
                enthusiasts. Share your thoughts and join the conversation.
              </p>
            </FadeInOnScroll>
          </div>
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="up" delay={0.4}>
              <h2 className="mb-4">Download and Share Your Favorite Moments</h2>
              <p>
                Download and share your favorite chakam moments with friends and
                family. Spread the boldness!
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ChakamCommunity;
