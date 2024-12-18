import type { Day } from './Day.ts';

let outs: bigint[] = [];
let a: bigint, b: bigint, c: bigint;
let instructionPointer: number;

export class DayImpl implements Day {
  private readonly input: { register: bigint[]; program: bigint[] };

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    const [register, program] = input
      .trim()
      .split('\n\n');

    return {
      register: register.match(/\d+/g)!.map(BigInt),
      program: program.match(/\d+/g)!.map(BigInt),
    };
  }

  partOne(): string {
    const program = this.input.program;
    [a, b, c] = [...this.input.register];
    run(program);
    return outs.join(',');
  }

  partTwo() {
    const program = this.input.program;
    [a, b, c] = [...this.input.register];
    return findInitialA(0n, program.length - 1, program);
  }
}

function run(program: bigint[]) {
  outs = [];
  instructionPointer = 0;
  while (instructionPointer < program.length) {
    const cmd = program[instructionPointer];
    switch (cmd) {
      case 0n:
        a = BigInt(a) >> comboOp(instructionPointer, program);
        break;
      case 1n:
        b = BigInt(b) ^ BigInt(program[instructionPointer + 1]);
        break;
      case 2n:
        b = BigInt(comboOp(instructionPointer, program)) % 8n;
        break;
      case 3n:
        if (a !== 0n)
          instructionPointer = Number(program[instructionPointer + 1]) - 2;
        break;
      case 4n:
        b = b ^ c;
        break;
      case 5n:
        outs.push(comboOp(instructionPointer, program) % 8n);
        break;
      case 6n:
        b = BigInt(a) >> BigInt(comboOp(instructionPointer, program));
        break;
      case 7n:
        c = BigInt(a) >> BigInt(comboOp(instructionPointer, program));
        break;
    }
    instructionPointer += 2;
  }
}

function comboOp(pointer: number, program: bigint[]): bigint {
  const val = BigInt(program[pointer + 1]);
  if (val < 4n)
    return val;
  if (val === 4n)
    return a;
  if (val === 5n)
    return b;
  if (val === 6n)
    return c;
  throw new Error('Combo not found');
};

function findInitialA(nextVal: bigint, i: number, program: bigint[]): bigint {
  if (i < 0)
    return nextVal;
  for (let aVal = nextVal * 8n; aVal < nextVal * 8n + 8n; aVal++) {
    a = aVal;
    run(program);
    if (outs[0] === program[i]) {
      const finalVal = findInitialA(aVal, i - 1, program);
      if (finalVal >= 0)
        return finalVal;
    }
  }
  return -1n;
}
