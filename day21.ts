import type { Day } from './Day.ts';

interface Pos { x: number; y: number }

const BFS_DIRECTIONS: { [key: string]: Pos } = {
  '^': { x: 0, y: -1 },
  '>': { x: 1, y: 0 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
};

const DIRECTIONS: { [key: string]: Pos } = {
  'X': { x: 0, y: 0 },
  '^': { x: 1, y: 0 },
  'A': { x: 2, y: 0 },
  '<': { x: 0, y: 1 },
  'v': { x: 1, y: 1 },
  '>': { x: 2, y: 1 },
};

const KEYPAD: { [key: string]: Pos } = {
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  X: { x: 0, y: 3 },
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 },
};

export class DayImpl implements Day {
  private readonly input: string[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n');
  }

  partOne() {
    const memo: { [key: string]: number } = {};

    return this.input.reduce((acc, code) => {
      const numerical = Number(code.split('').filter(character => character.match(/\d/)).join(''));
      return acc + numerical * getKeyPresses(KEYPAD, code, 2, memo);
    }, 0);
  }

  partTwo() {
    const memo: { [key: string]: number } = {};

    return this.input.reduce((acc, code) => {
      const numerical = Number(code.split('').filter(character => character.match(/\d/)).join(''));
      return acc + numerical * getKeyPresses(KEYPAD, code, 25, memo);
    }, 0);
  }
}

function getKeyPresses(input: { [key: string]: Pos }, code: string, robot: number, memo: { [key: string]: number }): number {
  const key = `${code},${robot}`;
  if (memo[key] !== undefined) {
    return memo[key];
  }

  let current = 'A';
  let length = 0;

  for (let i = 0; i < code.length; i++) {
    const moves = getCommand(input, current, code[i]);
    length += robot === 0 ? moves[0].length : Math.min(...moves.map(move => getKeyPresses(DIRECTIONS, move, robot - 1, memo)));
    current = code[i];
  }

  memo[key] = length;
  return length;
}

function getCommand(input: { [key: string]: Pos }, start: string, end: string) {
  const queue = [{ ...input[start], path: '' }];
  const distances: { [key: string]: number } = {};

  if (start === end)
    return ['A'];

  const allPaths: string[] = [];
  while (queue.length) {
    const current = queue.shift()!;
    const currKey = getKey(current);

    if (current.x === input[end].x && current.y === input[end].y)
      allPaths.push(`${current.path}A`);

    if (distances[currKey] !== undefined && distances[currKey] < current.path.length)
      continue;

    Object.entries(BFS_DIRECTIONS).forEach(([direction, vector]) => {
      const position = { x: current.x + vector.x, y: current.y + vector.y };

      if (input.X.x === position.x && input.X.y === position.y)
        return;

      const button = Object.values(input).find(button => button.x === position.x && button.y === position.y);
      if (button) {
        const newPath = current.path + direction;
        const posKey = getKey(position);

        if (distances[posKey] === undefined || distances[posKey] >= newPath.length) {
          queue.push({ ...position, path: newPath });
          distances[posKey] = newPath.length;
        }
      }
    });
  }

  return allPaths.sort((a, b) => a.length - b.length);
}

function getKey(pos: Pos) {
  return `${pos.x},${pos.y}`;
}
