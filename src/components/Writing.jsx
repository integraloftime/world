import { useState, useEffect, useRef } from "react";
import ExternalLink from "./ExternalLink";
import { showImage, hideImage } from "../utils";

function Writing() {
  const [usedTopicIndices, setUsedTopicIndices] = useState(new Set([0])); // Track used topics, start with index 0
  const [isMobile, setIsMobile] = useState(false);
  const [isNameChinese, setIsNameChinese] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const homeRef = useRef(null);

  // Detect if device supports touch (mobile/tablet)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle clicking outside of images to hide them on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && currentImage && homeRef.current && !event.target.closest(".image-trigger")) {
        hideImage(currentImage);
        setCurrentImage(null);
      }
    };

    if (isMobile) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobile, currentImage]);

  const rollDice = () => {
    let currentUsedIndices = usedTopicIndices;

    // If all topics have been used, start a new cycle
    if (currentUsedIndices.size >= topics.length) {
      currentUsedIndices = new Set();
    }

    // Get available indices (not yet used in current cycle)
    const availableIndices = [];
    for (let i = 0; i < topics.length; i++) {
      if (!currentUsedIndices.has(i)) {
        availableIndices.push(i);
      }
    }

    // Pick a random index from available ones
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    // Update state
    setCurrentTopicIndex(randomIndex);
    setUsedTopicIndices(new Set([...currentUsedIndices, randomIndex]));
  };

  const handleImageInteraction = (imageName, isEnter = true) => {
    if (isMobile) {
      // Click to show, click outside to hide for mobile
      if (currentImage === imageName) {
        hideImage(imageName);
        setCurrentImage(null);
      } else {
        if (currentImage) {
          hideImage(currentImage);
        }
        showImage(imageName);
        setCurrentImage(imageName);
      }
    } else {
      // Hover behavior for desktop
      if (isEnter) {
        showImage(imageName);
      } else {
        hideImage(imageName);
      }
    }
  };

  const handleDiceInteraction = (isEnter = true) => {
    if (!isMobile) {
      setShowDice(isEnter);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20 lg:pt-0" ref={homeRef}>
      <div className="max-w-2xl relative">
        <div className="text-2xl tracking-tight text-primary">
          <p className="mb-6">
            Welcome!!!
            {/* {" "}
            <span
              className="link cursor-pointer"
              onClick={handleNameInteraction}
              onMouseEnter={!isMobile ? () => setName("Meeo") : undefined}
              onMouseLeave={!isMobile ? () => setName("Kallen") : undefined}
            >
              {name}.
            </span> */}
          </p>
          <p className="mb-6">
            adsf
          </p>
        </div>
      </div>
    </div>
  );
}

export default Writing;
