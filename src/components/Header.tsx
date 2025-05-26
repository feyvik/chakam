/** @format */
import { useEffect, useState, useRef } from "react";
import logo from "../assets/2.png";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth, provider, signInWithPopup, signOut } from "../firebase-config";
import { useDarkMode } from "../hooks/useDarkMode";

const NavWrapper = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "isscrolled" && prop !== "darkmode",
})<{ $isscrolled: boolean; $darkmode: boolean }>`
  background: ${({ $isscrolled, $darkmode }) =>
    $isscrolled
      ? $darkmode
        ? "#1a1a1a"
        : "#fff8f0"
      : $darkmode
      ? "#545454"
      : "#545454"};
  position: ${({ $isscrolled }) => ($isscrolled ? "fixed" : "")};
  z-index: ${({ $isscrolled }) => ($isscrolled ? "1" : "auto")};
  padding: 10px 60px;
  color: #fff;
  width: 100%;
  transition: background 0.3s ease, padding 0.3s ease;
  box-shadow: ${({ $isscrolled }) =>
    $isscrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"};

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .logo {
    width: 100px;
  }

  .more {
    color: ${({ $isscrolled }) => ($isscrolled ? "#545454" : "#fff8f0")};
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
  }

  .dark_mode_toggle {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    padding: unset;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd600;
  }
`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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

  return (
    <NavWrapper $isscrolled={isScrolled} $darkmode={isDarkMode}>
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" width={200} className="logo" />
        </Link>

        <div className="flex gap-2 header_nav">
          {isDarkMode ? (
            <button
              type="button"
              onClick={toggleDarkMode}
              className="dark_mode_toggle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon text-secondary-gold">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleDarkMode}
              className="dark_mode_toggle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun text-secondary-gold">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </button>
          )}

          {user ? (
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => navigate("/feeds")}
                className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                Feeds
              </button>
              <UserProfile />
            </div>
          ) : (
            <button
              onClick={handleCreateClick}
              className="transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
              Join The Fun
            </button>
          )}
        </div>
      </nav>
    </NavWrapper>
  );
}

export default Header;

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex  items-center cursor-pointer">
        <img
          className="w-14 rounded-full h-14 p-1"
          src={user.photoURL}
          alt="Profile"
        />
        <svg
          className="w-6 h-6 more"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <p
                onClick={() => handleLogout()}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Log Out
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
