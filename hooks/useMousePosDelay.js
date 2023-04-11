import React, { useEffect, useState } from "react";
const useMousePosDelay = () => {
  const [mousePosDelay, setMousePosDelay] = useState({
    x: null,
    y: null,
  });

  useEffect(() => {
    const mouse = { x: -100, y: -100 };
    const pos = { x: 0, y: 0 };
    const speed = 0.08;

    const updateCoordinates = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    function loop() {
      updateCursor();

      requestAnimationFrame(loop);
    }

    const updateCursor = () => {
      const diffX = Math.round(mouse.x - pos.x);
      const diffY = Math.round(mouse.y - pos.y);

      pos.x += diffX * speed;
      pos.y += diffY * speed;

      setMousePosDelay({ x: pos.x, y: pos.y });
    };

    requestAnimationFrame(loop);

    window.addEventListener("mousemove", (e) => {
      updateCoordinates(e);
    });

    return () => {
      window.removeEventListener("mousemove", updateCoordinates);
    };
  }, []);

  return mousePosDelay;
};
export default useMousePosDelay;
