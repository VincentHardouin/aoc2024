import type { Day } from './Day.ts';

interface Robot {
  x: number;
  y: number;
  vy: number;
  vx: number;
}

interface GridSize {
  width: number;
  height: number;
}

export class DayImpl implements Day {
  private readonly input: Robot[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        const [x, y, vx, vy] = line.match(/-?\d+/g)!.map(Number);
        return {
          x,
          y,
          vx,
          vy,
        } as Robot;
      });
  }

  partOne() {
    const gridSize = getGridSize(this.input);
    const seconds = 100;
    const updatedRobots = this.input.map(robot => updateRobotAfterNSeconds(robot, seconds, gridSize));
    return getSafetyFactor(updatedRobots, gridSize);
  }

  partTwo() {
    const gridSize = getGridSize(this.input);
    for (let i = 1; i < 10000; i++) {
      const updatedRobots = this.input.map(robot => updateRobotAfterNSeconds(robot, i, gridSize));
      if (!hasOverlaps(updatedRobots)) {
        printGrid(gridSize, updatedRobots);
        return i;
      }
    }
    throw new Error('Easter egg not found');
  }
}

function getGridSize(robots: Robot[]): GridSize {
  let width = 0;
  let height = 0;
  for (const robot of robots) {
    width = robot.x > width ? robot.x : width;
    height = robot.y > height ? robot.y : height;
  }
  return {
    width: width + 1,
    height: height + 1,
  } as GridSize;
}

function updateRobotAfterNSeconds(robot: Robot, seconds: number, gridSize: GridSize): Robot {
  let x = robot.x;
  let y = robot.y;
  for (let i = 0; i < seconds; i++) {
    x = (x + robot.vx + gridSize.width) % gridSize.width;
    y = (y + robot.vy + gridSize.height) % gridSize.height;
  }
  return { ...robot, x, y } as Robot;
}

function getSafetyFactor(robots: Robot[], gridSize: GridSize): number {
  const quadrants = getQuadrants(robots, gridSize);
  return quadrants.map(q => q.length).reduce((a, x) => a * x);
}

function getQuadrants(robots: Robot[], gridSize: GridSize): Robot[][] {
  const quadrants: Robot[][] = [[], [], [], []];
  const xMid = Math.floor(gridSize.width / 2);
  const yMid = Math.floor(gridSize.height / 2);

  for (const robot of robots) {
    if (robot.x === xMid || robot.y === yMid)
      continue;

    if (robot.y < yMid && robot.x < xMid) {
      quadrants[0].push(robot);
    }
    else if (robot.y < yMid) {
      quadrants[1].push(robot);
    }
    else if (robot.x < xMid) {
      quadrants[2].push(robot);
    }
    else {
      quadrants[3].push(robot);
    }
  }

  return quadrants;
}

function hasOverlaps(robots: Robot[]) {
  for (let i = 0; i < robots.length; i++) {
    const curr = robots[i];
    const matches = robots.filter(r => r.x === curr.x && r.y === curr.y).length;
    if (matches > 1)
      return true;
  }

  return false;
}

function printGrid(gridSize: GridSize, robots: Robot[]) {
  const [empty, marker] = ['.', '#'];
  const grid = Array.from(Array.from({ length: gridSize.height }), () => Array.from({ length: gridSize.width }).fill(empty));
  for (const robot of robots) grid[robot.y][robot.x] = marker;

  // eslint-disable-next-line no-console
  console.log(grid.map(line => line.join('')).join('\n'));
};
