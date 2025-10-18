import { useState, useEffect, useRef } from "react";
import ExternalLink from "./ExternalLink";
import { showImage, hideImage } from "../utils";

function Home() {
  // Topics for dice roll
  // const topics = [
  //   "nature of consciousness",
  //   "cognition",
  //   "making a guava flavored perfume",
  //   "feeling the spectrum of emotions",
  //   "mental health",
  //   "limitations of language and epistemic systems",
  //   "having fun",
  // ];

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [usedTopicIndices, setUsedTopicIndices] = useState(new Set([0])); // Track used topics, start with index 0
  const [showDice, setShowDice] = useState(false);
  const [name, setName] = useState("Emily Zhang");
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

  const handleNameInteraction = () => {
    if (isMobile) {
      // Toggle name on click for mobile
      const newState = !isNameChinese;
      setIsNameChinese(newState);
      setName(newState ? "张思涵" : "Emily Zhang");
    }
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
            I'm interested in psychology, neuroscience, philosophy, math, linguistics. My identity is ephemeral, but in this life I am a student, thinker, and creator. I had to reluctantly learn basic coding for some of my projects :c
            {/* {" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("nanjing")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("nanjing", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("nanjing", false) : undefined}
            >
              Nanjing, China
            </span>
            , currently residing in the liminal space between{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("stanford")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("stanford", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("stanford", false) : undefined}
            >
              Stanford University
            </span>{" "}
            and{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("sf")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("sf", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("sf", false) : undefined}
            >
              San Francisco
            </span>
            . */}
          </p>
          <p className="mb-6">
            Feel free to explore my thoughts about these various topics, or view them in a visual-audio format on my youtube.
            {" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("placeholder")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("placeholder", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("placeholder", false) : undefined}
            >
              what consciousness is
            </span>
             -
            {" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("placeholder")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("placeholder", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("placeholder", false) : undefined}
            >
              science is religion/limitations of all epistemological systems
            </span>
             -
            psychological component of all abuse - emotion being the substrate of humans
            {/* {" "}
            <span
              className="link cursor-pointer"
              onMouseEnter={() => handleDiceInteraction(true)}
              onMouseLeave={() => handleDiceInteraction(false)}
              onClick={rollDice}
              title="Click to explore other topics I'm working on"
            >
              {topics[currentTopicIndex]}
              {(showDice || isMobile) && (
                <span className="text-lg hover:scale-110 transition-transform inline-block ml-1">
                  🎲
                </span>
              )}
            </span>
            . */}
          </p>
          <p>
            If you want to talk with me about something interesting, feel free to reach out at{" "}
            <ExternalLink href="mailto:integraloftime9@gmail.com">
              integraloftime at gmail dot com 
            </ExternalLink>
             or message me on my socials.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
