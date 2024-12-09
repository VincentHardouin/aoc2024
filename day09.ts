import type { Day } from './Day.ts';

type BlockId = number | '.';
interface Block { id: BlockId; size: number }

export class DayImpl implements Day {
  private readonly input: number[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('')
      .map(Number);
  }

  partOne() {
    const blocks = this.input.flatMap((size, i) => {
      return Array.from({ length: size }).fill(i % 2 ? '.' : i / 2) as BlockId[];
    });
    const compacted = compact(blocks);
    return checksum(compacted);
  }

  partTwo() {
    const files = this.input.map((size, i) => {
      return {
        id: i % 2 ? '.' : i / 2,
        size,
      } as Block;
    });
    const compacted = compactWhole(files);
    const blocks: BlockId[] = compacted.flatMap(({ id, size }) => Array.from({ length: size }).fill(id) as BlockId[]);
    return checksum(blocks);
  }
}

function compact(arr: BlockId[]) {
  const blocks = [...arr];
  let [left, right] = [0, blocks.length - 1];
  while (left < right) {
    if (blocks[left] !== '.')
      left++;
    else if (blocks[right] === '.')
      right--;
    else [blocks[left], blocks[right]] = [blocks[right], blocks[left]];
  }
  return blocks;
}

function compactWhole(files: Block[]) {
  const copy = [...files];
  for (let j = copy.length - 1; j >= 0; j--) {
    if (copy[j].id === '.')
      continue;
    const file = copy[j];

    for (let i = 0; i < j; i++) {
      const free = copy[i];
      if (free.id === '.' && free.size >= file.size) {
        free.size -= file.size;
        copy[j] = { id: '.', size: file.size };
        copy.splice(i, 0, file);
        break;
      }
    }
  }
  return copy;
}

function checksum(arr: BlockId[]) {
  return arr.reduce((acc: number, x, i) => {
    return acc + (x === '.' ? 0 : i * x);
  }, 0);
}
