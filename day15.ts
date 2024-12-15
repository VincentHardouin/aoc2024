import type { Day } from './Day.ts';
import { enumGrid, getPositionOfUniqElement, type Pos } from './utils.ts';

interface Input {
  grid: string[][];
  moves: Move[];
}
type Move = '>' | '<' | '^' | 'v';

const DIRECTIONS = {
  '>': [0, 1],
  '<': [0, -1],
  '^': [-1, 0],
  'v': [1, 0],
};

enum Cell {
  Wall = '#',
  Empty = '.',
  Box = 'O',
  Robot = '@',
  BoxLeft = '[',
  BoxRight = ']',
}

interface Change {
  x: number;
  y: number;
  value: Cell;
}

export class DayImpl implements Day {
  private readonly input: Input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    const [grid, moves] = input
      .trim()
      .split('\n\n');

    return {
      grid: grid.split('\n').map(line => line.split('') as string[]),
      moves: moves.split('\n').flatMap(line => line.split('').map(m => m as Move)),
    } as Input;
  }

  partOne() {
    const { grid, moves } = structuredClone(this.input);
    let robot = getPositionOfUniqElement(grid, '@');
    for (const move of moves) {
      robot = moveRobot(grid, move, robot);
    }

    return getSumOfGPS(grid);
  }

  partTwo() {
    const { grid, moves } = structuredClone(this.input);
    const expandedGrid = expandGrid(grid);
    let robot = getPositionOfUniqElement(expandedGrid, '@');
    moves.forEach((move) => {
      robot = moveRobot2(expandedGrid, move, robot);
    });
    return getSumOfGPS(expandedGrid);
  }
}

function moveRobot(grid: string[][], move: Move, robot: Pos) {
  const [y, x] = robot;
  const [dirY, dirX] = DIRECTIONS[move];
  const [nY, nX] = [y + dirY, x + dirX];
  if (canMove(grid, robot, move)) {
    grid[y][x] = '.';
    grid[nY][nX] = '@';
    return [nY, nX] as Pos;
  }
  return [y, x] as Pos;
}

function moveRobot2(grid: string[][], move: Move, robot: Pos) {
  const [y, x] = robot;
  const [dirY, dirX] = DIRECTIONS[move];
  const [nY, nX] = [y + dirY, x + dirX];
  const { result, changes } = canMove2(grid, [nY, nX], move, []);
  if (result) {
    sortChanges(changes);
    changes.forEach(({ x, y, value }) => {
      grid[y][x] = value;
    });

    grid[y][x] = '.';
    grid[nY][nX] = '@';
    return [nY, nX] as Pos;
  }
  return [y, x] as Pos;
}

function canMove(grid: string[][], pos: Pos, move: Move) {
  const [y, x] = pos;
  const [dirY, dirX] = DIRECTIONS[move];
  const [nY, nX] = [y + dirY, x + dirX];
  const newPos = grid[nY]?.[nX];

  if (newPos === Cell.Empty) {
    return true;
  }
  if (newPos === Cell.Wall) {
    return false;
  }
  if (newPos === Cell.Box) {
    if (canMove(grid, [nY, nX], move)) {
      const [nY2, nX2] = [nY + dirY, nX + dirX];
      grid[nY2][nX2] = 'O';
      return true;
    }
    return false;
  }
}

function canMove2(grid: string[][], pos: Pos, move: Move, changes: Change[]) {
  const [y, x] = pos;
  const cell = grid[y]?.[x];

  const [dirY, dirX] = DIRECTIONS[move];
  const [nY, nX] = [y + dirY, x + dirX];

  if (cell === Cell.Wall) {
    return { result: false, changes };
  }

  if (cell === Cell.Empty) {
    return { result: true, changes };
  }

  if (dirY === 0) {
    if (canMove2(grid, [nY, nX], move, changes).result) {
      grid[nY][nX] = cell;
      return { result: true, changes };
    }
    return { result: false, changes };
  }
  else if (cell === Cell.BoxLeft) {
    if (canMove2(grid, [nY, nX], move, changes).result
      && canMove2(grid, [nY, nX + 1], move, changes).result) {
      changes.push(
        { y: nY, x: nX, value: Cell.BoxLeft },
        { y: nY, x: nX + 1, value: Cell.BoxRight },
        { y, x, value: Cell.Empty },
        { y, x: x + 1, value: Cell.Empty },
      );
      return { result: true, changes };
    }
    return { result: false, changes };
  }
  else {
    if (canMove2(grid, [nY, nX], move, changes).result
      && canMove2(grid, [nY, nX - 1], move, changes).result) {
      changes.push(
        { y: nY, x: nX - 1, value: Cell.BoxLeft },
        { y: nY, x: nX, value: Cell.BoxRight },
        { y, x: x - 1, value: Cell.Empty },
        { y, x, value: Cell.Empty },
      );
      return { result: true, changes };
    }
    return { result: false, changes };
  }
}

function getSumOfGPS(grid: string[][]) {
  let result = 0;
  for (const { x, y, cell } of enumGrid(grid)) {
    if (cell === Cell.Box || cell === Cell.BoxLeft) {
      result += y * 100 + x;
    }
  }
  return result;
}

export function expandGrid(grid: string[][]) {
  return grid.map((line) => {
    return line.flatMap((cell) => {
      if (cell === Cell.Wall)
        return [Cell.Wall, Cell.Wall];
      else if (cell === Cell.Box)
        return [Cell.BoxLeft, Cell.BoxRight];
      else if (cell === Cell.Robot)
        return [Cell.Robot, Cell.Empty];
      return [Cell.Empty, Cell.Empty];
    });
  });
}

function sortChanges(changes: Change[]) {
  changes.sort((a, b) => {
    if (a.value === Cell.Empty && b.value !== Cell.Empty)
      return -1;
    if (a.value !== Cell.Empty && b.value === Cell.Empty)
      return 1;
    return 0;
  });
}
