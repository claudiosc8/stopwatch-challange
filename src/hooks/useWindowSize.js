import { useState, useEffect } from 'react';

function useWindowSize(ref) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    id_width: undefined,
  });


  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        id_width: ref.current.clientWidth
      });
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]); 

  return windowSize;
}

export default useWindowSize;