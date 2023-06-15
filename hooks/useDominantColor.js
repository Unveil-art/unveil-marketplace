import { useState, useEffect } from "react";
import ColorThief from "colorthief";

const useDominantColor = (imageUrl) => {
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        setLoading(blob);
        // const objectUrl = URL.createObjectURL(blob);
        // const img = new Image();
        // img.crossOrigin = "anonymous";

        // img.onload = async function () {
        //   try {
        //     const colorThief = new ColorThief();
        //     const dominantColor = colorThief.getColor(img);
        //     setColor(
        //       `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`
        //     );
        //     setLoading(false);
        //     URL.revokeObjectURL(objectUrl); // Clean up object URL
        //   } catch (err) {
        //     setError(err);
        //     setLoading(false);
        //   }
        // };

        // img.src = objectUrl;
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [imageUrl]);

  return { color, loading, error };
};

export default useDominantColor;
