function splitPairs(arr: any) {
  return arr.reduce(([leftAcc, rightAcc], [key, value]) => {
    return [
      [...leftAcc, key],
      [...rightAcc, value],
    ];
  }, [[], []]);
}

function transpose(arr: any) {
  return arr[0].map((col: any, i: number) => arr.map((row: any) => row[i]));
}

const directNeighbors: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const diagNeighbors: number[][] = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

const neighbors: number[][] = [...diagNeighbors, ...directNeighbors];

function* enumerate(enumerable: Iterable<any>) {
  let i = 0;
  for (const item of enumerable) yield [i++, item];
}

function* enumGrid(grid: any[][]) {
  for (const [y, row] of enumerate(grid)) {
    for (const [x, cell] of enumerate(row)) {
      yield { x, y, row, cell };
    }
  }
}

export {
  diagNeighbors,
  directNeighbors,
  enumerate,
  enumGrid,
  neighbors,
  splitPairs,
  transpose,
};
