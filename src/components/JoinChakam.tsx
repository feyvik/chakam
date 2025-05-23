/** @format */

import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 2rem;
    font-family: "Luckiest Guy", cursive;
  }

  .card {
    background-color: #333333;
    color: #fff8f0;
    width: 100%;
    padding: 12px 18px;
    border: 4px solid #ff4d00;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    min-height: 200px;
    display: flex;
    justify-content: start;
    align-items: center;
    h2 {
      font-size: 1.5rem;
      font-family: "Luckiest Guy", cursive;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

function JoinChakam() {
  return (
    <PageWrapper>
      <div className="mb-12 text-center w-[100%]">
        <span>Engage</span>
        <h1 className="mb-2 mt-4">Join the Fun Today</h1>
        <p>Experience the thrill of witty exchanges and laughter.</p>
      </div>

      <div className="w-[100%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="up" delay={0.4}>
              <p>Engagement</p>
              <h2 className="my-4">How to Get Started </h2>
              <p>Post your thoughts and get real responses.</p>
            </FadeInOnScroll>
          </div>
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="down" delay={0.4}>
              <p>Responses</p>
              <h2 className="my-4">Get Involved</h2>
              <p>Respond to others and share your perspective.</p>
            </FadeInOnScroll>
          </div>
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="up" delay={0.4}>
              <p>Vote</p>
              <h2 className="my-4">Make Your Mark</h2>
              <p>Upvote your favorite replies and join the fun.</p>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default JoinChakam;
