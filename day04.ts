import type { Day } from './Day.ts';
import { diagNeighbors, enumGrid, neighbors } from './utils.ts';

export class DayImpl implements Day {
  private readonly input: Array<string[]>;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        return line
          .split('');
      });
  }

  partOne() {
    let count = 0;

    for (const { x: i, y: j, cell } of enumGrid(this.input)) {
      if (cell !== 'X') {
        continue;
      }
      for (const [y, x] of neighbors) {
        const word: string[] = ['X'];
        for (let k = 1; k < 4; k++) {
          const y2 = j + y * k;
          const x2 = i + x * k;
          if (y2 >= 0 && y2 < this.input.length
            && x2 >= 0 && x2 < this.input[0].length) {
            word.push(this.input[y2][x2]);
          }
        }
        if (word.join('') === 'XMAS') {
          count++;
        }
      }
    }

    return count;
  }

  partTwo() {
    let count = 0;

    for (const { x: i, y: j, cell } of enumGrid(this.input)) {
      if (cell !== 'A') {
        continue;
      }
      const adj: string[] = [];
      for (const [y, x] of diagNeighbors) {
        const x2 = i + x;
        const y2 = j + y;
        if (y2 >= 0 && y2 < this.input.length
          && x2 >= 0 && x2 < this.input[0].length) {
          adj.push(this.input[y2][x2]);
        }
      }
      const valid = [
        'MMSS',
        'SSMM',
        'MSSM',
        'SMMS',
      ];
      if (valid.includes(adj.join(''))) {
        count++;
      }
    }

    return count;
  }
}
