import React, { useEffect, useState } from "react";
import "./footer.css";

const Footer = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [forumHeight, setForumHeight] = useState(0);
  const [className, setClassName] = useState("");

  const setWindow = (event) => {
    setWindowHeight(event.target.innerHeight);
  };

  const attachResizeObserver = () => {
    // Set initial window height
    setWindowHeight(window.innerHeight);

    // Keep track of the window changes
    window.addEventListener("resize", setWindow);

    // Add observer for the forum body
    var observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        setForumHeight(cr.height + cr.top);
      }
    });

    // Observe one or multiple elements
    const forumBody = document.getElementById("craigslist-body");
    observer.observe(forumBody);

    return () => {
      window.removeEventListener("resize", setWindow);
      observer.unobserve(forumBody);
    };
  };

  useEffect(attachResizeObserver, []);

  useEffect(() => {
    if (windowHeight > forumHeight) {
      setClassName("bottom");
    } else {
      setClassName("");
    }
  }, [windowHeight, forumHeight]);

  return (
    <footer role="contentinfo" className={className}>
      <div className="copyright">
        Copyright © 2020, David Pan and Emile Ferrand
      </div>
    </footer>
  );
};

export default Footer;
