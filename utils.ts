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

function getPositionOfUniqElement(grid: string[][], element: string): Pos {
  const y = grid.findIndex(x => x.includes(element));
  const x = grid[y].indexOf(element);
  return [y, x] as Pos;
}

function printGrid(grid: string[][]) {
  grid.forEach((line) => {
    let str = '';
    line.forEach((pos) => {
      str += pos;
    });
    // eslint-disable-next-line no-console
    console.log(str);
  });
  // eslint-disable-next-line no-console
  console.log('');
}

interface MinHeapNode {
  score: number;
  node: string;
}

class MinHeap {
  heap: MinHeapNode[];
  constructor() {
    this.heap = [];
  }

  insert(element: MinHeapNode) {
    this.heap.push(element);
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].score >= this.heap[parentIndex].score)
        break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length === 1)
      return this.heap.pop() as MinHeapNode;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop() as MinHeapNode;
    let index = 0;

    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < this.heap.length && this.heap[leftChild].score < this.heap[smallest].score)
        smallest = leftChild;
      if (rightChild < this.heap.length && this.heap[rightChild].score < this.heap[smallest].score)
        smallest = rightChild;
      if (smallest === index)
        break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }

    return min;
  }

  size() {
    return this.heap.length;
  }
}

export {
  diagNeighbors,
  directNeighbors,
  enumerate,
  enumGrid,
  getPositionOfUniqElement,
  isInGrid,
  MinHeap,
  neighbors,
  printGrid,
  splitPairs,
  transpose,
};
