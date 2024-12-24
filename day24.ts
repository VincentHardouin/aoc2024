import type { Day } from './Day.ts';

type Operation = 'AND' | 'XOR' | 'OR';

interface Instruction {
  a: string;
  b: string;
  c: string;
  operation: Operation;
  executed: boolean;
}

export class DayImpl implements Day {
  private readonly input: { wires: { [key: string]: number }; instructions: Instruction[] };

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    const parts = input
      .trim()
      .split('\n\n')
      .map(part => part.split('\n'));

    const wires = parts[0].reduce((acc, line) => {
      const [wire, val] = line.split(': ');
      acc[wire] = Number(val);
      return acc;
    }, {} as { [key: string]: number });

    const instructions = parts[1].map((line) => {
      const tokens = line.split(' ');
      return { a: tokens[0], b: tokens[2], c: tokens[4], operation: tokens[1], executed: false } as Instruction;
    });

    return {
      wires,
      instructions,
    };
  }

  partOne(): bigint {
    const input = structuredClone(this.input);
    const { wires, instructions } = input;

    while (instructions.some(instruction => !instruction.executed)) {
      for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].executed)
          continue;

        if (wires[instructions[i].a] === undefined || wires[instructions[i].b] === undefined) {
          continue;
        }

        if (instructions[i].operation === 'AND')
          wires[instructions[i].c] = wires[instructions[i].a] & wires[instructions[i].b];
        if (instructions[i].operation === 'OR')
          wires[instructions[i].c] = wires[instructions[i].a] | wires[instructions[i].b];
        if (instructions[i].operation === 'XOR')
          wires[instructions[i].c] = wires[instructions[i].a] ^ wires[instructions[i].b];

        instructions[i].executed = true;
      }
    }

    const zWires = Object.keys(wires).filter(wire => wire[0] === 'z').sort().reverse().map(wire => wires[wire]).join('');
    return BigInt(`0b${zWires}`);
  }

  partTwo(): string {
    const input = structuredClone(this.input);
    const { instructions } = input;

    const BIT_LENGTH = 45;

    const incorrect: string[] = [];
    for (let i = 0; i < BIT_LENGTH; i++) {
      const id = i.toString().padStart(2, '0');

      const xor = instructions.find(instruction => hasInstructionForCurrentStep(instruction, id) && instruction.operation === 'XOR');
      const and = instructions.find(instruction => hasInstructionForCurrentStep(instruction, id) && instruction.operation === 'AND');
      const z = instructions.find(instruction => instruction.c === `z${id}`);

      if (!xor || !and || !z) {
        continue;
      }

      if (z.operation !== 'XOR') {
        incorrect.push(z.c);
      }

      const or = instructions.find(instruction => instruction.a === and.c || instruction.b === and.c);
      if (or && or.operation !== 'OR' && i > 0) {
        incorrect.push(and.c);
      }

      const after = instructions.find(instruction => instruction.a === xor.c || instruction.b === xor.c);
      if (after && after.operation === 'OR') {
        incorrect.push(xor.c);
      }
    }

    incorrect.push(
      ...instructions
        .filter((instruction) => {
          return !instruction.a[0].match(/[xy]/g)
            && !instruction.b[0].match(/[xy]/g)
            && !instruction.c[0].match(/z/g)
            && instruction.operation === 'XOR';
        })
        .map(instruction => instruction.c),
    );

    return incorrect.sort().join(',');
  }
}

function hasInstructionForCurrentStep(instruction: Instruction, id: string): boolean {
  return (instruction.a === `x${id}` && instruction.b === `y${id}`) || (instruction.a === `y${id}` && instruction.b === `x${id}`);
}
