/** @format */
import { useEffect, useState } from "react";
import logo from "../assets/2.png";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth, provider, signInWithPopup, signOut } from "../firebase-config";

const NavWrapper = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "isscrolled",
})<{ $isscrolled: boolean }>`
  background: ${({ $isscrolled }) => ($isscrolled ? "#ffffff" : "#545454")};
  position: ${({ $isscrolled }) => ($isscrolled ? "fixed" : "static")};
  z-index: ${({ $isscrolled }) => ($isscrolled ? "1" : "auto")};
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
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change threshold if needed
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCreateClick = async () => {
    if (user) {
      navigate("/feeds");
    } else {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        uid: result.user.uid,
      };
      setUser(userData);
      navigate("/feeds");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
    setUser(null);
  };

  return (
    <NavWrapper $isscrolled={isScrolled}>
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" width={200} />
        </Link>

        {user ? (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/feeds")}
              className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
              Feeds
            </button>

            <button
              onClick={() => handleLogout()}
              className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleCreateClick}
            className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
            Login with Google
          </button>
        )}
      </nav>
    </NavWrapper>
  );
}

export default Header;
