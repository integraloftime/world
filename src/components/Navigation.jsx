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
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.428.403.59.211 1.011.465 1.455.909.444.444.698.865.909 1.455.163.458.347 1.258.403 2.428.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.428-.211.59-.465 1.011-.909 1.455-.444.444-.865.698-1.455.909-.458.163-1.258.347-2.428.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.428-.403-.59-.211-1.011-.465-1.455-.909-.444-.444-.698-.865-.909-1.455-.163-.458-.347-1.258-.403-2.428C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.428.211-.59.465-1.011.909-1.455.444-.444.865-.698 1.455-.909.458-.163 1.258-.347 2.428-.403C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.013 7.052.072 5.77.131 4.911.349 4.12.655 3.227 1 2.446 1.472 1.68 2.238.914 3.004.441 3.785.097 4.678c-.306.791-.524 1.65-.583 2.932C-.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.059 1.282.277 2.141.583 2.932.344.893.817 1.674 1.583 2.44.766.766 1.547 1.239 2.44 1.583.791.306 1.65.524 2.932.583C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.059 2.141-.277 2.932-.583.893-.344 1.674-.817 2.44-1.583.766-.766 1.239-1.547 1.583-2.44.306-.791.524-1.65.583-2.932.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.282-.277-2.141-.583-2.932C22.558 3.785 22.085 3.004 21.319 2.238 20.553 1.472 19.772 1 18.879.655 18.088.349 17.229.131 15.948.072 14.668.013 14.259 0 12 0zM12 5.838A6.162 6.162 0 105.838 12 6.162 6.162 0 0012 5.838zm0 10.162A4 4 0 1116 12a4 4 0 01-4 4zm6.406-11.845a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"/>
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
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.428.403.59.211 1.011.465 1.455.909.444.444.698.865.909 1.455.163.458.347 1.258.403 2.428.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.428-.211.59-.465 1.011-.909 1.455-.444.444-.865.698-1.455.909-.458.163-1.258.347-2.428.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.428-.403-.59-.211-1.011-.465-1.455-.909-.444-.444-.698-.865-.909-1.455-.163-.458-.347-1.258-.403-2.428C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.428.211-.59.465-1.011.909-1.455.444-.444.865-.698 1.455-.909.458-.163 1.258-.347 2.428-.403C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.013 7.052.072 5.77.131 4.911.349 4.12.655 3.227 1 2.446 1.472 1.68 2.238.914 3.004.441 3.785.097 4.678c-.306.791-.524 1.65-.583 2.932C-.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.059 1.282.277 2.141.583 2.932.344.893.817 1.674 1.583 2.44.766.766 1.547 1.239 2.44 1.583.791.306 1.65.524 2.932.583C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.059 2.141-.277 2.932-.583.893-.344 1.674-.817 2.44-1.583.766-.766 1.239-1.547 1.583-2.44.306-.791.524-1.65.583-2.932.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.282-.277-2.141-.583-2.932C22.558 3.785 22.085 3.004 21.319 2.238 20.553 1.472 19.772 1 18.879.655 18.088.349 17.229.131 15.948.072 14.668.013 14.259 0 12 0zM12 5.838A6.162 6.162 0 105.838 12 6.162 6.162 0 0012 5.838zm0 10.162A4 4 0 1116 12a4 4 0 01-4 4zm6.406-11.845a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"/>
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
