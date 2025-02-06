import { useRef, useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ items, isNavbarDropdownOpen, setIsNavbarDropdownOpen }) {
  const navbarRef = useRef(null);
  const [shouldShowNavbarItems, setShouldShowNavbarItems] = useState(false);
  const [hasButtons, setHasButtons] = useState(false);

  useEffect(() => {
    const calculateButtonWidths = () => {
      if (!navbarRef.current) return;

      const buttons = navbarRef.current.querySelectorAll('.navbar__button--hidden');
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      let totalWidth = 0.5 * rootFontSize * (items.length + 1); // Account for 0.5rem gap and padding

      buttons.forEach((button) => {
        console.log(button.offsetWidth);
        totalWidth += button.offsetWidth;
      });

      setHasButtons(buttons.length > 0);
      if (buttons.length > 0) {
        console.log(totalWidth <= navbarRef.current.offsetWidth);
        setShouldShowNavbarItems(totalWidth <= navbarRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      calculateButtonWidths();
    });

    resizeObserver.observe(navbarRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  useEffect(() => {
    if (shouldShowNavbarItems) setIsNavbarDropdownOpen(false);
  }, [shouldShowNavbarItems, setIsNavbarDropdownOpen]);

  return (
    <>
      {/* Invisible navbar for measurement */}
      <div className="navbar navbar--hidden" ref={navbarRef}>
        {items.map((item, index) => (
          <span key={index} className="navbar__button navbar__button--hidden navbar__button--auto">
            {item.label}
          </span>
        ))}
      </div>

      <div className="navbar">
        {shouldShowNavbarItems ? (
          items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="navbar__button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))
        ) : hasButtons ? (
          <div className="navbar__button" onClick={() => setIsNavbarDropdownOpen(!isNavbarDropdownOpen)}>
            {isNavbarDropdownOpen ? (
              // Close Icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <line
                  x1="4"
                  y1="4"
                  x2="20"
                  y2="20"
                  stroke="black"
                  strokeWidth="calc(0.0625rem * 4 / 3)"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="20"
                  x2="20"
                  y2="4"
                  stroke="black"
                  strokeWidth="calc(0.0625rem * 4 / 3)"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Open Icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <line
                  x1="4"
                  y1="4"
                  x2="20"
                  y2="4"
                  stroke="black"
                  strokeWidth="calc(0.0625rem * 4 / 3)"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="black"
                  strokeWidth="calc(0.0625rem * 4 / 3)"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="20"
                  x2="20"
                  y2="20"
                  stroke="black"
                  strokeWidth="calc(0.0625rem * 4 / 3)"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        ) : null}
      </div>

      {!shouldShowNavbarItems && isNavbarDropdownOpen && (
        <div className="navbar__dropdown">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="navbar__button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
