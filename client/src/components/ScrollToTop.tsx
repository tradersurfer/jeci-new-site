import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // This tells the window to jump to the very top (0,0)
    window.scrollTo(0, 0);
  }, [location]); // This runs every time the 'location' changes

  return null;
}