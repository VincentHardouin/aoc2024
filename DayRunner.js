/* eslint-disable no-console */
import { join } from 'node:path';

export class DayRunner {
  constructor(dayNumber) {
    this.dayNumber = dayNumber;
  }

  async run() {
    const file = await import(join(import.meta.dirname, `day${this.dayNumber}.js`));
    const dayInput = await Bun.file(join(import.meta.dirname, `day${this.dayNumber}.txt`), 'utf8')
      .text();
    const day = new file.DayImpl(dayInput);
    console.time('partOne');
    console.log(day.partOne());
    console.timeEnd('partOne');
    console.time('partTwo');
    console.log(day.partTwo());
    console.timeEnd('partTwo');
  }
}
