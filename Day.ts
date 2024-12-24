export interface Day {
  parseInput: (input: string) => any;
  partOne: () => number | bigint | string;
  partTwo: () => number | bigint | string;
}
