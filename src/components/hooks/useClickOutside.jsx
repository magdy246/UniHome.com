import { useEffect } from "react";

function useClickOutside(ref, callback) {
  useEffect(() => {
    // Function to check if the click was outside the element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
