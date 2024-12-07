import type { Day } from './Day.ts';

export class DayImpl implements Day {
  private readonly input: Array<Array<number>>;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        return line.match(/\d+/g)!
          .map(Number);
      });
  }

  partOne() {
    return this.input.map(line => isValidLine(line, false)).reduce((acc, val) => acc + val, 0);
  }

  partTwo() {
    return this.input.map(line => isValidLine(line, true)).reduce((acc, val) => acc + val, 0);
  }
}

function isValidLine(line: number[], withConcat: boolean) {
  const [total, ...numbers] = line;

  const first = numbers.shift()!;
  const queue: { result: number; numbers: number[] }[] = [{ result: first, numbers }];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    const currNumber = curr.numbers.shift()!;
    const totalAdd = curr.result + currNumber;
    const totalMultiply = curr.result * currNumber;
    const totalConcat = Number(`${curr.result}${currNumber}`);

    if (curr.numbers.length === 0 && (totalAdd === total || totalMultiply === total || totalConcat === total)) {
      return total;
    }

    if (totalAdd <= total) {
      queue.push({ result: totalAdd, numbers: [...curr.numbers] });
    }
    if (totalMultiply <= total) {
      queue.push({ result: totalMultiply, numbers: [...curr.numbers] });
    }
    if (withConcat && totalConcat <= total) {
      queue.push({ result: totalConcat, numbers: [...curr.numbers] });
    }
  }
  return 0;
}
