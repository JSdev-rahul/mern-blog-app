import React, { useEffect } from "react";

const ScrollToTop = React.memo(({ previousScrollPosition }) => {
  useEffect(() => {
    window.scrollTo(0, previousScrollPosition);
  }, [previousScrollPosition]);

  return null;
});

export default ScrollToTop;
