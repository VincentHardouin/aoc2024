export type Pos = [y: number, x: number];

function splitPairs<T, K>(arr: [T, K][]): [T[], K[]] {
  return arr.reduce<[T[], K[]]>(([leftAcc, rightAcc], [key, value]) => {
    return [
      [...leftAcc, key],
      [...rightAcc, value],
    ];
  }, [[], []]);
}

function transpose<T>(arr: T[][]): T[][] {
  return arr[0].map((_, i) => arr.map(row => row[i]));
}

const directNeighbors: Pos[] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const diagNeighbors: Pos[] = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

const neighbors: Pos[] = [...diagNeighbors, ...directNeighbors];

function* enumerate(enumerable: Iterable<any>) {
  let i = 0;
  for (const item of enumerable) yield [i++, item];
}

function* enumGrid<T>(grid: T[][]) {
  for (const [y, row] of enumerate(grid)) {
    for (const [x, cell] of enumerate(row)) {
      yield { x, y, row, cell };
    }
  }
}

function isInGrid<T>(grid: T[][], y: number, x: number) {
  return y >= 0 && y < grid.length
    && x >= 0 && x < grid[0].length;
}

export {
  diagNeighbors,
  directNeighbors,
  enumerate,
  enumGrid,
  isInGrid,
  neighbors,
  splitPairs,
  transpose,
};
