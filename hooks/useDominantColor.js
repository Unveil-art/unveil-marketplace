import { useState, useEffect } from "react";
import ColorThief from "colorthief";

const useDominantColor = (imageUrl) => {
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = async function () {
      try {
        setLoading(true);
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        setColor(
          `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`
        );
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    img.src = imageUrl;

    return () => {
      img.onload = null;
    };
  }, [imageUrl]);

  return { color, loading, error };
};

export default useDominantColor;
