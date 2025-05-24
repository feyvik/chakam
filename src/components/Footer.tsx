/** @format */
import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  min-height: 10vh;
  padding: 20px 60px;
  footer {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.45);
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <footer className="bg-dark rounded-lg">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="">© 2025 CHAKAM . All Rights Reserved.</span>
          <ul className="flex flex-wrap items-center mt-3">
            <li>Coded with with ❤️</li>
          </ul>
        </div>
      </footer>
    </FooterWrapper>
  );
}

export default Footer;
