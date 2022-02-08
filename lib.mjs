import { GRID_HEIGHT, GRID_WIDTH } from "./constants.mjs";

/**
 * Gives back the index of the cell based on the coords, or null if out of bounds
 * @param x number
 * @param y number
 */
export const getIndex = (x, y) => {
  if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) return null;
  return y * GRID_WIDTH + x;
};

export const getCoords = (index) => {
  if (index < 0 || index > GRID_WIDTH * GRID_HEIGHT) return null;

  return {
    x: index % GRID_WIDTH,
    y: Math.floor(index / GRID_WIDTH),
  };
};
