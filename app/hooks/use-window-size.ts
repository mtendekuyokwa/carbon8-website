import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

function getSize(): WindowSize {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  return { width: window.innerWidth, height: window.innerHeight };
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(getSize);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleResize() {
      setSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
