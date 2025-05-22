/** @format */

import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { ChakamImage, type Image } from "../components/ChakamImage";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 60px;
  background-color: #1a1a1a;
  h1 {
    font-size: 2rem;
    font-family: "Luckiest Guy", cursive;
    text-align: center;
    color: #fff8f0;
    span {
      color: #ff4d00;
      -webkit-text-stroke: 1px black;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  p {
    color: #fff8f0;
  }

  card {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

function ChakamaGallery() {
  return (
    <PageWrapper>
      <div className="mb-12 text-center text-dark">
        <h1 className="mb-4">
          Say it loud, say it with proud <br /> <span>CHAKAM!</span>
        </h1>
        <p>
          Explore the boldest, funniest, and most savage <br /> Chakam moments
          from the internet. Screenshots. Memes. Gotchas. All in one place.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ChakamImage.map((item: Image) => (
          <div key={item.id} className="grid gap-4 card">
            <div className={`${item.side}`}>
              <FadeInOnScroll direction={item.direction} delay={0.4}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={item.image}
                  alt={item.side}
                  height={100}
                />
              </FadeInOnScroll>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

export default ChakamaGallery;
