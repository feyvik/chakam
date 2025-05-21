/** @format */

import styled from "styled-components";
import FadeInOnScroll from "../components/FadeInOnScroll";
import ChakamUpload from "./ChakamUpload";
import { ChakamImage, type Image } from "../components/ChakamImage";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 60px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  .timeline {
    position: relative;
    max-width: 1800px;
    color: #000000;
  }

  .timeline::after {
    content: "";
    position: absolute;
    width: 6px;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }

  .right {
    left: 50%;
  }

  .timeline__content {
    padding: 30px 0;
    position: relative;
    background-color: inherit;
    width: 50%;
    word-wrap: break-word;
  }

  .timeline__content::after {
    background-color: #fefefe;
  }

  .right::after {
    left: -13px;
  }

  .timeline__content::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 25px;
    right: -12px;
    background-color: inherit;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }

  .timeline::after {
    content: "";
    position: absolute;
    width: 6px;
    border-radius: 8px;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }

  .left {
    left: 0;
  }

  .timeline__content {
    padding: 30px 20px;
    position: relative;
    background-color: inherit;
    width: 50%;
    word-wrap: break-word;
  }

  .col {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    justify-content: center;
  }

  .content {
    overflow: hidden;
    transition: color 0.3s ease;
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    height: 400px;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  @media screen and (max-width: 899px) {
    .timeline::after {
      left: 10px;
    }
    .timeline__content::before {
      left: 0;
      border: medium solid #fff;
      border-width: 10px 10px 10px 0;
      border-color: transparent #fff transparent transparent;
    }
    .left::after,
    .right::after {
      left: -10px !important;
    }
    .timeline__content {
      width: 100%;
      padding: 30px 0;
    }
    .right {
      left: 0;
    }
  }

  .content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #2a292c;
    z-index: 0;
    transition: width 0.5s ease;
  }
`;

function ChakamCard() {
  return (
    <PageWrapper>
      <ChakamUpload />
      <div className="row m-0">
        <div className="col">
          <div className="timeline">
            {ChakamImage.map((item: Image) => (
              <div key={item.id} className={`timeline__content ${item.side}`}>
                <FadeInOnScroll direction={item.direction} delay={0.4}>
                  <div className="content">
                    <img src={item.image} alt={item.side} height={100} />
                  </div>
                </FadeInOnScroll>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ChakamCard;
