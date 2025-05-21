/** @format */
import { useEffect, useState } from "react";
import logo from "../assets/2.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavWrapper = styled.nav<{ isScrolled: boolean }>`
  background: ${({ isScrolled }) => (isScrolled ? "#ffffff" : "#545454")};
  position: ${({ isScrolled }) => (isScrolled ? "fixed" : "")};
  z-index: ${({ isScrolled }) => (isScrolled ? "1" : "")};
  padding: 20px 60px;
  color: #fff;
  width: 100%;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  img {
    width: 100px;
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change threshold if needed
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <NavWrapper isScrolled={isScrolled}>
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" width={200} />
        </Link>

        <Link to="/feeds">
          <button className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
            Create Card
          </button>
        </Link>
      </nav>
    </NavWrapper>
  );
}

export default Header;
