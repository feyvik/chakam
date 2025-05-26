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
    background-color: #ffd600;
    width: 100%;
    padding: 12px 18px;
    border: 4px solid #000000;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    min-height: 200px;
    display: flex;
    justify-content: start;
    align-items: center;
    color: #1a1a1a;
    h2 {
      font-size: 1.5rem;
      font-family: "Luckiest Guy", cursive;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

function ChakamCommunity() {
  return (
    <PageWrapper>
      <div className="mb-12 text-center w-[100%]">
        <span>Savage</span>
        <h1 className="mb-2 mt-4">Unleash Your Wit and Sarcasm</h1>
        <p>
          Chakam lets you express your thoughts with a twist.
          <br className="hidden md:block" /> Share your fake-deep lines and
          watch the hilarity unfold!
        </p>
      </div>

      <div className="w-[100%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="up" delay={0.4}>
              <h2 className="mb-4">Craft Your Fake-Deep Lines</h2>
              <p>Post your most outrageous and humorous lines.</p>
            </FadeInOnScroll>
          </div>
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="down" delay={0.4}>
              <h2 className="mb-4">Experience the Power of Brutal Clapbacks</h2>
              <p>Get ready for the ultimate reality check!</p>
            </FadeInOnScroll>
          </div>
          <div className="grid gap-4 card">
            <FadeInOnScroll direction="up" delay={0.4}>
              <h2 className="mb-4">Engage with Our Upvote System</h2>
              <p>Your favorite responses rise to the top.</p>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ChakamCommunity;
