import { colorPairs } from "../constants/categoriesIconMap";
import { randomIcons } from "../constants/categoriesIconMap";
export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const getRandomColorAndIcon = () => {
  const randomPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];

    const randomIcon =
      randomIcons[Math.floor(Math.random() * randomIcons.length)];
  return {
    randomPair: randomPair,
     randomIcon: randomIcon
  };
};
