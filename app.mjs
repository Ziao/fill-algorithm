import { GRID_HEIGHT, GRID_WIDTH } from "./constants.mjs";
import { getCoords, getIndex } from "./lib.mjs";

export const grid = new Array(GRID_HEIGHT * GRID_WIDTH).fill(null);

export const initGrid = () =>
  grid.forEach((val, i) => (grid[i] = Math.random() < 0.5));

export const drawGrid = () => {
  const $grid = document.getElementById(`grid`);
  $grid.innerHTML = ``;

  grid.forEach((cellState, index) => {
    // Create a div for each cell and add it to the #grid
    const div = document.createElement(`div`);
    div.classList.add(`h-10`, `w-10`, `cursor-pointer`);
    div.addEventListener(`click`, () => fill(index));
    // Give the cell a color based on its state
    if (cellState) div.classList.add(`bg-pink-500`);
    else div.classList.add(`bg-gray-800`);
    $grid.appendChild(div);
  });
};

export const fill = (index) => {
  // alert(`we are going to fill starting at index ${index}`);

  // list of candidates (indexes)
  // list of visited (indexes)
  // add the clicked cell to candidates
  // start looping over candidates, until the list is empty
  // for each cell:
  // - check the state, if false, set it to true
  // - if already true, stop
  // - add neighbours to candidates, IF they`re not already in visited
  // - move self to visited

  const candidates = [index];
  const visited = [];

  while (candidates.length > 0) {
    const candidateIndex = candidates.pop();
    visited.push(candidateIndex);

    const candidateState = grid[candidateIndex];

    // Cell is already on, we dont need to check its neighbours and shit
    if (candidateState) continue;

    // Cell is off, lets turn it on
    grid[candidateIndex] = true;

    // Lets check the neighbours
    const { x, y } = getCoords(candidateIndex);

    // Get the index for the cell on the right. This can return null if out of bounds
    // let rightIndex = getIndex(x + 1, y);
    // if (rightIndex !== null && !visited.includes(rightIndex)) {
    //   candidates.push(rightIndex);
    // }

    // However, we are efficient boyse. We just get a bunch of indexes and loop through them
    const neighbouringIndexes = [
      getIndex(x + 1, y), // right // number OR null if OOB
      getIndex(x - 1, y), // left
      getIndex(x, y + 1), // etc
      getIndex(x, y - 1),
      // getIndex(x - 1, y - 1),
      // getIndex(x - 1, y + 1),
      // getIndex(x + 1, y - 1),
      // getIndex(x + 1, y + 1),
    ];

    // Does the same thing with fewer lines of code, but far less readable
    // const neighbouringIndexes = [];
    // for (let xx = -1; xx <= 1; xx++) {
    //   for (let yy = -1; yy <= 1; yy++) {
    //     neighbouringIndexes.push(getIndex(x + xx, y + yy));
    //   }
    // }

    neighbouringIndexes.forEach((i) => {
      if (i !== null && !visited.includes(i)) {
        candidates.push(i);
      }
    });
  }

  drawGrid();
};

document.getElementById(`drawButton`).addEventListener(`click`, () => {
  initGrid();
  drawGrid();
});

initGrid();
drawGrid();
