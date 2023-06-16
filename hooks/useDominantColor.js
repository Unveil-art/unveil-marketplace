import { useState, useEffect } from "react";

const useDominantColor = (imageUrl) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      const colorCounts = {};
      let dominantColor = "";
      let maxCount = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const colorString = `${r},${g},${b}`;

        colorCounts[colorString] = (colorCounts[colorString] || 0) + 1;
        if (colorCounts[colorString] > maxCount) {
          maxCount = colorCounts[colorString];
          dominantColor = colorString;
        }
      }

      setColor(`rgb(${dominantColor})`);
    };
  }, [imageUrl]);

  return color;
};

export default useDominantColor;
