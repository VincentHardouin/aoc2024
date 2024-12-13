import type { Day } from './Day.ts';

interface Button {
  x: number;
  y: number;
  cost: 1 | 3;
}
interface Block {
  a: Button;
  b: Button;
  prize: {
    x: number;
    y: number;
  };
}

export class DayImpl implements Day {
  private readonly input: Block[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n\n')
      .map((block: string) => {
        const [a, b, prize] = block.split('\n').map(line => line.match(/\d+/g)!.map(Number));

        return {
          a: { x: a[0], y: a[1], cost: 3 },
          b: { x: b[0], y: b[1], cost: 1 },
          prize: { x: prize[0], y: prize[1] },
        } as Block;
      });
  }

  partOne() {
    return getNumTokens(this.input);
  }

  partTwo() {
    const OFFSET = 10000000000000;
    const withOffset: Block[] = this.input.map(({ a, b, prize }) => {
      return {
        a,
        b,
        prize: { x: prize.x + OFFSET, y: prize.y + OFFSET },
      };
    });
    return getNumTokens(withOffset);
  }
}

function getNumTokens(grid: Block[]) {
  let tokens = 0;
  for (const { a, b, prize } of grid) {
    const d = a.x * b.y - a.y * b.x;
    const A = (prize.x * b.y - prize.y * b.x) / d;
    const B = (a.x * prize.y - a.y * prize.x) / d;

    if (d === 0)
      continue;

    if (Number.isInteger(A) && Number.isInteger(B) && A >= 0 && B >= 0) {
      tokens += A * a.cost + B * b.cost;
    }
  }

  return tokens;
}
