import type { Day } from './Day.ts';

export class DayImpl implements Day {
  private readonly input: bigint[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map(n => BigInt(n));
  }

  partOne() {
    return this.input.reduce((acc: bigint, num: bigint) => {
      let secret = num;
      for (let i = 0; i < 2000; i++) {
        secret = getNextSecret(secret);
      }
      return acc + secret;
    }, 0n);
  }

  partTwo() {
    const priceMap = new Map<string, number>();

    this.input.forEach((num) => {
      const stringifyNum = `${num}`;
      const pricesForMonkey: number[] = [Number(stringifyNum.charAt(stringifyNum.length - 1))];
      const priceChangesForMonkey: number[] = [];
      const priceMapForMonkey = new Map<string, number>();

      let secret = num;
      for (let i = 0; i < 2000; i++) {
        secret = getNextSecret(secret);
        pricesForMonkey.push(Number(secret % 10n));
        priceChangesForMonkey.push(pricesForMonkey[pricesForMonkey.length - 1] - pricesForMonkey[pricesForMonkey.length - 2]);
      }

      for (let i = 4; i <= priceChangesForMonkey.length; i++) {
        const priceSeq = priceChangesForMonkey.slice(i - 4, i).join(',');
        const finalPrice = pricesForMonkey[i];

        if (!priceMapForMonkey.has(priceSeq)) {
          priceMapForMonkey.set(priceSeq, finalPrice);
        }
      }

      for (const [seq, p] of priceMapForMonkey.entries()) {
        !priceMap.has(seq) ? priceMap.set(seq, p) : priceMap.set(seq, p + priceMap.get(seq)!);
      }
    });

    const sortedPrices = new Map([...priceMap.entries()].sort((a: [string, number], b: [string, number]) => b[1] - a[1]));
    return [...sortedPrices.entries()][0][1];
  }
}

function getNextSecret(secretNum: bigint): bigint {
  const mult64 = prune(mix(secretNum * 64n, secretNum));
  const div32 = prune(mix(mult64 / 32n, mult64));
  const mult2048 = prune(mix(div32 * 2048n, div32));
  return mult2048;
}

function mix(num: bigint, secretNum: bigint): bigint {
  return num ^ secretNum;
}

function prune(secretNum: bigint): bigint {
  return secretNum % 16777216n;
}
