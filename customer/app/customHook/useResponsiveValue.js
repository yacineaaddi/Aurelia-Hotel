import { useEffect, useState } from "react";

export default function useResponsiveValue(
  mobileValue = 1,
  desktopValue = 2,
  breakpoint = 1100,
) {
  const [value, setValue] = useState(mobileValue);

  useEffect(() => {
    function handleResize() {
      setValue(window.innerWidth < breakpoint ? mobileValue : desktopValue);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileValue, desktopValue, breakpoint]);

  return value;
}
