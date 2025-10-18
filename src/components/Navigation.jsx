import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import profileImg from "../assets/profile.jpeg";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [distance, setDistance] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // approximate location
  const emilyLocation = { lat: 32.0584, lng: 118.7965 };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
  };

  // Typing animation effect
  useEffect(() => {
    if (distance !== null) {
      const fullText = `you are ${distance.toLocaleString()} miles away from zsh`;
      setIsTyping(true);
      setTypedText("");

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 50); // 50ms per character

      return () => clearInterval(typingInterval);
    }
  }, [distance]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const dist = calculateDistance(userLat, userLng, emilyLocation.lat, emilyLocation.lng);
          setDistance(Math.round(dist));
        },
        () => {
          setLocationError("Location access denied");
        }
      );
    } else {
      setLocationError("Geolocation not supported");
    }
  }, []);

  // Close mobile menu when clicking outside or on navigation link
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-nav-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: "/", label: "Main" },
    { path: "/about", label: "About" },
    { path: "/writing", label: "Writing" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button - Top Left */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md glass mobile-nav-container"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile Navigation Overlay - Always present for blur preload */}
      <div
        className={`lg:hidden fixed inset-0 z-40 mobile-nav-container transition-all duration-200 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: isMobileMenuOpen ? "rgba(0, 0, 0, 0.2)" : "transparent",
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-80 max-w-[85vw] h-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-r border-white/20 dark:border-white/10 transform transition-transform duration-250 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <nav>
              <div className="flex flex-col items-center gap-4 mb-8">
                <img
                  src={profileImg}
                  onClick={() => navigate("/")}
                  alt="Profile"
                  className="w-50 max-w-[60vw] object-cover cursor-pointer"
                />

                {/* Social Media Icons */}
                <div className="flex space-x-6 justify-between w-50 max-w-[60vw] ">
                  <a
                    href="https://www.youtube.com/@integraloftime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                    </svg>
                  </a>

                  <a
                    href="https://x.com/integraloftime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  </a>

                  <a
                    href="mailto:integraloftime@gmail.com"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/integraloftime/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                {navItems.map((item) => (
                  <div key={item.path} className="relative">
                    <Link
                      to={item.path}
                      onClick={handleNavClick}
                      className={`block text-3xl transition-colors italic duration-200 hover:text-primary ${
                        location.pathname === item.path ||
                        (item.path === "/" && location.pathname.startsWith("/work/"))
                          ? "text-primary"
                          : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                {distance !== null && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
                    </div>

                    <p className="text-sm text-secondary">
                      {typedText}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </p>
                  </div>
                )}
                {locationError && <p className="text-sm text-muted italic">location unknown</p>}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <img
            src={profileImg}
            onClick={() => navigate("/")}
            alt="Profile"
            className="w-50 max-w-[60vw] object-cover cursor-pointer"
          />

          {/* Social Media Icons */}
          <div className="flex flex-row mb-8 justify-between w-50 max-w-[60vw] ">
            <a
              href="https://www.youtube.com/@integraloftime"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
              </svg>
            </a>

            <a
              href="https://x.com/integraloftime"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="mailto:integraloftime@gmail.com"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/integraloftime/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-6">
          {navItems.map((item) => (
            <div key={item.path} className="relative">
              {/* Arrow indicator for selected item - positioned absolutely to not affect text alignment
              {location.pathname === item.path && (
                <img 
                  src={arrowImg} 
                  alt="Selected" 
                  className="absolute left-[-20px] top-2/5 transform -translate-y-1/2 w-4 h-4 object-contain"
                />
              )} */}

              <Link
                to={item.path}
                className={`block text-3xl italic transition-colors duration-200 hover:text-primary ${
                  location.pathname === item.path ||
                  (item.path === "/" && location.pathname.startsWith("/work/"))
                    ? "text-primary"
                    : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {distance !== null && (
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>

              <p className="text-sm text-secondary">
                {typedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          )}
          {locationError && <p className="text-sm text-muted italic">location unknown</p>}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
