import React, { useState, useEffect } from "react";

const JumpArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const arrowStyle = {
    position: "fixed",
    top: "85%",
    left: "96%",
    marginBottom: "50px",
    backgroundColor: "rgba(62, 68, 86,.5)",
    color: "white",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "15px",
    padding: "5px 10px",
    display: isVisible ? "block" : "none",
    transition: "background-color 0.3s",
  };

  return (
    <div style={arrowStyle} onClick={scrollToTop}>
      <span>&#129129;</span>
    </div>
  );
};

export default JumpArrow;
